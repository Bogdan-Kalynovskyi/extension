from django.http import HttpResponse
from django.utils import simplejson

from django.contrib.auth.models import User
from .models import Post, Comment, CommentRating

import requests
from lxml import html
import re

# from twisted.internet import reactor
# from scrapy.crawler import Crawler
# from scrapy.settings import CrawlerSettings
# from scrapy import log, signals
# from scrapy.xlib.pydispatch import dispatcher
# from scraping import settings as custom_settings
# from scraping.spiders.lj_spider import LjSpider

# def stop_reactor():
#   log.msg("Stopping reactor")
#   reactor.stop()


# include_next_pages is by default False to avoid long recursive calls
# if called forgot to specify argument value explicitly
def get_comments(author, post_id, include_next_pages=False):
    """ returns comment ids """
    comments = []

    href = 'http://{author}.livejournal.com/{post_id}.html'.format(
        author=author, post_id=post_id)
    response = requests.get(href)
    if response.status_code != 200:
        return None

    response_html = response.content

    # let's get data
    xpath_str = '//div[contains(@id, "ljcmt")]'
    comments_in_html = html.fromstring(response_html).xpath(xpath_str)
    patt = re.compile(r'\d+')
    for c in comments_in_html:
        pat_result = patt.search(c.attrib['id'])
        if pat_result is None:
            continue
        comment_id = int(pat_result.group())
        try:
            author_name = c.xpath('.//span[contains(@class, "ljuser")]')[0].attrib['lj:user']
        except IndexError:
            continue
        author = User.objects.get_or_create(username=author_name)[0]
        params = {
            'author': author,
            'post': Post.objects.get_or_create(defaults={'author': author}, id=post_id)[0]
        }
        comment = Comment.objects.get_or_create(defaults=params, id=comment_id)[0]
        comments.append(comment)

    # let's parse other pages

    return comments


def rating_get(request):
    user_name = request.GET.get('userName', None)
    post_author = request.GET.get('postAuthor', None)
    post_id = request.GET.get('postId', None)
    # comment_id = request.GET.get('commentId', None)

    while True:
        # check if all fields are present
        if None in (post_author, post_id):
            result = {
                'status': 'error',
                'status_code': 504,
                'msg': 'missing required field',
            }
            break

        comments_dict = {}
        result = {
            'status': 'ok',
            'status_code': 200,
            'comments': comments_dict,
        }

        comments = get_comments(post_author, post_id, include_next_pages=True)
        if not comments:
            break
        user = User.objects.get_or_create(username=user_name)[0]
        comment_ratings = CommentRating.objects.filter(
            comment_id__in=map(lambda x: x.id, comments), reader=user)
        for r in comment_ratings:
            comments_dict[r.comment.id] = {
                'rating': r.rating,
            }

        result = {
            'status': 'ok',
            'status_code': 200,
            'comments': comments_dict,
        }

        break

    return HttpResponse(simplejson.dumps(result), content_type="application/json")


def rating_set(request):
    user_name = request.GET.get('userName', None)
    post_id = request.GET.get('postId', None)
    comment_id = request.GET.get('commentId', None)
    rating = request.GET.get('rating', None)

    while True:
        if user_name is None:
            result = {
                'status': 'error',
                'status_code': 504,
                'msg': 'missing userName field',
            }
            break
        if post_id is None:
            result = {
                'status': 'error',
                'status_code': 504,
                'msg': 'missing postId field',
            }
            break

        if comment_id is None:
            result = {
                'status': 'error',
                'status_code': 504,
                'msg': 'missing commentId field',
            }
            break

        if rating is None:
            result = {
                'status': 'error',
                'status_code': 504,
                'msg': 'missing rating field',
            }
            break

        user = User.objects.get_or_create(username=user_name)[0]
        comment_rating = CommentRating.objects.get_or_create(
            defaults={'rating':rating}, comment_id=comment_id, reader=user)[0]
        comment_rating.rating = rating
        comment_rating.save()

        result = {
            'status': 'ok',
            'status_code': 200,
        }
        break

    return HttpResponse(simplejson.dumps(result), content_type="application/json")
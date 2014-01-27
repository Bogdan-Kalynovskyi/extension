from django.http import HttpResponse
from django.utils import simplejson

from django.contrib.auth.models import User
from .models import CommentRating

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

def rating_get(request):
    user_name = request.GET.get('userName', None)
    post_id = request.GET.get('postId', None)
    comment_id = request.GET.get('commentId', None)

  # query = request.GET.get('query', None)
  # print("Query: {}".format(query))

  # log.start()
  # dispatcher.connect(stop_reactor, signal=signals.spider_closed)
  # spider = LjSpider()
  # # import pdb; pdb.set_trace()
  # crawler = Crawler(CrawlerSettings(settings_module=custom_settings))
  # crawler.configure()
  # crawler.crawl(spider)
  # crawler.start()
  # log.msg("Reactor started")
  # reactor.run()
  # log.msg("Reactor stopped")
    while True:
        if None in (user_name, post_id, comment_id):
            result = {
                'status': 'error',
                'status_code': 504,
                'msg': 'missing required field',
            }
            break

        try:
            user = User.objects.get(username=user_name)
            rating_obj = CommentRating.objects.get(comment_id=comment_id,
                                                             user=user)
        except User.DoesNotExist:
            result = {
                'status': 'error',
                'status_code': 404,
                'msg': 'user not found',
            }
            break
        except CommentRating.DoesNotExist:
            result = {
                'status': 'error',
                'status_code': 404,
                'msg': 'comment rating not found',
            }
            break

        result = {
            'status': 'ok',
            'status_code': 200,
            'rating': rating_obj.rating
        }

        break

    return HttpResponse(simplejson.dumps(result), content_type="application/json")


def rating_set(request):
    user_name = request.GET.get('userName', None)
    post_id = request.GET.get('postId', None)
    comment_id = request.GET.get('commentId', None)
    rating = request.GET.get('rating', None)

    while True:
        if None in (user_name, post_id, comment_id, rating):
            result = {
                'status': 'error',
                'status_code': 504,
                'msg': 'missing required field',
            }
            break

        user = User.objects.get_or_create(username=user_name)[0]
        comment_rating = CommentRating.objects.get_or_create(comment_id=comment_id,
           user=user, defaults={'rating':rating})[0]
        comment_rating.rating = rating
        comment_rating.save()

        result = {
            'status': 'ok',
            'status_code': 200,
        }
        break

    return HttpResponse(simplejson.dumps(result), content_type="application/json")
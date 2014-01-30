# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    author = models.ForeignKey(User)


class Comment(models.Model):
    author = models.ForeignKey(User)
    post = models.ForeignKey(Post)
    parent = models.ForeignKey('self', related_name='children', null=True)
    

class CommentRating(models.Model):
    comment = models.ForeignKey(Comment)
    reader = models.ForeignKey(User)
    rating = models.IntegerField() # -100..100

    class Meta:
        db_table = u'comment_ratings'
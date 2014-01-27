# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

class CommentRating(models.Model):
    comment_id = models.IntegerField()
    user = models.ForeignKey(User)
    rating = models.IntegerField() # -100..100

    class Meta:
        db_table = u'comment_ratings'
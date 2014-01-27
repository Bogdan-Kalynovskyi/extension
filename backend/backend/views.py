from django.http import HttpResponse
from django.utils import simplejson

from twisted.internet import reactor
from scrapy.crawler import Crawler
from scrapy.settings import CrawlerSettings
from scrapy import log, signals
from scrapy.xlib.pydispatch import dispatcher
from scraping import settings as custom_settings
from scraping.spiders.lj_spider import LjSpider

def stop_reactor():
  log.msg("Stopping reactor")
  reactor.stop()

def api(request):
  query = request.GET['query']
  print "Query: {}".format(query)

  log.start()
  dispatcher.connect(stop_reactor, signal=signals.spider_closed)
  spider = LjSpider()
  # import pdb; pdb.set_trace()
  crawler = Crawler(CrawlerSettings(settings_module=custom_settings))
  crawler.configure()
  crawler.crawl(spider)
  crawler.start()
  log.msg("Reactor started")
  reactor.run()
  log.msg("Reactor stopped")

  result = {
    'msg': "hello, world!",
  }
  return HttpResponse(simplejson.dumps(result), content_type="application/json")
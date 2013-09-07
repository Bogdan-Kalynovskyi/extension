from scrapy.spider import BaseSpider

class LjSpider(BaseSpider):
	name = "LJ"
	allowed_domains = ["livejournal.com"]
	start_urls = [
		"http://hardingush.livejournal.com/47852.html"
	]

	def __init__(self, category = None):
		filename = "lj.txt"
		self.file = open(filename, "wb")

	def parse(self, response):
		#filename = response.url.split("/")[-2]
		open(filename, 'wb').write(response.body)
		

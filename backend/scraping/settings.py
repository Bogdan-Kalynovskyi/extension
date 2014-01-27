# Scrapy settings for lj project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/topics/settings.html
#

BOT_NAME = 'lj'

SPIDER_MODULES = ['scraping.spiders']
NEWSPIDER_MODULE = 'scraping.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = 'lj (+http://www.nearbyfuture.com)'

# DOWNLOAD_HANDLERS = {
#     's3': '',
#   }


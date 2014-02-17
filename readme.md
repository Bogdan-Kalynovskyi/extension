# LiveJournal extension


**extension** - chromium-compatible extension
Set:
http://nearbyfuture.com:7005/api/rating/set/?userName=vasya&postAuthor=fritzmorgen&postId=657714&commentId=294355762&rating=50

Get:
http://nearbyfuture.com:7005/api/rating/get/?userName=vasya&postAuthor=fritzmorgen&postId=657714


**scrapy** - web scraping feature.
Based on [python scraping framework](http://scrapy.org).
Will accept Ajax request from extension, parse URL and return data


**www** - files to reside on www server
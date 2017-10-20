import scrapy

url = "https://it-events.com/?page="
class ItEventsSpider(scrapy.Spider):
    name="it_events"
    start_urls = [url + str(i) for i in range(1, 11)]

    def parse(self, request):
        links = request.css("a.event-list-item__title::attr(href)").extract()
        for link in links:
            yield scrapy.Request("https://it-events.com" + link, callback=self.parse_event)

    def parse_event(self, request):
        return {
                'link': request.url,
                'title': request.css("h1.event-header__title::text").extract_first(),
                'date': request.css("div.event-header__line::text").extract_first(),
                'place': request.css("a.event-header__line_addr::text").extract_first(),
                'free': request.css("div.event-header__line_icon_price::text").extract_first(),
                'type': request.css("li.nav-tabs-item::text").extract_first(),
                'description': request.css("div.col-md-8 *::text").extract()
                }

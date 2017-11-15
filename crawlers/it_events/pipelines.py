# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.exceptions import DropItem
import requests
import re
from datetime import datetime

line_term = re.compile(r"(^\n)|(\n$)")
line_term2 = re.compile(r"[(\r)(\n)|(\t)]+")

EVENT_TYPES = dict([
        ("Хакатон", "ХАК" ),
        ("Митап", "МИТ"),
        ("Соревнование", "СОР"),
        ("Школа", "ШК"),
        ("Мастер-класс", "MK"),
        ("Конференция", "КОНФ"),
        ("Лекция", "ЛЕК")
        ])


def get_month_number(month):
    mon = ["янв", "фев", "март", "апр", "ма", "июн", "июл", "авг", "сент", "окт", "ноя", "дек"]
    for i, m in enumerate(mon):
        if month.startswith(m):
        	return i + 1

class BeginingPipeline(object):
    def process_item(self, item, spider):
        for key in item:
            if key == "link" or key == "description": continue
            if item[key] == None: item[key] == ""
            try:
                item[key] = line_term.sub("", item[key])
            except TypeError:
                item[key] == ""
        return item

class TypePipeline(object):
    def process_item(self, item, spider):
        item["type"] = EVENT_TYPES.get(item["type"], "UNK")
        if item["type"] == "UNK":
            raise DropItem("Event type {} doesn't support")
        else:
            return item

class DescriptionPipeline(object):
    def process_item(self, item, spider):
        item['description'] = "".join(item["description"])
        item["description"] = line_term2.sub("\n", item["description"])
        return item

class ItEventsFree(object):
    def process_item(self, item, spider):
        if item["free"] == "Участие бесплатное" or item["free"] == "\nУчастие бесплатное\n" or len(item["free"]) < 3:
            return item
        else:
            raise DropItem("It's not free")

class TimePipeline(object):
    def process_item(self, item, spider):
        time = item["date"]
        date, time = time.split(", ")
        date = date.split()[:3]
        date[1] = get_month_number(date[1])
        time = time.split("\n-\n")[0].split(":")
        date = list(map(int, date[::-1] + time))
        item["date"] = datetime(*date).strftime("%Y-%m-%dT%H:%M")
        return item

class SendAPIPipeline(object):
    collection_name = 'scrapy_items'
    def __init__(self, api_url):
        self.api_url = api_url + "/events"

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler.settings.get("API_URL"))

    def process_item(self, item, crawler):
        r = requests.post(
                        self.api_url,
                        json=item)
        if r.status_code != 200:
            raise DropItem("Something wrong: " + r.text)
        return item

import json

class JsonWriterPipeline(object):

        def open_spider(self, spider):
            self.file = open('items.jl', 'w')

        def close_spider(self, spider):
            self.file.close()

        def process_item(self, item, spider):
            line = json.dumps(dict(item)) + "\n"
            self.file.write(line)
            return item

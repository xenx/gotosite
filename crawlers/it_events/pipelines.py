# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.exceptions import DropItem
import requests
import re
line_term = re.compile(r"(^\\n)|(\\n$)")
line_term2 = re.compile(r"(\\n){2,}")

class ItEventsFree(object):
    def process_item(self, item, spider):
        item['description'] = "".join(item["description"])
        for key in item:
            if key == "link" or key == "description": continue
            item[key] = item[key][1:-1]
        item["description"] = line_term2.sub("\n", item["description"])
        if item["free"] == "Участие бесплатное"or item["free"] == '\nУчастие бесплатное\n':
            return item
        else:
            raise DropItem("It's not free")


class ItEventsPipeline(object):
    def process_item(self, item, spider):
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

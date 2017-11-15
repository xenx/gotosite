import re
import datetime
import logging
from collections import defaultdict
from main.model import Skill

def process_skills(skills):
    with open("tagsskills.re") as fp:
        skills_re = re.compile("((" + ")|(".join(fp.read().split("\n")) + "))+")
    results = []
    for sk in skills:
        sk_ = list(map(lambda x: "".join(set(x)), skills_re.findall(sk.lower())))
        if len(sk_) == 0:
            with open("problem_tags.txt", "a") as fp:
                fp.write("\n" + sk)
            result.append(sk)
        else:
            results.extend(sk_)
    return results

def norm_sk(sk):
    tags = []
    for tag in event.tags:
        tags.extend(sk_id.get(tag))
    return tags

class RecomendationSystem:
    

    def prepare_skills(self):
        skills = Skill.objects.all()
        with open("tagsskills.re") as fp:
            skills_re = re.compile("((" + ")|(".join(fp.read().split("\n")) + "))+")
        results = {}
        for skill in skills:
            sk_ = list(map(lambda x: "".join(set(x)), skills_re.findall(sk.lower())))
            if len(sk_) == 0:
                with open("problem_tags.txt", "a") as fp:
                    fp.write("\n" + sk)
                result[skill.pk] = [skill.name]
            else:
                result[skill.pk] = sk_
        return result


    def recomendation(self, user: dict, events: list, count = None, more_zero: bool = False):
        if count is None:
            count = len(events)
        events_ = []
        sk_id = self.prepare_skills()
        skills = norm_sk(user["skills"])
        for event in events:
            if len(event["need_skills"]) > 0:

                tags = norm_sk(event.need_skills)
                intersec = len(set(tags).intersection(skills))
                event["similarity"] = intersec/len(need_skills)
                events_.append(event)
        if more_zero:
            events_ = filter(lambda x: x["similarity"] > 0, events_)
        events = sorted(events_, key=lambda event: event["similarity"])
        return events[::-1][:count][::-1]

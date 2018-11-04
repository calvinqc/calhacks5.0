from django.shortcuts import render
from django.http import HttpResponse

import json

def index(request):
    return HttpResponse("<b>Hello World!</b>")

def query(request):
    if (request.method == 'POST'):
        query = request.body.decode('utf-8')
        query = json.loads(query)

        content = query['content']
        ingredients_names
        food_sets
        cleaned_query_set = set()
        l = []

        for w in content.split(','):
            i = w.strip()
            if i in ingredients_names:
                cleaned_query_set.add(ingredients_names[i])

        for s in food_sets:
            if len(s.intersection(cleaned_query_set)) >= len(cleaned_query_set) * 0.5:
                l.append(s)

        return l

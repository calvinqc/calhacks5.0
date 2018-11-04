from django.shortcuts import render
from django.http import HttpResponse

import json, requests, os, math

def index(request):
    return HttpResponse("<b>Hello World!</b>")

def query(request):
    if (request.method == 'POST'):
        query = request.body.decode('utf-8')
        query = json.loads(query)

        content = query['content']
        ingredients_names = {}
        food_sets = {}
        with open('./queryhandler/food_sets.json','r') as infile:
            food_sets = json.load(infile)
        with open('./queryhandler/ingredients_names.json','r') as infile:
            ingredients_names = json.load(infile)


        cleaned_query_set = set()
        l = {}

        for w in content.split(','):
            i = w.strip()
            if i in ingredients_names:
                cleaned_query_set.add(ingredients_names[i])

        for k,v in food_sets.items():
            recipe_s = set(v)
            numer = len(recipe_s.intersection(cleaned_query_set))
            denom = len(cleaned_query_set)
            intersect_score = 0
            if denom > 0:
                intersect_score = math.floor(( numer / denom) * 100)
            if intersect_score > 33:
                l[k] = intersect_score
        
        return HttpResponse(json.dumps(l))

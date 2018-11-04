from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

import json, requests

def index(request):
    return HttpResponse("<b>Hello World!</b>")

@method_decorator(csrf_exempt, name='dispatch')
def query(request):
    if (request.method == 'POST'):
        query = request.body.decode('utf-8')
        query = json.loads(query)
        print(query)

        content = query['content']
        ingredients_names = requests.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/vinacann-vceuu/service/http/incoming_webhook/getAllIngredientsNames').json()
        food_sets = requests.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/vinacann-vceuu/service/http/incoming_webhook/getAllFoodSets').json()


        cleaned_query_set = set()
        l = {}

        for w in content.split(','):
            i = w.strip()
            if i in ingredients_names:
                cleaned_query_set.add(ingredients_names[i])

        for k,v in food_sets.items():
            intersect_score = (len(cleaned_query_set) / len(v.intersection(cleaned_query_set))) * 100
            if intersect_score > 12.5:
                l[k] = intersect_score

        return HttpResponse(json.dumps(k))

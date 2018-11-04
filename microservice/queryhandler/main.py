import json
import sys, os, re
import pandas
import requests

def parse_data():
    path = './recipes2'
    ing_counter = 0

    recipes = []
    ingredients_names = {}
    ingredients_nums = {}
    food_sets = []

    for file in os.listdir(path + ''):
        if (file != '.DS_Store'):
            file_path = '/'.join((path,file))
            with open(file_path) as file:
                arr = json.load(file)
                recipes.extend(arr)
                for a in arr:
                    s = set()
                    for ing in a['ingredients']:
                        if ingredients_names.get(ing) == None:
                            ingredients_names[ing] = ing_counter
                            ingredients_nums[ing_counter] = ing
                            ing_counter += 1
                        s.add(ingredients_names.get(ing))
                    food_sets.append(s)
    return (recipes, ingredients_names, ingredients_nums, food_sets)

def populate_data():
    response = requests.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/vinacann-vceuu/service/http/incoming_webhook/getAllRecipe')

    recipes = []
    ingredients_names = {}
    ingredients_nums = {}
    food_sets = {}
    ing_counter = 0

    arr = response.json()

    for a in arr[0]['myData']:
        s = []
        for ing in a['ingredients']:
            if ingredients_names.get(ing) == None:
                ingredients_names[ing] = ing_counter
                ingredients_nums[ing_counter] = ing
                ing_counter += 1
            s.append(ingredients_names.get(ing))
        food_sets[a['id']] = s
    return (recipes, ingredients_names, ingredients_nums, food_sets)

def find(query, ingredients_names, food_sets):
    cleaned_query_set = set()
    l = []

    for w in query.split(','):
        i = w.strip()
        if i in ingredients_names:
            cleaned_query_set.add(ingredients_names[i])

    for s in food_sets:
        if len(s.intersection(cleaned_query_set)) >= len(cleaned_query_set) * 0.5:
            l.append(s)

    return l

def main():
    recipes = []
    ingredients_names = {}
    ingredients_nums = {}
    food_sets = []

    if len(recipes) == 0 or len(ingredients_names) == 0 or len(ingredients_nums) == 0 or len(food_sets) == 0:
        t = populate_data()
        recipes = t[0]
        ingredients_names = t[1]
        ingredients_nums = t[2]
        food_sets = t[3]
        with open('ingredients_names.json', 'w') as outfile:
            json.dump(ingredients_names, outfile)
        with open('ingredients_nums.json', 'w') as outfile:
            json.dump(ingredients_nums, outfile)
        with open('food_sets.json', 'w') as outfile:
            json.dump(food_sets, outfile)


if __name__ == '__main__':
    main()
                    
from django.urls import path, include
from ninja import NinjaAPI, Schema
from django.core.cache import cache
from django.conf import settings
from .models import SignLanguage
import requests
import xmltodict
from django.http import JsonResponse
import os
from django.core import serializers
from django.http import HttpResponse
from api.utils import run
from datetime import timedelta
import time
from keras.models import load_model, save_model
import numpy as np
from tensorflow.keras.utils import to_categorical

PROXY_URL = f'http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey={settings.API_KEY}&numOfRows=12500'

api = NinjaAPI()

def create_res(status, message,data=None):
    return {
        'meta' : {
            'code' : status,
            'message': message
        },
        'data' : data
    }

@api.get('/lang')
def get_lang(request, title:str = None):
    if title:
      title_cache = cache.get(title)

      if title_cache == None:
          all_cache = cache.get('data')
          if all_cache == None:
              all_cache = requests.get(PROXY_URL)
              cache.set('data', xmltodict.parse(all_cache.content.decode()).get('response').get('body').get('items').get('item'),60*60*24)
          title_cache = list(filter(lambda x: title in x['title'] , cache.get('data')))

          cache.set(title, title_cache, 60*60*24*365)
      

      return JsonResponse(create_res(200,'ok',title_cache))

class APIkey(Schema):
    apikey :str

@api.post('/lang')
def save_lang(request, key:APIkey):
    if not key.apikey or key.apikey != os.environ.get("API_KEY"):
        return JsonResponse({'code':401, 'message': 'unauthorize'})
    
    db_list = []

    all_cache = cache.get('data')
    
    if all_cache == None:
        return JsonResponse({'code':400, 'message': 'please call GET METHOD first'})
  
    for i in all_cache:
        try:
          SignLanguage.objects.create(title = i.get('title',None),
            alternativeTitle= i.get('alternativeTitle',None),
            language= i.get('language',None),
            description= i.get('description',None),
            url= i.get('url',None),
            subDescription= i.get('subDescription',None),
            referenceIdentifier= i.get('referenceIdentifier',None))
        except:
            pass
        

  
@api.get('/sign-language')
def get_signlanguage(request, title:str):
    if not title:
        return JsonResponse({'code':400, 'message': 'bad request'})
    
    data = SignLanguage.objects.filter(title__icontains = title)
    data_json = serializers.serialize('json', data)

    return HttpResponse(data_json, content_type='application/json')

class DataArraySchema(Schema):
    array:list
    name:str

@api.post('/evaluation')
def post_array_len_90(request, data:DataArraySchema):
    if len(data.array) != 3:
        return JsonResponse({'code':400, 'message': 'bad request'})
    res = []

    for i in data.array:
        action, ratio = run(i)
        res.append([action,ratio])
        
    return res

@api.post('/learning')
def learn_models(request, key:APIkey):
    if not key.apikey or key.apikey != os.environ.get("API_KEY"):
        return JsonResponse({'code':401, 'message': 'unauthorize'})
    while True:
      if cache.set(timedelta.total_seconds(), '1', 2 ,nx = True):
          data = cache.get('total_data')
          data = []
          cache.set('total_data',data,60*60*24)
          break
      else:
          time.sleep(0.05)
    model = load_model(f'{settings.BASE_DIR}/논문test.h5')# 

    model.fit(np.array(filter(lambda x: x[0], data)), to_categorical(list(filter(lambda x: x[1]))).astype(int), epochs=800)

    model.save('논문test.h5')
    
    return
    

urlpatterns = [
    path('', api.urls),
]

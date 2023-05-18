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
        

  
@api.get('/signlanguage')
def get_signlanguage(request, title:str):
    if not title:
        return JsonResponse({'code':400, 'message': 'bad request'})
    
    data = SignLanguage.objects.filter(title__icontains = title)
    data_json = serializers.serialize('json', data)

    return HttpResponse(data_json, content_type='application/json')
    
    
    

urlpatterns = [
    path('', api.urls),
]

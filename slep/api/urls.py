from django.urls import path, include
from ninja import NinjaAPI
from ninja.security import APIKeyHeader
from django.core.cache import cache
from django.conf import settings
import requests
import xmltodict
from django.http import JsonResponse

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

          cache.set(title, title_cache, 60*60*24)
      

      return JsonResponse(create_res(200,'ok',title_cache))


urlpatterns = [
    path('', api.urls),
]

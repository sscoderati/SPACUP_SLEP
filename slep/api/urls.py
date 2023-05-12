from django.urls import path, include
from ninja import NinjaAPI
from ninja.security import APIKeyHeader
from django.core.cache import cache
from django.conf import settings
import requests
import xmltodict
from django.http import JsonResponse

PROXY_URL = f'http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey={settings.API_KEY}&numOfRows=12500'
class ApiKey(APIKeyHeader):
    param_name = "X-API-Key"

    def authenticate(self, request, key):
        if key == "apikey":
            return key

api = NinjaAPI(csrf=True)

header_key = ApiKey()

def create_res(status, message,data=None):
    return {
        'meta' : {
            'code' : status,
            'message': message
        },
        'data' : data
    }

@api.get('/lang', auth=header_key)
def get_lang(request, title:str = None):
    if title:
      title_cache = cache.get(title)

      if title_cache == None:
          all_cache = cache.get('data')
          if all_cache == None:
              return
          title_cache = list(filter(lambda x: title in x['title'] , all_cache))

          cache.set(title, title_cache, 60*60*24)
      

      return JsonResponse(create_res(200,'ok',title_cache))

@api.get('/all-lang')
def test_cache(request):
    if cache.get('data') == None:
      res = requests.get(PROXY_URL)
      cache.set('data', xmltodict.parse(res.content.decode()).get('response').get('body').get('items').get('item'),60*60*24)
    return list(cache.get('data'))
    

urlpatterns = [
    path('', api.urls),
]

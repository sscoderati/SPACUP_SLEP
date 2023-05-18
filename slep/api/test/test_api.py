from unittest import TestCase
from django.test import Client

class TestApi(TestCase):
    
    def setUp(self) -> None:
        self.client = Client()
        return super().setUp()
    
    def test_proxy_api(self):
        pass
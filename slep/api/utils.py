from keras.models import load_model, save_model
import numpy as np
from django.conf import settings
actions = [1,2,3,4,5,6,7,8,9,0]
#tensorflow = 2.10.0, numpy = 1.21.6 사용했습니다.


model = load_model(f'{settings.BASE_DIR}/논문test.h5')# 

def run(sequence): # 배열 [30,126] 1차원에 30개의 요소가 있고 각 요소는 126개의 요소가 있어야해요!
    if len(sequence) == 30:
          res = model.predict(np.expand_dims(sequence, axis=0))[0]
          return actions[np.argmax(res)],max(res)
# -*- coding: utf-8 -*-
"""sleprun

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Zgz0Up2mTtoU_-CCeRPAr3tl6ubZaf0v
"""

from keras.models import load_model, save_model
import numpy as np

model = load_model('논문test.h5')

def run(sequence): # 배열 [30][126]음..? 1
    from keras.models import load_model, save_model
    import numpy as np
    if len(sequence) == 30:
            res = model.predict(np.expand_dims(sequence, axis=0))[0]
            #print(actions[np.argmax(res)])
            #print(actions[np.argmax(res)])
            #print(max(res))
    return actions[np.argmax(res)],max(res)
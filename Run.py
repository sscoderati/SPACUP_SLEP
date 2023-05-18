#!/usr/bin/env python
# coding: utf-8

# In[1]:


def run(sequence):
     if len(sequence) == 30:
            res = model.predict(np.expand_dims(sequence, axis=0))[0]
            print(actions[np.argmax(res)])


# In[ ]:





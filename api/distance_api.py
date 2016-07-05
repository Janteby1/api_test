import requests
import json
from . import key
from django.conf import settings 

params = {
   'mode':"transit",
   'units':"imperial",
}

class GoogleAPI:
    def __init__(self, access_token):
     self.access_token = access_token

    def get(self,path,**kwargs):
     # this builds the begining of the URL 
     URL = "https://maps.googleapis.com/maps/api/" + path
     # this adds all the attributes to the end of the URL
     params = kwargs.get("params")
     # this adds the acces token to be passed to the api
     params.update({"key":self.access_token})
     return requests.get(URL,params=params) 

# create an instance of the api
api = GoogleAPI(key.GOOGLE_KEY)


def get_origin_commute(params, origin, destination, api):
    # calls the api with the params for origin and destination passed in
    # print (origin)
    # print (destination)
    params ['origins'] = origin
    params ['destinations'] = destination

    info = api.get('distancematrix/json', params=params)
    response_info = info.json()
    print (response_info)

    # gets the distnce value from the responceinfo
    try:
        miles = response_info["rows"][0]["elements"][0]["distance"]["text"]
    except:
        miles = "error"
    print(miles)
    return miles


def run_origin(origin, destination):
    commute = get_origin_commute(params, origin, destination, api)
    return commute




















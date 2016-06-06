import requests
import json
from . import key
from django.conf import settings 

# old dictionary don't use. Import nb_zip from mappings/mappings.py
places ={'Breezy Point-Belle Harbor-Rockaway Park-Broad': ['11697'], 'East New York': ['11207'], 'Bushwick North': ['11237'], 'Elmhurst': ['11373'], 'South Ozone Park': ['11436'], 'Arden Heights': ['MISSING'], 'Central Harlem North-Polo Grounds': ['10039'], 'Westchester-Unionport': ['10461'], 'Rosedale': ['11422'], 'Schuylerville-Throgs Neck-Edgewater Park': ['10465'], 'New Brighton-Silver Lake': ['10301'], 'Crotona Park East': ['10460'], 'Prospect Heights': ['11238']}
destinations = ["time+square+NYC|","union+square+NY|", "chamber+street+NY|", "59th+st+NY"]

params = {
   'destinations':destinations[0]+destinations[1]+destinations[2]+destinations[3],
   'mode':"transit",
   'units':"imperial",
   'traffic_model':"pessimistic",
   'transit_mode':"rail",
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


def get_commute_stats(params, destinations,places, api):
    print ("here")
    missing=0
    # this creates a dict with a list of all the neighborhoods
    neighborhood_commute_dict = dict.fromkeys(places)

    # calls the api with the params for every origin 
    for i in neighborhood_commute_dict: 
        origin = str(i)+"+NY"
        print (origin)
        params['origins']=origin 

        info = api.get('distancematrix/json', params=params)
        response_info = info.json()
        # print (response_info)

        try:
            time_sq_score = response_info["rows"][0]["elements"][0]["duration"]["value"]
            union_sq_score = response_info["rows"][0]["elements"][1]["duration"]["value"]
            chamber_st_score = response_info["rows"][0]["elements"][2]["duration"]["value"]
            fifty_ninth_st_score = response_info["rows"][0]["elements"][3]["duration"]["value"]

            # this is the avg time it takes to get from the origin to the 4 major destinations, rounded to 4 places
            total_score_seconds = ((time_sq_score+union_sq_score+chamber_st_score+fifty_ninth_st_score)/4)
            total_score_min = round((total_score_seconds/60),3)

        except: 
            total_score_min = 0 #this happens for 3 places, couldnt find them using conventional searches
            missing += 1

        neighborhood_commute_dict[i] = total_score_min
        print(total_score_min)

    print ("\n Done calculating minutes")
    print ("neighborhood_commute_dict = ", neighborhood_commute_dict)
    print ("missing: ", missing)

    return neighborhood_commute_dict

def run():
    commute = get_commute_stats(params, destinations,places, api)
    return commute




















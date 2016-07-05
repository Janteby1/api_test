from django.shortcuts import render, redirect
from django.views.generic import View
from . import distance_api
from django.http import JsonResponse


class Index(View):
    def get(self, request):
        return render(request, "index.html")

class Calc(View):
    def post(self,request):
        if request.is_ajax():
            data = request.POST
        else:
            body = request.body.decode()
            if not body: 
                return JsonResponse ({"response":"Missing Body"})
            data = json.loads(body)

        origin=data.get("origin")
        destination=data.get("destination")
        
        data = distance_api.run_origin(origin, destination)
        return JsonResponse({"success": True, 'data': data })

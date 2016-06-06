from django.shortcuts import render, redirect
from django.views.generic import View
from . import distance_api
from django.http import JsonResponse


class Index(View):
	def get(self, request):
		return render(request, "index.html")

class Api(View):
	def post(self,request):
		data = distance_api.run()
		return JsonResponse({"success": True, 'data': data })

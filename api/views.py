from django.shortcuts import render, redirect
from django.views.generic import View

# from .distance_api import start

class Index(View):
	def get(self, request):
		return render(request, "index.html")

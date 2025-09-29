from django.shortcuts import render
from .models import Testimonial

def home(request):
    testimonials = Testimonial.objects.all()
    return render(request, 'home.html', {'testimonials': testimonials})


def projects(request):
    return render(request, 'projects.html')


def contact(request):
    return render(request, 'contact.html')


def resume(request):
    return render(request, 'resume.html')

from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Testimonial, Project, Skill, About, Contact


def home(request):
    testimonials = Testimonial.objects.all()
    featured_projects = Project.objects.filter(featured=True)[:3]
    skills = Skill.objects.all()
    about = About.objects.first()

    context = {
        'testimonials': testimonials,
        'featured_projects': featured_projects,
        'skills': skills,
        'about': about,
        'frontend_skills': skills.filter(category='frontend'),
        'backend_skills': skills.filter(category='backend'),
        'tool_skills': skills.filter(category='tools'),
    }
    return render(request, 'home.html', context)


def projects(request):
    all_projects = Project.objects.all()
    context = {'projects': all_projects}
    return render(request, 'projects.html', context)


def contact(request):
    about = About.objects.first()

    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if name and email and subject and message:
            Contact.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message,
            )
            messages.success(request, "Thanks for reaching out! I'll get back to you soon.")
            return redirect('contact')
        else:
            messages.error(request, "Please fill in all fields.")

    return render(request, 'contact.html', {'about': about})


def resume(request):
    about = About.objects.first()
    return render(request, 'resume.html', {'about': about})
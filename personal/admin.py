from django.contrib import admin
from .models import Project, Skill, About, Contact, Testimonial

# Register your models here.
admin.site.register(Project)
admin.site.register(Skill)
admin.site.register(About)
admin.site.register(Contact)
admin.site.register(Testimonial)

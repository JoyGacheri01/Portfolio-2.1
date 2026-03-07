from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    technologies = models.CharField(max_length=300, help_text="Comma-separated list, e.g. Django,React,PostgreSQL")
    created_at = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=[
            ('completed', 'Completed'),
            ('in_progress', 'In Progress'),
            ('featured', 'Featured'),
        ],
        default='completed',
    )

    class Meta:
        ordering = ['-featured', '-created_at']

    def __str__(self):
        return self.title

    def get_technologies_list(self):
        """Return technologies as a Python list."""
        return [t.strip() for t in self.technologies.split(',') if t.strip()]


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('tools', 'Tools & Others'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(
        default=50,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Skill level from 0 to 100",
    )
    icon = models.CharField(max_length=100, blank=True, help_text="Font Awesome class, e.g. fab fa-python")

    class Meta:
        ordering = ['category', '-proficiency']

    def __str__(self):
        return f"{self.name} ({self.category})"


class About(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    resume = models.FileField(upload_to='resume/', blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True, default='Nairobi, Kenya')

    class Meta:
        verbose_name_plural = "About"

    def __str__(self):
        return self.name


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    quote = models.TextField()
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.IntegerField(
        choices=[(i, i) for i in range(1, 6)],
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-rating', '-created_at']

    def __str__(self):
        return f"{self.name} - {self.company}"
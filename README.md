# Personal Portfolio Website

A modern, responsive personal portfolio website built with Django, Bootstrap 5, and Font Awesome. The site showcases projects, skills, testimonials, and contact information in a clean, professional design with gradients, animations, and a unique curved sidebar navigation.

## Features

- **Home Page**: Hero section, stats, featured projects, technical skills with progress bars, testimonials (manageable via Django admin), and contact section.
- **Projects Page**: Grid of project cards with badges for technologies, live demo, and GitHub links.
- **Contact Page**: Contact information, about me section, and quick stats.
- **Sidebar Navigation**: Fixed, curved sidebar with profile picture, navigation links, and social media icons.
- **Admin Integration**: Dynamic testimonials can be added/edited via Django admin panel.
- **Responsive Design**: Mobile-friendly with Bootstrap.
- **Static Content**: Hardcoded content for portfolio items, skills, and contact info.
- **Styling**: Custom CSS with gradients, hover animations, icons, and modern UI elements.

## Technologies Used

- **Backend**: Django 4.x
- **Frontend**: Bootstrap 5.3.3, Font Awesome 6.4.0, Custom CSS
- **Database**: SQLite (default for development)
- **Images**: Placeholder images from via.placeholder.com (replace with actual assets)

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Create a Virtual Environment** (Recommended):
   ```
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**:
   ```
   pip install -r requirements.txt
   ```
   Note: If no `requirements.txt` exists, install Django:
   ```
   pip install django
   ```

4. **Apply Migrations**:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a Superuser** (for admin access):
   ```
   python manage.py createsuperuser
   ```

6. **Run the Development Server**:
   ```
   python manage.py runserver
   ```
   Open http://127.0.0.1:8000/ in your browser.

7. **Access Admin Panel**:
   Visit http://127.0.0.1:8000/admin/ and log in with your superuser credentials to manage testimonials.

## Project Structure

- `Portfolio/`: Main Django project settings.
- `personal/`: Django app for the portfolio.
  - `models.py`: Defines the Testimonial model.
  - `views.py`: Handles rendering of home, projects, and contact pages.
  - `admin.py`: Admin configuration for testimonials.
  - `templates/`: HTML templates (base.html, home.html, projects.html, contact.html).
  - `static/css/main.css`: Custom styles (separated from inline CSS).
  - `static/images/`: Directory for images (add your profile picture and project images here).

## Customization

- **Update Content**: Edit hardcoded content in `views.py` or templates.
- **Add Projects**: Modify the projects section in `home.html` or create a model for dynamic projects.
- **Profile Picture**: Replace the placeholder in `base.html` with your image in `static/images/`.
- **Testimonials**: Add via admin panel at `/admin/personal/testimonial/`.
- **Social Links**: Update links in `base.html`.
- **CSS**: Customize styles in `personal/static/css/main.css`.

## Deployment

For production deployment (e.g., on Heroku, Vercel, or a VPS):

1. Set `DEBUG = False` in `settings.py`.
2. Use a production database (e.g., PostgreSQL).
3. Collect static files: `python manage.py collectstatic`.
4. Configure environment variables for secret key, database, etc.
5. Deploy using platforms like Heroku: Follow Django deployment guides.

## Contributing

Feel free to fork the repository and submit pull requests for improvements.

## License

This project is open-source and available under the MIT License.

---

Built with ❤️ using Django. Last updated: 2025

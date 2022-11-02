from django.db import models
from accounts.models import User

class Album(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.ImageField(upload_to="images/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.url}"
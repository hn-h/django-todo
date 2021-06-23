from django.db import models

class Task(models.Model):
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=200)
    finished=models.BooleanField(default=False)

    def finish_task(self):
        self.finished=True

    def __str__(self):
        return self.title

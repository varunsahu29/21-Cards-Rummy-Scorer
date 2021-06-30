from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class GameFour(models.Model):
    start = models.DateTimeField(auto_now=True)
    t1 = models.IntegerField(default=0)
    t2 = models.IntegerField(default=0)
    t3 = models.IntegerField(default=0)
    t4 = models.IntegerField(default=0)

    def __str__(self):
        return f"Id:{self.id}  Last :{str(self.start).split(' ')} "


class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    games = models.ManyToManyField(GameFour)

    def __str__(self):
        return self.user.username


class GameFourEntry(models.Model):
    s1 = models.IntegerField()
    s2 = models.IntegerField()
    s3 = models.IntegerField()
    s4 = models.IntegerField()
    create = models.DateTimeField(auto_now=True)
    game = models.ForeignKey(GameFour, on_delete=models.CASCADE)

    def __str__(self):
        return f"Created on:{self.create} for Game:{self.game.id}"

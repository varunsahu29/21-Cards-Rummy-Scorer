from django.contrib import admin
from .models import GameFour, GameFourEntry, Player
# Register your models here.
admin.site.register(Player)
admin.site.register(GameFourEntry)
admin.site.register(GameFour)

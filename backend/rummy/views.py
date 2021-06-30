from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from .serializer import GameFourSerializer, PlayerSerializer, GameFourEntrySerializer, UserSerializer
from .models import GameFour, Player, GameFourEntry
from django.shortcuts import get_object_or_404


class GameFourViewSet(viewsets.ModelViewSet):
    queryset = GameFour.objects.all()
    serializer_class = GameFourSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        token = request.headers['Authorization'][6:]
        user = Token.objects.get(key=token).user
        uuser = UserSerializer(user)
        curplayer = Player.objects.get(user=user)
        game = GameFour(t1=0, t2=0, t3=0, t4=0)
        game.save()
        curplayer.games.add(game)
        ret_ser = GameFourSerializer(game, many=False)
        return Response({"games": ret_ser.data}, status=status.HTTP_200_OK)


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    # permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):
        token = request.headers['Authorization'][6:]
        user = Token.objects.get(key=token).user
        uuser = UserSerializer(user)
        curplayer = Player.objects.get(user=user)
        game = curplayer.games.all().order_by('-id')
        games = GameFourSerializer(game, many=True)
        return Response({"user": uuser.data, "games": games.data}, status=status.HTTP_200_OK)
        # return Response(PlayerSerializer(Player.objects.get(user=request.user.id), many=False).data, status=status.HTTP_200_OK)


class GameFourEntryViewSet(viewsets.ModelViewSet):
    queryset = GameFourEntry.objects.all()
    serializer_class = GameFourEntrySerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        cur = request.data["game"]["id"]
        cur_game = GameFour.objects.get(id=int(cur))
        if(request.data["save"]):
            obj = request.data["body"]
            obj2 = obj["record"]
            cur_game.t1 += obj2["s1"]
            cur_game.t2 += obj2["s2"]
            cur_game.t3 += obj2["s3"]
            cur_game.t4 += obj2["s4"]
            cur_game.save()
            cur_entry = GameFourEntry(
                s1=obj2["s1"], s2=obj2["s2"], s3=obj2["s3"], s4=obj2["s4"], game=cur_game)
            cur_entry.save()
            return Response(GameFourSerializer(cur_game, many=False).data, status=status.HTTP_200_OK)
        ret = GameFourEntry.objects.all().filter(game=cur_game).order_by('-id')
        ser = GameFourEntrySerializer(ret, many=True)
        return Response(ser.data, status=status.HTTP_200_OK)


class UserFromTokenViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user = Token.objects.get(key=request.data['token']).user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )

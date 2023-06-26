from chat.models import Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    
    class Meta:
        model = Message
        fields = ("id", "sender", "content", "timestamp")

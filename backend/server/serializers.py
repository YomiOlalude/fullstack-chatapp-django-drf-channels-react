from rest_framework import serializers
from server.models import Category, Channel, Server


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    channels = ChannelSerializer(many=True)
    num_members = serializers.SerializerMethodField()
    category = CategorySerializer()

    class Meta:
        model = Server
        exclude = ("members",)

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members

    def get_category(self, obj):
        return obj.category.name

    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop("num_members")
        return data

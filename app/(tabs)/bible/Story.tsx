import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { stories } from "@/constants/mockDatas";

export default function StoryDetails() {
  const { id } = useLocalSearchParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const foundStory = stories.find((item) => item.id === id);
    setStory(foundStory);
  }, [id]);

  if (!story) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-secondary-light">Story not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-2">
      <ScrollView className="flex-1 px-5 py-5">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Icon name="arrow-back" size={24} color="#6B675E" />
          </TouchableOpacity>
          <Text className="text-lg text-secondary-light font-bold ml-4">
            {story.title}
          </Text>
        </View>

        <View className="mb-4">
          <Image
            source={{
              uri: story.image,
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />
        </View>

        <Text className="text-xl font-bold mb-2 text-secondary-light">
          Summary
        </Text>
        <Text className="text-secondary-light text-sm mb-6">
          {story.summary}
        </Text>
      </ScrollView>

      <View className="px-2 py-2 bg-white flex-row items-center justify-between">
        <View className="bg-gray-100 flex-row items-center rounded-md px-4 w-full max-w-[80%]">
          <TouchableOpacity>
            <Icon name="happy-outline" size={24} color="#888" />
          </TouchableOpacity>
          <TextInput
            className="text-sm px-4 py-2 flex-1 max-h-32"
            placeholder="Send mess.."
            multiline
          />
          <TouchableOpacity>
            <Icon name="link-outline" size={24} color="#888" className="ml-4" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="camera-outline"
              size={24}
              color="#888"
              className="ml-4"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-secondary-light rounded-md px-4 py-2">
          <Icon name="mic-outline" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

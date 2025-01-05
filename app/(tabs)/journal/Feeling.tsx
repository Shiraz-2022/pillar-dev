import { imagePaths } from "@/constants/imagePaths";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Feeling() {
  const [selected, setSelected] = useState(null);

  const emojis = [
    { id: 1, label: "Sad", icon: imagePaths.sad },
    { id: 2, label: "Angry", icon: imagePaths.angry },
    { id: 3, label: "Happy", icon: imagePaths.happy },
    { id: 4, label: "Great!", icon: imagePaths.great },
  ];

  return (
    <View className="bg-primary-light h-full w-full px-5 py-5">
      <View className="flex-row items-center mb-5">
        <TouchableOpacity className="w-5" onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} color="#615C53" />
        </TouchableOpacity>
        <View className="flex-1 mx-4">
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View className="h-full w-3/5 bg-[#615C53] rounded-full" />
          </View>
        </View>
      </View>

      <Text className="text-center text-base text-gray-600 my-5">
        Dear Benjamin!
      </Text>
      <Text className="text-center text-base font-bold text-gray-800 mb-8">
        How do you feel this morning?
      </Text>

      <View className="flex-row flex-wrap justify-between mx-4">
        {emojis.map((emoji) => (
          <View key={emoji.id} className="w-[45%] mb-5">
            <TouchableOpacity
              onPress={() => setSelected(emoji.id)}
              className={`h-28 bg-white rounded-lg border justify-center items-center relative ${
                selected === emoji.id
                  ? "border-secondary-light"
                  : "border-gray-300"
              }`}
            >
              <View
                className={`absolute top-2 left-2 w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                  selected === emoji.id
                    ? "border-secondary-light"
                    : "border-gray-300"
                }`}
              >
                {selected === emoji.id && (
                  <View className="w-2.5 h-2.5 bg-secondary-light rounded-full" />
                )}
              </View>

              <Image source={emoji.icon} className="w-20 h-20" />
            </TouchableOpacity>

            <Text className="text-center text-sm font-semibold text-gray-800 mt-2">
              {emoji.label}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        className="absolute bottom-10 right-10 bg-[#615C53] p-4 rounded-full"
        onPress={() => {
          router.push("/(tabs)/journal/AddJournal");
        }}
      >
        <Icon name="arrow-forward-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

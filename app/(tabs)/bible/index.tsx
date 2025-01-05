import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { imagePaths } from "@/constants/imagePaths";
import { router } from "expo-router";
import { pillars, stories } from "@/constants/mockDatas";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView className="bg-white h-full w-full px-5">
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-lg font-bold text-secondary-light">
            Hello! Samuel
          </Text>
          <View className="flex-row items-center">
            <Icon name="flame" size={20} color="#FFAC34" />
            <Text className="text-base font-semibold mx-2 text-secondary-light">
              2
            </Text>
            <Icon name="notifications" size={20} color="#FFAC34" />
            <Image
              source={imagePaths.pp}
              className="w-7 h-7 rounded-full ml-2"
            />
          </View>
        </View>

        <Text className="text-xl font-bold mb-4 text-secondary-light">
          Pillars of Christianity
        </Text>
        <View className="flex-wrap flex-row justify-between mb-6">
          {pillars.map((pillar, index) => (
            <View
              key={index}
              className="w-[47%] h-24 bg-gray-100 rounded-lg overflow-hidden mb-4"
            >
              <ImageBackground
                source={{ uri: pillar.image }}
                className="w-full h-full relative"
                resizeMode="cover"
              >
                <View className="w-full h-full absolute z-2 bg-black/20 justify-center p-2">
                  <Text className="text-white font-bold text-sm mb-auto">
                    {pillar.title}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          ))}
        </View>

        <Text className="text-xl font-bold mb-4 text-secondary-light">
          Bible Stories
        </Text>
        <View className="space-y-4">
          {stories.map((story, index) => (
            <Pressable
              key={index}
              className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden"
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/bible/Story",
                  params: { id: index + 1 },
                });
              }}
            >
              <ImageBackground
                source={{ uri: story.image }}
                className="w-full h-full relative"
                resizeMode="cover"
              >
                <View className="w-full h-full absolute z-2 bg-black/30 justify-center items-center">
                  <Text className="text-white font-bold text-lg">
                    {story.title}
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { addJournal } from "@/api/user";

export default function AddJournal() {
  const [journalContent, setJournalContent] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!journalContent.trim()) {
      Alert.alert("Error", "Please write something before submitting.");
      return;
    }

    try {
      const response = await addJournal(journalContent);

      if (response) {
        router.push("/(tabs)/journal");
      }
    } catch (error) {
      console.error("Failed to save journal:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View className="bg-primary-light h-full w-full px-5 py-5">
      <View className="flex-row items-center mb-5">
        <TouchableOpacity className="w-5" onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} color="#615C53" />
        </TouchableOpacity>
        <View className="flex-1 mx-4">
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View className="h-full w-full bg-[#615C53] rounded-full" />
          </View>
        </View>
      </View>

      <View className="bg-white p-4 rounded-md mb-20 w-[80%] ml-auto shadow-lg shadow-black">
        <Text className="text-gray-700 text-sm">
          Use the details to describe what you are feeling grateful for.
        </Text>
      </View>

      <Text className="text-secondary-light text-sm mb-3">
        Write down things I am grateful for......
      </Text>
      <TextInput
        className="rounded-lg h-32 p-3 text-gray-800 text-sm"
        multiline
        placeholder="Start writing here..."
        placeholderTextColor="#B0B0B0"
        value={journalContent}
        onChangeText={(text) => setJournalContent(text)}
      />

      <View className="flex-row justify-between w-full px-5 mt-auto">
        <TouchableOpacity className="bg-white p-4 rounded-full border border-gray-300">
          <Icon name="image-outline" size={24} color="#4E4B48" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#4E4B48] justify-center items-center p-4 rounded-full"
          onPress={handleSubmit}
        >
          <Icon name="arrow-forward-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

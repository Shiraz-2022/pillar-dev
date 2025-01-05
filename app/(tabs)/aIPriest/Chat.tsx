import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TypeWriter from "react-native-typewriter";
import { getResponse } from "@/api/openai";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AIPriest() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotReplying, setIsBotReplying] = useState(false);
  const [botMessage, setBotMessage] = useState("");

  const handleSend = async (prompt) => {
    if (!prompt.trim()) return;

    const userMessage = { sender: "user", text: prompt };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");
    setIsBotReplying(true);

    try {
      const aiResponse = await getResponse(prompt);
      const fullResponse =
        aiResponse.response || "Sorry, I couldn't process that.";
      setBotMessage(fullResponse);
    } catch (error) {
      const errorMessage = "Something went wrong. Please try again later.";
      setBotMessage(errorMessage);
    } finally {
      setIsBotReplying(false);
    }
  };

  const handleTypingComplete = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "ai", text: botMessage },
    ]);
    setBotMessage("");
  };

  return (
    <SafeAreaView>
      <View className="bg-white h-full w-full px-5">
        <View className="flex-row justify-between items-center mb-5">
          <TouchableOpacity>
            <Icon name="menu-outline" size={24} color="#4E4B48" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="create-outline" size={24} color="#4E4B48" />
          </TouchableOpacity>
        </View>

        <Text className="text-center text-xl font-semibold text-gray-700 mb-2">
          Meet your AI Priest
        </Text>
        <Text className="text-center text-sm text-gray-500 mb-5">
          Your spiritual companion for questions, prayers, and reflections.
        </Text>

        <View className="flex-row justify-center flex-wrap gap-4 mb-10">
          <View className="flex-row">
            <TouchableOpacity
              className="border border-gray-200 py-2 px-4 rounded-full mr-2"
              onPress={() => handleSend("What is your question?")}
            >
              <Text className="text-gray-700 text-sm">Ask a Question</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-gray-200 py-2 px-4 rounded-full"
              onPress={() =>
                handleSend("Can you write me a personalized prayer?")
              }
            >
              <Text className="text-gray-700 text-sm">
                Get a Personalized Prayer
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="border border-gray-200 py-2 px-4 rounded-full"
            onPress={() => handleSend("Find a relevant Bible verse for me.")}
          >
            <Text className="text-gray-700 text-sm">Find a Bible Verse</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 rounded-md p-4 mb-5"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              className={`p-3 rounded-md border-b border-b-primary-default last:border-b-0 ${
                message.sender === "user"
                  ? "bg-primary-default rounded-full self-end mb-5"
                  : "self-start mb-7"
              }`}
            >
              <Text className="text-gray-800">{message.text}</Text>
            </View>
          ))}

          {botMessage && (
            <View className="p-3 rounded-md bg-gray-200 self-start mb-5">
              <TypeWriter
                typing={1}
                maxDelay={5}
                onTypingEnd={handleTypingComplete}
              >
                {botMessage}
              </TypeWriter>
            </View>
          )}
        </ScrollView>

        <View className="flex-row items-center">
          <TextInput
            className="text-gray-800 border text-sm border-gray-300 rounded-md px-3 py-3 flex-1"
            placeholder="Ask AI anything..."
            placeholderTextColor="#B0B0B0"
            multiline
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity
            className="border border-[#4E4B48] rounded-md justify-center items-center py-3 px-3 ml-2"
            onPress={() => handleSend(userInput)}
          >
            <Icon name="send-outline" size={20} color="#4E4B48" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-secondary-light rounded-md justify-center items-center py-3 px-3 ml-2"
            onPress={() => router.push("/aIPriest")}
          >
            <Icon name="mic-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

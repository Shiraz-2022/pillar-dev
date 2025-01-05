import { View, Pressable } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Mic from "@/components/Mic";
import LinearGradient from "react-native-linear-gradient";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { getAudioResponse } from "@/api/openai";
import AnimatedBlob from "@/components/AnimatedBlob";

export default function index() {
  const [gradientSize, setGradientSize] = useState(180);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeechStart = () => {
    setIsSpeaking(true);
    setGradientSize((prevSize) => prevSize + 20);
  };

  const handleSpeechEnd = () => {
    setIsSpeaking(false);
    setGradientSize((prevSize) => prevSize - 20);
  };

  const onRecordingStart = (isMicOn: boolean) => {
    setIsSpeaking(isMicOn);
  };

  const sendAudioToAPI = async (uri: string) => {
    try {
      setIsSpeaking(false);
      const audioFile = { uri, name: "audio.mp3", type: "audio/mpeg" };
      const response = await getAudioResponse(audioFile);

      console.log("API Response:", response);

      // Start speech after receiving the response from the API
      const responseText = response?.response || "Sorry, I couldnt get that";
      Speech.speak(responseText, {
        onStart: handleSpeechStart,
        onDone: handleSpeechEnd,
      });
    } catch (error) {
      console.error("Error in sending audio to API", error);
    }
  };

  return (
    <View className="bg-primary-light h-full w-full px-10 py-10">
      <View className="ml-auto border border-secondary-light rounded-full p-2 w-10 h-10 justify-center items-center">
        <Icon name="notifications" size={20} color="#FFAC34" />
      </View>

      {isSpeaking ? (
        <AnimatedBlob animate={true} />
      ) : (
        <AnimatedBlob animate={false} />
      )}

      <View className="flex-row justify-center items-center my-5">
        <Mic
          onRecordingComplete={sendAudioToAPI}
          onRecordingStart={onRecordingStart}
        />
        <Pressable
          className="bg-primary-default rounded-full p-3 ml-7"
          onPress={() => router.push("/aIPriest/Chat")}
        >
          <Icon name="close-outline" size={30} color="#6B675E" />
        </Pressable>
      </View>
    </View>
  );
}

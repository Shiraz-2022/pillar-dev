import { View, Pressable } from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";
import { Recording } from "expo-av/build/Audio";
import Icon from "react-native-vector-icons/Ionicons";

export default function Mic({ onRecordingComplete, onRecordingStart }) {
  const [recording, setRecording] = useState<Recording | undefined>();
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null | undefined>(
    null
  );
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const handleMicOn = () => {
    onRecordingStart(true);
    setIsMicOn(true);
    startRecording();
  };

  const handleMicOff = async () => {
    setIsMicOn(false);
    const uri = await stopRecording();
    if (uri) {
      onRecordingComplete(uri);
    }
  };

  if (!permissionResponse) {
    return <View />;
  }

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    setRecordingUri(uri);
    console.log("Recording stopped and stored at", uri);
    return uri;
  };

  return (
    <View>
      <Pressable
        onPressIn={handleMicOn}
        onPressOut={handleMicOff}
        className={`${isMicOn && "p-3 bg-primary-default rounded-full"}`}
      >
        <View className="bg-primary-default rounded-full p-3">
          <Icon name="mic-outline" size={30} color="#6B675E" />
        </View>
      </Pressable>
    </View>
  );
}

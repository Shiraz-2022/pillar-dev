import { url } from "@/constants/values";

export const getResponse = async (prompt) => {
  try {
    const res = await fetch(`${url}/openai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    console.log(`${res.status}: ${res.url}`);
    if (!res.ok) {
      throw new Error("Error in response");
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("Error in getResponse", error);
    throw new Error(error);
  }
};

export const getAudioResponse = async (audioFile) => {
  const formData = new FormData();
  formData.append("audioPrompt", audioFile);

  try {
    const res = await fetch(`${url}/openai/chat/audio`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    console.log(`${res.status}: ${res.url}`);
    if (!res.ok) {
      throw new Error("Error in response");
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("Error in getAudioResponse", error);
    throw new Error(error);
  }
};

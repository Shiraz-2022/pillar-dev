import { url } from "@/constants/values";

export const getJournals = async () => {
  try {
    console.log("statrted");
    const res = await fetch(`${url}/user/journals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`${res.status}: ${res.url}`);
    if (!res.ok) {
      throw new Error("Error fetching journals");
    }

    const data = await res.json();
    console.log("Fetched Journals:", data);

    return data;
  } catch (error) {
    console.error("Error in getJournals:", error);
    throw new Error(error);
  }
};

// Function to add a new journal entry
export const addJournal = async (journalContent) => {
  try {
    const res = await fetch(`${url}/user/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: journalContent }),
    });

    console.log(`${res.status}: ${res.url}`);
    if (!res.ok) {
      throw new Error("Error adding journal");
    }

    return res;
  } catch (error) {
    console.error("Error in addJournal:", error);
    throw new Error(error);
  }
};

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { router } from "expo-router";
import { getJournals } from "@/api/user";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupJournalsByMonth = (journals) => {
    return journals.reduce((groups, journal) => {
      const date = new Date(journal.date);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(journal);

      return groups;
    }, {});
  };

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const data = await getJournals();
        const groupedJournals = groupJournalsByMonth(data.journals);
        setJournals(groupedJournals);
      } catch (error) {
        console.error("Failed to fetch journals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  return (
    <SafeAreaView>
      <View className="bg-white h-full w-full px-5 relative">
        <View className="flex-row justify-between items-center mb-5">
          <Icon name="calendar-outline" size={24} color="#000" />
          <Icon name="search-outline" size={24} color="#000" />
        </View>
        <Text className="text-lg text-center text-secondary-light">
          TUESDAY, DEC 24
        </Text>

        <Text className="text-gray-700 text-2xl font-semibold my-3 text-center">
          Hello, Dear Benjamin!
        </Text>

        <Text className="text-gray-700 text-lg mb-4">Daily Quotes</Text>
        <View className="bg-[#E8DDC6] p-4 rounded-lg mb-5 flex-row">
          <View className="w-[75%]">
            <Text className="text-gray-700 text-sm mb-3 leading-7">
              Gratitude... encourages the development of other virtues such as
              patience, humility, and wisdom
            </Text>
            <Text className="text-gray-500 text-xs">ALLEN, S. (2018)</Text>
          </View>
          <Image
            source={{
              uri: "https://thumbs.dreamstime.com/b/man-hands-palm-praying-worship-cross-eucharist-therapy-bless-god-helping-hope-faith-christian-religion-concept-raising-up-162020217.jpg",
            }}
            className="h-full w-[25%] rounded-md"
          />
        </View>

        <TouchableOpacity className="bg-[#615C53] py-3 rounded-lg mb-5 mx-8">
          <Text className="text-white text-center text-base font-semibold">
            Start Today’s Journal
          </Text>
        </TouchableOpacity>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color="#615C53" />
          ) : Object.keys(journals).length === 0 ? (
            <Text className="text-gray-500 text-center mt-10">
              No journal entries found.
            </Text>
          ) : (
            Object.keys(journals).map((monthYear) => (
              <View
                key={monthYear}
                className="mb-5  border-b-0.5 border-b-secondary-light "
              >
                <Text className="text-black font-semibold text-lg mb-5">
                  {monthYear}
                </Text>

                {journals[monthYear].map((journal) => (
                  <View
                    key={journal.id}
                    className="flex-row items-center mb-5 pb-4"
                  >
                    <View className="bg-[#F9F4EC] py-1 px-2 rounded-md border border-[#D8D8D7] mr-7 items-center">
                      <Text className="text-[#B3B1AF] text-xs font-semibold">
                        {new Date(journal.date)
                          .toLocaleDateString("en-US", { weekday: "short" })
                          .toUpperCase()}
                      </Text>
                      <Text className="text-gray-700 text-xs font-semibold">
                        {new Date(journal.date).getDate()}
                      </Text>
                    </View>
                    <View>
                      <Text className="flex-1 text-center text-gray-500 text-sm">
                        What I was grateful for
                      </Text>
                      <Text className="text-secondary-light font-semibold">
                        {journal.content}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))
          )}
        </ScrollView>

        <View className="absolute right-0 bottom-10 bg-white p-10 rounded-full">
          <TouchableOpacity
            className="bg-[#615C53] p-3 rounded-full self-end mt-5"
            onPress={() => router.push("/(tabs)/journal/Feeling")}
          >
            <Icon name="add-outline" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

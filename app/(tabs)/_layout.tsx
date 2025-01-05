import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="aIPriest"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FCFCFC",
          height: 70,
          shadowColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarIconStyle: {
          marginVertical: "auto",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-12">
              <Icon name="home-outline" size={24} color="#6B675E" />
              <View
                style={
                  focused && {
                    borderBottomWidth: 3,
                    borderBottomColor: "#6F6097",
                    paddingBottom: 3,
                  }
                }
              >
                <Text
                  className="text-[10px]"
                  style={focused && { color: "#6F6097" }}
                >
                  Home
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="aIPriest"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-12">
              <Icon name="color-wand-outline" size={24} color="#6B675E" />
              <View
                style={
                  focused && {
                    borderBottomWidth: 3,
                    borderBottomColor: "#6F6097",
                    paddingBottom: 3,
                  }
                }
              >
                <Text
                  className="text-[10px]"
                  style={focused && { color: "#6F6097" }}
                >
                  AI Priest
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="abilities"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-12">
              <Icon name="heart-circle-outline" size={24} color="#6B675E" />
              <View
                style={
                  focused && {
                    borderBottomWidth: 3,
                    borderBottomColor: "#6F6097",
                    paddingBottom: 3,
                  }
                }
              >
                <Text
                  className="text-[10px]"
                  style={focused && { color: "#6F6097" }}
                >
                  Abilities
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-12">
              <Icon name="book-outline" size={24} color="#6B675E" />
              <View
                style={
                  focused && {
                    borderBottomWidth: 3,
                    borderBottomColor: "#6F6097",
                    paddingBottom: 3,
                  }
                }
              >
                <Text
                  className="text-[10px]"
                  style={focused && { color: "#6F6097" }}
                >
                  Bible
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-12">
              <Icon name="journal-outline" size={24} color="#6B675E" />
              <View
                style={
                  focused && {
                    borderBottomWidth: 3,
                    borderBottomColor: "#6F6097",
                    paddingBottom: 3,
                  }
                }
              >
                <Text
                  className="text-[10px] font-medium"
                  style={focused && { color: "#6F6097" }}
                >
                  Journal
                </Text>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

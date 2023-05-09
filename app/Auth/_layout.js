import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function tabLayout (){
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <AntDesign name="login" size={24} color="black" />,
          href: {
            pathname: "/Auth/",
            params: {},
          },
          title: "Login",
        }}
      />
      <Tabs.Screen
        name="signUp"
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-person-add-outline" size={24} color="black" />
          ),
          href: {
            pathname: "Auth/signUp",
          },
          title: "SignUp",
        }}
      />
    </Tabs>
  );
};

import { Tabs, useRouter } from "expo-router";

// Exemplo de ícone usando react-native-vector-icons ou @expo/vector-icons
import { colors } from "@/constants/Styles";
import { useSession } from "@/contexts/AuthContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { StatusBar, View } from "react-native";

export default function TabLayout() {
  const { signOut } = useSession();
  const router = useRouter();

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#fff",
          },
          headerStyle: {
            backgroundColor: colors.primary,
            height: 110,
          },
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View>
              <Image
                source={require("@/assets/logo-white.png")}
                contentFit="contain"
                style={{ width: 190, height: 90 }}
              />
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="pedidos"
          options={{
            title: "Pedidos",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "cart" : "cart-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "account" : "account-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

type TabBarIconProps = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
};

function TabBarIcon({ name, color }: TabBarIconProps) {
  return <MaterialCommunityIcons size={24} name={name} color={color} />;
}

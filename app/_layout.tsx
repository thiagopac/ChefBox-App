import { ChefMenuProvider } from "@/contexts/MenuChefContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from 'react-native-toast-message';
import { SplashScreenController } from "../components/SplashScreenController";
import { SessionProvider, useSession } from "../contexts/AuthContext";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <PaperProvider>
      <SessionProvider>
        <ChefMenuProvider>
          <OrderProvider>
            <SplashScreenController />
            <RootNavigator />
            <Toast />
          </OrderProvider>
        </ChefMenuProvider>
      </SessionProvider>
    </PaperProvider>
  );
}

// Separate this into a new component so it can access the SessionProvider context later
function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

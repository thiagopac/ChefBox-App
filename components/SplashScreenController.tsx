import { SplashScreen } from "expo-router";
import { useSession } from "../contexts/AuthContext";

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}

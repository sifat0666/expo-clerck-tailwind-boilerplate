import { useClerk } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

import { View } from "react-native";

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    checknavloaded();
  }, []);

  function checknavloaded() {
    if (!rootNavigationState.key) {
      return null;
    }
  }
  const { user } = useClerk();

  return (
    <View>
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href="/login" />}
    </View>
  );
}

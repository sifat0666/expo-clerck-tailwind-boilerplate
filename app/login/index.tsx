import { View, Text, Image, Pressable, Button } from "react-native";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { Link, router } from "expo-router";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        // setActive!({ session: createdSessionId });
        console.log("login success");
        router.push("/home");
      } else {
        // Use signIn or signUp for next steps such as MFA
        console.log("login success");
        router.push("/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/home");
    }
    console.log("hello ");
  }, [isSignedIn]);

  return (
    <View>
      <Image
        source={require("../../assets/images/login.png")}
        style={{ width: "100%", height: 500 }}
      />
      <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Lets adopt the pet which you like and make there life happy again
        </Text>
        <Pressable
          onPress={onPress}
          className="text-white bg-yellow-500 px-10 py-2 rounded-md mt-10"
        >
          <Text className="text-white font-bold text-xl px-20">Login</Text>
        </Pressable>
        {/* <Text>{JSON.stringify(user)}</Text>{" "} */}
        {/* <Text>{user?.emailAddresses[0]?.emailAddress}</Text> */}
        <Button
          title="signout"
          onPress={async () => {
            await signOut();
          }}
        />
      </View>
    </View>
  );
}

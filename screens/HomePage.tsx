import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slide, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.circle} />

      <View style={styles.body}>
        <Animated.View
          style={{
            opacity: fade,
            transform: [{ translateY: slide }],
          }}
        >
          <Text style={styles.logo}>
            Lis<Text style={styles.accent}>Tly</Text>
          </Text>
        </Animated.View>

        <Animated.Text style={[styles.text, { opacity: fade }]}>
          From list to cart in seconds.
        </Animated.Text>

        <Animated.View
          style={[
            styles.imageBox,
            {
              opacity: fade,
              transform: [{ scale: fade }],
            },
          ]}
        >
          <Image
            source={require("../assets/images/shop.png")}
            style={styles.image}
            contentFit="contain"
          />
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, { opacity: fade }]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/(tabs)/list")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  circle: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#F1F5F9",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 42,
    fontWeight: "900",
    color: "#1E293B",
    letterSpacing: -1,
  },
  accent: {
    color: "#6366F1",
  },
  text: {
    fontSize: 17,
    color: "#64748B",
    marginTop: 8,
    textAlign: "center",
  },
  imageBox: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6366F1",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

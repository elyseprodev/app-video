import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

const FONTS = ["Arial", "Georgia", "Courier", "Verdana", "Times New Roman"];
const ANIMATIONS = ["None", "Fade In", "Slide Up", "Bounce", "Typewriter"];
const COLORS = ["White", "Black", "Yellow", "Red", "Blue"];

export default function TextCaptionsScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  const [enableCaptions, setEnableCaptions] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedAnimation, setSelectedAnimation] = useState("None");
  const [selectedColor, setSelectedColor] = useState("White");
  const [fontSize, setFontSize] = useState("24");

  if (authLoading) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-foreground">Please sign in to configure text</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-base text-primary font-semibold">← Back</Text>
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-foreground mt-2">Text & Captions</Text>
            <Text className="text-base text-muted">Customize text and caption styling</Text>
          </View>

          {/* Enable Captions */}
          <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
            <View>
              <Text className="text-base font-semibold text-foreground">Auto-Captions</Text>
              <Text className="text-sm text-muted mt-1">Generate captions from audio</Text>
            </View>
            <TouchableOpacity
              className={`px-4 py-2 rounded-full ${enableCaptions ? "bg-primary" : "bg-surface border border-border"}`}
              onPress={() => setEnableCaptions(!enableCaptions)}
            >
              <Text className={`text-sm font-semibold ${enableCaptions ? "text-background" : "text-foreground"}`}>
                {enableCaptions ? "ON" : "OFF"}
              </Text>
            </TouchableOpacity>
          </View>

          {enableCaptions && (
            <>
              {/* Font Selection */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Font</Text>
                <View className="flex-row flex-wrap gap-2">
                  {FONTS.map((font) => (
                    <TouchableOpacity
                      key={font}
                      className={`px-4 py-2 rounded-full border ${
                        selectedFont === font
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                      onPress={() => setSelectedFont(font)}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          selectedFont === font ? "text-background" : "text-foreground"
                        }`}
                      >
                        {font}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Font Size */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Font Size</Text>
                <TextInput
                  className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                  placeholder="24"
                  placeholderTextColor="#9BA1A6"
                  value={fontSize}
                  onChangeText={setFontSize}
                  keyboardType="numeric"
                />
              </View>

              {/* Text Color */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Text Color</Text>
                <View className="flex-row flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <TouchableOpacity
                      key={color}
                      className={`px-4 py-2 rounded-full border ${
                        selectedColor === color
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                      onPress={() => setSelectedColor(color)}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          selectedColor === color ? "text-background" : "text-foreground"
                        }`}
                      >
                        {color}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Animation */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Text Animation</Text>
                <View className="flex-row flex-wrap gap-2">
                  {ANIMATIONS.map((animation) => (
                    <TouchableOpacity
                      key={animation}
                      className={`px-4 py-2 rounded-full border ${
                        selectedAnimation === animation
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                      onPress={() => setSelectedAnimation(animation)}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          selectedAnimation === animation ? "text-background" : "text-foreground"
                        }`}
                      >
                        {animation}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Preview */}
          <View className="bg-surface rounded-2xl p-6 border border-border items-center gap-2 min-h-32">
            <Text className="text-lg font-semibold text-foreground">Preview</Text>
            {enableCaptions ? (
              <Text
                className="text-center text-foreground"
                style={{ fontSize: parseInt(fontSize) || 24 }}
              >
                Sample Caption Text
              </Text>
            ) : (
              <Text className="text-sm text-muted">Captions disabled</Text>
            )}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl active:opacity-80 mt-4"
            onPress={() => router.push(`../export-settings?projectId=${projectId}`)}
          >
            <Text className="text-background font-semibold text-center text-lg">
              Continue to Export Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

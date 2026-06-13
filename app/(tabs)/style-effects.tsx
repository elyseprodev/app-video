import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

const STYLES = ["Cinematic", "Energetic", "Minimal", "Vintage", "Modern", "Artistic"];
const TRANSITIONS = ["Fade", "Slide", "Zoom", "Blur", "Cut", "Dissolve"];
const FILTERS = ["None", "Warm", "Cool", "Vintage", "B&W", "Vibrant"];

export default function StyleEffectsScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  const [selectedStyle, setSelectedStyle] = useState("Modern");
  const [selectedTransition, setSelectedTransition] = useState("Fade");
  const [selectedFilter, setSelectedFilter] = useState("None");

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
        <Text className="text-lg text-foreground">Please sign in to configure styles</Text>
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
            <Text className="text-3xl font-bold text-foreground mt-2">Style & Effects</Text>
            <Text className="text-base text-muted">Customize your video appearance</Text>
          </View>

          {/* Video Style */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Video Style</Text>
            <View className="flex-row flex-wrap gap-2">
              {STYLES.map((style) => (
                <TouchableOpacity
                  key={style}
                  className={`px-4 py-2 rounded-full border ${
                    selectedStyle === style
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedStyle(style)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedStyle === style ? "text-background" : "text-foreground"
                    }`}
                  >
                    {style}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Transition */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Default Transition</Text>
            <View className="flex-row flex-wrap gap-2">
              {TRANSITIONS.map((transition) => (
                <TouchableOpacity
                  key={transition}
                  className={`px-4 py-2 rounded-full border ${
                    selectedTransition === transition
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedTransition(transition)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedTransition === transition ? "text-background" : "text-foreground"
                    }`}
                  >
                    {transition}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Filter */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Color Filter</Text>
            <View className="flex-row flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  className={`px-4 py-2 rounded-full border ${
                    selectedFilter === filter
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedFilter === filter ? "text-background" : "text-foreground"
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Preview */}
          <View className="bg-surface rounded-2xl p-6 border border-border items-center gap-2 min-h-48">
            <Text className="text-lg font-semibold text-foreground">Preview</Text>
            <Text className="text-sm text-muted text-center">
              {selectedStyle} style with {selectedTransition} transition and {selectedFilter} filter
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl active:opacity-80 mt-4"
            onPress={() => router.push(`../music-voice?projectId=${projectId}`)}
          >
            <Text className="text-background font-semibold text-center text-lg">
              Continue to Music & Voice
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

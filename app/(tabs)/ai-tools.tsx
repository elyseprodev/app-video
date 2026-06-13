import { ScrollView, Text, View, TouchableOpacity, Switch, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

export default function AIToolsScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  const [enableTextToVideo, setEnableTextToVideo] = useState(false);
  const [enableAutoCaptions, setEnableAutoCaptions] = useState(false);
  const [enableNarration, setEnableNarration] = useState(false);
  const [enableBackgroundRemoval, setEnableBackgroundRemoval] = useState(false);

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
        <Text className="text-lg text-foreground">Please sign in to use AI tools</Text>
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
            <Text className="text-3xl font-bold text-foreground mt-2">AI Tools</Text>
            <Text className="text-base text-muted">Enable AI features for your video</Text>
          </View>

          {/* AI Tools List */}
          <View className="gap-3">
            {/* Text-to-Video */}
            <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-base font-semibold text-foreground">Text-to-Video</Text>
                  <Text className="text-sm text-muted mt-1">
                    Generate video from your text description
                  </Text>
                </View>
                <Switch value={enableTextToVideo} onValueChange={setEnableTextToVideo} />
              </View>
            </View>

            {/* Auto-Captions */}
            <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-base font-semibold text-foreground">Auto-Captions</Text>
                  <Text className="text-sm text-muted mt-1">
                    Automatically generate captions from audio
                  </Text>
                </View>
                <Switch value={enableAutoCaptions} onValueChange={setEnableAutoCaptions} />
              </View>
            </View>

            {/* Narration */}
            <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-base font-semibold text-foreground">Narration</Text>
                  <Text className="text-sm text-muted mt-1">
                    Generate voice-over from text
                  </Text>
                </View>
                <Switch value={enableNarration} onValueChange={setEnableNarration} />
              </View>
            </View>

            {/* Background Removal */}
            <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-base font-semibold text-foreground">
                    Background Removal
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    Remove backgrounds from images and videos
                  </Text>
                </View>
                <Switch
                  value={enableBackgroundRemoval}
                  onValueChange={setEnableBackgroundRemoval}
                />
              </View>
            </View>
          </View>

          {/* Info Box */}
          <View className="bg-primary/10 border border-primary rounded-2xl p-4 gap-2">
            <Text className="text-sm font-semibold text-primary">💡 Tip</Text>
            <Text className="text-sm text-foreground">
              All AI features are optional. Enable only the tools you need for your video.
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl active:opacity-80 mt-4"
            onPress={() => router.push(`../style-effects?projectId=${projectId}`)}
          >
            <Text className="text-background font-semibold text-center text-lg">
              Continue to Style & Effects
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

const MUSIC_STYLES = ["Upbeat", "Calm", "Dramatic", "Ambient", "Energetic", "Minimal"];
const VOICE_OPTIONS = ["None", "Male", "Female", "Narrator"];

export default function MusicVoiceScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  const [selectedMusicStyle, setSelectedMusicStyle] = useState("Upbeat");
  const [selectedVoice, setSelectedVoice] = useState("None");
  const [musicVolume, setMusicVolume] = useState(0.7);
  const [voiceVolume, setVoiceVolume] = useState(0.8);

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
        <Text className="text-lg text-foreground">Please sign in to configure audio</Text>
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
            <Text className="text-3xl font-bold text-foreground mt-2">Music & Voice</Text>
            <Text className="text-base text-muted">Configure audio for your video</Text>
          </View>

          {/* Background Music */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Background Music</Text>
            <View className="flex-row flex-wrap gap-2">
              {MUSIC_STYLES.map((style) => (
                <TouchableOpacity
                  key={style}
                  className={`px-4 py-2 rounded-full border ${
                    selectedMusicStyle === style
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedMusicStyle(style)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedMusicStyle === style ? "text-background" : "text-foreground"
                    }`}
                  >
                    {style}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="bg-surface rounded-xl p-3 gap-2">
              <View className="flex-row justify-between">
                <Text className="text-xs text-muted">Music Volume</Text>
                <Text className="text-xs text-muted">{Math.round(musicVolume * 100)}%</Text>
              </View>
              <View className="flex-row gap-2">
                {[0, 0.25, 0.5, 0.75, 1].map((val) => (
                  <TouchableOpacity
                    key={val}
                    className={`flex-1 py-2 rounded border ${
                      Math.abs(musicVolume - val) < 0.1
                        ? "bg-primary border-primary"
                        : "bg-border border-border"
                    }`}
                    onPress={() => setMusicVolume(val)}
                  >
                    <Text className="text-xs text-center font-semibold text-foreground">
                      {Math.round(val * 100)}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Voice-Over */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Voice-Over</Text>
            <View className="flex-row flex-wrap gap-2">
              {VOICE_OPTIONS.map((voice) => (
                <TouchableOpacity
                  key={voice}
                  className={`px-4 py-2 rounded-full border ${
                    selectedVoice === voice
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedVoice(voice)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedVoice === voice ? "text-background" : "text-foreground"
                    }`}
                  >
                    {voice}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedVoice !== "None" && (
              <View className="bg-surface rounded-xl p-3 gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-xs text-muted">Voice Volume</Text>
                  <Text className="text-xs text-muted">{Math.round(voiceVolume * 100)}%</Text>
                </View>
                <View className="flex-row gap-2">
                  {[0, 0.25, 0.5, 0.75, 1].map((val) => (
                    <TouchableOpacity
                      key={val}
                      className={`flex-1 py-2 rounded border ${
                        Math.abs(voiceVolume - val) < 0.1
                          ? "bg-primary border-primary"
                          : "bg-border border-border"
                      }`}
                      onPress={() => setVoiceVolume(val)}
                    >
                      <Text className="text-xs text-center font-semibold text-foreground">
                        {Math.round(val * 100)}%
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Info */}
          <View className="bg-primary/10 border border-primary rounded-2xl p-4 gap-2">
            <Text className="text-sm font-semibold text-primary">🎵 Audio Tips</Text>
            <Text className="text-sm text-foreground">
              Balance music and voice volumes for the best result. Music should complement your narration.
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl active:opacity-80 mt-4"
            onPress={() => router.push(`../text-captions?projectId=${projectId}`)}
          >
            <Text className="text-background font-semibold text-center text-lg">
              Continue to Text & Captions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

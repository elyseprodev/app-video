import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

const RESOLUTIONS = ["720p", "1080p", "4K"];
const FORMATS = ["mp4", "mov"];
const QUALITIES = ["low", "medium", "high"];

export default function ExportSettingsScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  const [selectedResolution, setSelectedResolution] = useState("1080p");
  const [selectedFormat, setSelectedFormat] = useState("mp4");
  const [selectedQuality, setSelectedQuality] = useState("high");
  const [isExporting, setIsExporting] = useState(false);

  const createExportMutation = trpc.exports.create.useMutation({
    onSuccess: () => {
      setIsExporting(false);
      router.push(`../editor/${projectId}`);
    },
    onError: (error) => {
      setIsExporting(false);
      alert(error.message || "Failed to create export");
    },
  });

  const handleExport = async () => {
    if (!projectId) return;

    setIsExporting(true);
    await createExportMutation.mutateAsync({
      projectId: parseInt(projectId),
      format: selectedFormat as "mp4" | "mov",
      resolution: selectedResolution as "720p" | "1080p" | "4K",
      quality: selectedQuality as "low" | "medium" | "high",
    });
  };

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
        <Text className="text-lg text-foreground">Please sign in to export videos</Text>
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
            <Text className="text-3xl font-bold text-foreground mt-2">Export Settings</Text>
            <Text className="text-base text-muted">Choose your export preferences</Text>
          </View>

          {/* Resolution */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Resolution</Text>
            <View className="flex-row gap-2">
              {RESOLUTIONS.map((res) => (
                <TouchableOpacity
                  key={res}
                  className={`flex-1 py-3 rounded-xl border ${
                    selectedResolution === res
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedResolution(res)}
                >
                  <Text
                    className={`text-center font-semibold ${
                      selectedResolution === res ? "text-background" : "text-foreground"
                    }`}
                  >
                    {res}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Format */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Format</Text>
            <View className="flex-row gap-2">
              {FORMATS.map((fmt) => (
                <TouchableOpacity
                  key={fmt}
                  className={`flex-1 py-3 rounded-xl border ${
                    selectedFormat === fmt ? "bg-primary border-primary" : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedFormat(fmt)}
                >
                  <Text
                    className={`text-center font-semibold uppercase ${
                      selectedFormat === fmt ? "text-background" : "text-foreground"
                    }`}
                  >
                    {fmt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quality */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Quality</Text>
            <View className="gap-2">
              {QUALITIES.map((quality) => (
                <TouchableOpacity
                  key={quality}
                  className={`py-3 px-4 rounded-xl border ${
                    selectedQuality === quality
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedQuality(quality)}
                >
                  <Text
                    className={`text-center font-semibold capitalize ${
                      selectedQuality === quality ? "text-background" : "text-foreground"
                    }`}
                  >
                    {quality}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Export Summary */}
          <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
            <Text className="text-base font-semibold text-foreground">Export Summary</Text>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Resolution</Text>
                <Text className="text-sm font-semibold text-foreground">{selectedResolution}</Text>
              </View>
              <View className="flex-row justify-between pt-2 border-t border-border">
                <Text className="text-sm text-muted">Format</Text>
                <Text className="text-sm font-semibold text-foreground uppercase">{selectedFormat}</Text>
              </View>
              <View className="flex-row justify-between pt-2 border-t border-border">
                <Text className="text-sm text-muted">Quality</Text>
                <Text className="text-sm font-semibold text-foreground capitalize">{selectedQuality}</Text>
              </View>
            </View>
          </View>

          {/* Export Button */}
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl active:opacity-80 mt-4"
            onPress={handleExport}
            disabled={isExporting || createExportMutation.isPending}
          >
            {isExporting || createExportMutation.isPending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-background font-semibold text-center text-lg">
                Export Video
              </Text>
            )}
          </TouchableOpacity>

          {/* Info */}
          <View className="bg-primary/10 border border-primary rounded-2xl p-4 gap-2">
            <Text className="text-sm font-semibold text-primary">📤 Export Info</Text>
            <Text className="text-sm text-foreground">
              Your video will be processed and available for download shortly. You&apos;ll receive a notification when it&apos;s ready.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

interface DownloadedVideo {
  id: string;
  name: string;
  format: string;
  resolution: string;
  size: string;
  downloadedAt: string;
  isLocal: boolean;
}

export default function DownloadsScreen() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const downloadedVideos: DownloadedVideo[] = [
    {
      id: "1",
      name: "My First Video",
      format: "MP4",
      resolution: "1080p",
      size: "245 MB",
      downloadedAt: "Today",
      isLocal: true,
    },
    {
      id: "2",
      name: "Product Demo",
      format: "MOV",
      resolution: "4K",
      size: "892 MB",
      downloadedAt: "Yesterday",
      isLocal: true,
    },
  ];

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
        <Text className="text-lg text-foreground">Please sign in to view downloads</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Downloads</Text>
            <Text className="text-base text-muted">Your exported videos</Text>
          </View>

          {/* Storage Info */}
          <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-foreground">Storage Used</Text>
              <Text className="text-sm font-semibold text-foreground">2.4 GB / 10 GB</Text>
            </View>
            <View className="w-full h-2 bg-border rounded-full overflow-hidden">
              <View className="h-full w-1/4 bg-primary rounded-full" />
            </View>
            <Text className="text-xs text-muted">24% of available storage</Text>
          </View>

          {/* Videos List */}
          {downloadedVideos.length > 0 ? (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">
                {downloadedVideos.length} Video{downloadedVideos.length !== 1 ? "s" : ""}
              </Text>
              <FlatList
                data={downloadedVideos}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-2xl p-4 mb-3 border border-border gap-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-foreground">{item.name}</Text>
                        <Text className="text-sm text-muted mt-1">
                          {item.format} • {item.resolution} • {item.size}
                        </Text>
                        <Text className="text-xs text-muted mt-1">Downloaded {item.downloadedAt}</Text>
                      </View>
                      <View className="w-12 h-12 bg-primary/20 rounded-lg items-center justify-center">
                        <Text className="text-lg">🎬</Text>
                      </View>
                    </View>

                    {/* Actions */}
                    <View className="flex-row gap-2">
                      <TouchableOpacity className="flex-1 bg-primary/20 border border-primary px-3 py-2 rounded-lg active:opacity-70">
                        <Text className="text-primary font-semibold text-center text-xs">
                          📤 Share
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 bg-primary/20 border border-primary px-3 py-2 rounded-lg active:opacity-70">
                        <Text className="text-primary font-semibold text-center text-xs">
                          💾 Save
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 bg-error/20 border border-error px-3 py-2 rounded-lg active:opacity-70">
                        <Text className="text-error font-semibold text-center text-xs">
                          🗑 Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          ) : (
            <View className="bg-surface rounded-2xl p-6 border border-border items-center gap-2 min-h-48">
              <Text className="text-lg font-semibold text-foreground">No Downloads Yet</Text>
              <Text className="text-sm text-muted text-center">
                Export your first video to see it here
              </Text>
              <TouchableOpacity className="bg-primary px-6 py-2 rounded-full mt-4 active:opacity-80">
                <Text className="text-background font-semibold">Create Video</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Sharing Options */}
          <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
            <Text className="text-base font-semibold text-foreground">Share Options</Text>
            <View className="gap-2">
              <TouchableOpacity className="bg-background border border-border px-4 py-3 rounded-lg active:opacity-70">
                <Text className="text-foreground font-semibold text-center">📱 Share to Social Media</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-background border border-border px-4 py-3 rounded-lg active:opacity-70">
                <Text className="text-foreground font-semibold text-center">🔗 Generate Share Link</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-background border border-border px-4 py-3 rounded-lg active:opacity-70">
                <Text className="text-foreground font-semibold text-center">📧 Email Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

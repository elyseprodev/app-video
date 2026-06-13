import { ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { data: projects, isLoading: projectsLoading } = trpc.projects.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (authLoading) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center p-6 gap-4">
        <Text className="text-3xl font-bold text-foreground text-center">THE BEST VIDEO</Text>
        <Text className="text-base text-muted text-center">
          Create professional videos with full control
        </Text>
        <TouchableOpacity
          className="bg-primary px-8 py-4 rounded-full mt-4"
          onPress={() => router.push("/oauth/callback")}
        >
          <Text className="text-background font-semibold text-center">Sign In</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Welcome back, {user?.name || "Creator"}!</Text>
            <Text className="text-base text-muted">Continue creating amazing videos</Text>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
              <TouchableOpacity
                className="bg-primary px-6 py-2 rounded-full mt-2 active:opacity-80"
                onPress={() => router.push("../(tabs)/create")}
              >
                <Text className="text-background font-semibold">Create New</Text>
              </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface border border-border px-6 py-3 rounded-2xl active:opacity-70"
              onPress={() => router.push("../(tabs)/projects")}
            >
              <Text className="text-foreground font-semibold text-center">Browse All Projects</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Projects */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">Recent Projects</Text>
            {projectsLoading ? (
              <ActivityIndicator size="large" />
            ) : projects && projects.length > 0 ? (
              <FlatList
                data={projects.slice(0, 3)}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                <TouchableOpacity
                    className="bg-surface rounded-2xl p-4 mb-3 border border-border active:opacity-70"
                    onPress={() => router.push(`../(tabs)/editor/${item.id}`)}
                  >
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-lg font-semibold text-foreground">{item.name}</Text>
                        <Text className="text-sm text-muted mt-1">{item.status}</Text>
                      </View>
                      <Text className="text-xs text-muted bg-primary/10 px-3 py-1 rounded-full">
                        {item.format?.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View className="bg-surface rounded-2xl p-6 items-center gap-2 border border-border">
                <Text className="text-base text-muted">No projects yet</Text>
                <Text className="text-sm text-muted text-center">
                  Create your first video to get started
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

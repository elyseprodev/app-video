import { ScrollView, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

export default function ProjectsScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { data: projects, isLoading: projectsLoading } = trpc.projects.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const utils = trpc.useUtils();
  const deleteProjectMutation = trpc.projects.delete.useMutation({
    onSuccess: () => {
      utils.projects.list.invalidate();
    },
    onError: (error) => {
      alert(error.message || "Failed to delete project");
    },
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
      <ScreenContainer className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-foreground">Please sign in to view projects</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">My Projects</Text>
            <Text className="text-base text-muted">Manage your video projects</Text>
          </View>

          {/* Projects List */}
          {projectsLoading ? (
            <ActivityIndicator size="large" />
          ) : projects && projects.length > 0 ? (
            <FlatList
              data={projects}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                    className="bg-surface rounded-2xl p-4 mb-3 border border-border active:opacity-70"
                    onPress={() => router.push(`../editor/${item.id}`)}
                  >
                  <View className="gap-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-lg font-semibold text-foreground">{item.name}</Text>
                        <Text className="text-sm text-muted mt-1">{item.description}</Text>
                      </View>
                      <View className="flex-row gap-2">
                        <Text className="text-xs text-muted bg-primary/10 px-3 py-1 rounded-full">
                          {item.format?.toUpperCase()}
                        </Text>
                        <Text className="text-xs text-muted bg-primary/10 px-3 py-1 rounded-full">
                          {item.resolution}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center pt-2 border-t border-border">
                      <Text className="text-xs text-muted">
                        {item.status === "draft" ? "Draft" : item.status === "completed" ? "Completed" : "Processing"}
                      </Text>
                      <TouchableOpacity
                        onPress={() => deleteProjectMutation.mutate({ projectId: item.id })}
                        disabled={deleteProjectMutation.isPending}
                      >
                        <Text className="text-xs text-error">Delete</Text>
                      </TouchableOpacity>
                    </View>
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
              <TouchableOpacity
                className="bg-primary px-6 py-2 rounded-full mt-2 active:opacity-80"
                onPress={() => router.push("./create")}
              >
                <Text className="text-background font-semibold">Create New</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

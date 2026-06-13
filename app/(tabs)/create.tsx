import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

export default function CreateScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [resolution, setResolution] = useState<"720p" | "1080p" | "4K">("1080p");
  const [format, setFormat] = useState<"mp4" | "mov">("mp4");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");

  const createProjectMutation = trpc.projects.create.useMutation({
    onSuccess: (projectId) => {
      router.push(`../content-input?projectId=${projectId}`);
    },
    onError: (error) => {
      alert(error.message || "Failed to create project");
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
        <Text className="text-lg text-foreground">Please sign in to create videos</Text>
      </ScreenContainer>
    );
  }

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      alert("Please enter a project name");
      return;
    }

    await createProjectMutation.mutateAsync({
      name: projectName,
      resolution,
      format,
      aspectRatio,
    });
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Create New Video</Text>
            <Text className="text-base text-muted">Set up your project details</Text>
          </View>

          {/* Project Name */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Project Name</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="Enter project name"
              placeholderTextColor="#9BA1A6"
              value={projectName}
              onChangeText={setProjectName}
            />
          </View>

          {/* Resolution */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Resolution</Text>
            <View className="flex-row gap-2">
              {(["720p", "1080p", "4K"] as const).map((res) => (
                <TouchableOpacity
                  key={res}
                  className={`flex-1 py-3 rounded-xl border ${
                    resolution === res
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setResolution(res)}
                >
                  <Text
                    className={`text-center font-semibold ${
                      resolution === res ? "text-background" : "text-foreground"
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
              {(["mp4", "mov"] as const).map((fmt) => (
                <TouchableOpacity
                  key={fmt}
                  className={`flex-1 py-3 rounded-xl border ${
                    format === fmt ? "bg-primary border-primary" : "bg-surface border-border"
                  }`}
                  onPress={() => setFormat(fmt)}
                >
                  <Text
                    className={`text-center font-semibold uppercase ${
                      format === fmt ? "text-background" : "text-foreground"
                    }`}
                  >
                    {fmt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Aspect Ratio */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Aspect Ratio</Text>
            <View className="gap-2">
              {(["16:9", "9:16", "1:1"] as const).map((ratio) => (
                <TouchableOpacity
                  key={ratio}
                  className={`py-3 px-4 rounded-xl border ${
                    aspectRatio === ratio
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setAspectRatio(ratio)}
                >
                  <Text
                    className={`text-center font-semibold ${
                      aspectRatio === ratio ? "text-background" : "text-foreground"
                    }`}
                  >
                    {ratio}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Create Button */}
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl mt-4 active:opacity-80"
            onPress={handleCreateProject}
            disabled={createProjectMutation.isPending}
          >
            {createProjectMutation.isPending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-background font-semibold text-center text-lg">
                Create Project
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

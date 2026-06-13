import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video" | "audio";
  uri: string;
}

export default function ContentInputScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setUploadedFiles([
        ...uploadedFiles,
        {
          id: Date.now().toString(),
          name: asset.fileName || "Image",
          type: "image",
          uri: asset.uri,
        },
      ]);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setUploadedFiles([
        ...uploadedFiles,
        {
          id: Date.now().toString(),
          name: asset.fileName || "Video",
          type: "video",
          uri: asset.uri,
        },
      ]);
    }
  };

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setUploadedFiles([
        ...uploadedFiles,
        {
          id: Date.now().toString(),
          name: asset.name || "Audio",
          type: "audio",
          uri: asset.uri,
        },
      ]);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
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
        <Text className="text-lg text-foreground">Please sign in to upload content</Text>
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
            <Text className="text-3xl font-bold text-foreground mt-2">Add Content</Text>
            <Text className="text-base text-muted">Upload media and describe your video</Text>
          </View>

          {/* Video Description */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Video Description</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="Describe what you want to create..."
              placeholderTextColor="#9BA1A6"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <Text className="text-xs text-muted">
              Use this to guide AI tools like text-to-video and narration
            </Text>
          </View>

          {/* Upload Buttons */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Upload Media</Text>
            <View className="gap-2">
              <TouchableOpacity
                className="bg-primary/20 border border-primary px-4 py-3 rounded-xl active:opacity-70"
                onPress={pickImage}
              >
                <Text className="text-primary font-semibold text-center">+ Add Images</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary/20 border border-primary px-4 py-3 rounded-xl active:opacity-70"
                onPress={pickVideo}
              >
                <Text className="text-primary font-semibold text-center">+ Add Videos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary/20 border border-primary px-4 py-3 rounded-xl active:opacity-70"
                onPress={pickAudio}
              >
                <Text className="text-primary font-semibold text-center">+ Add Audio</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                Uploaded Files ({uploadedFiles.length})
              </Text>
              <FlatList
                data={uploadedFiles}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View className="bg-surface rounded-xl p-3 mb-2 border border-border flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{item.name}</Text>
                      <Text className="text-xs text-muted mt-1 uppercase">{item.type}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFile(item.id)}
                      className="px-3 py-1"
                    >
                      <Text className="text-error font-semibold">Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl active:opacity-80 mt-4"
            onPress={() => router.push(`../ai-tools?projectId=${projectId}`)}
          >
            <Text className="text-background font-semibold text-center text-lg">
              Continue to AI Tools
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

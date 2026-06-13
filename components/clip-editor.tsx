import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useState } from "react";

interface ClipEditorProps {
  clipId: string;
  clipName: string;
  clipType: "image" | "video" | "text" | "ai-generated";
  startTime: number;
  duration: number;
  onUpdate: (updates: {
    startTime?: number;
    duration?: number;
    name?: string;
  }) => void;
  onDelete: () => void;
}

export function ClipEditor({
  clipId,
  clipName,
  clipType,
  startTime,
  duration,
  onUpdate,
  onDelete,
}: ClipEditorProps) {
  const [name, setName] = useState(clipName);
  const [start, setStart] = useState(startTime.toString());
  const [dur, setDur] = useState(duration.toString());

  const handleSave = () => {
    onUpdate({
      name: name !== clipName ? name : undefined,
      startTime: parseFloat(start) !== startTime ? parseFloat(start) : undefined,
      duration: parseFloat(dur) !== duration ? parseFloat(dur) : undefined,
    });
  };

  return (
    <ScrollView className="flex-1">
      <View className="gap-4 p-4">
        {/* Clip Info */}
        <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
          <Text className="text-lg font-bold text-foreground">Clip Details</Text>
          <View className="gap-2">
            <Text className="text-xs text-muted uppercase">Type</Text>
            <View className="bg-primary/10 rounded-lg px-3 py-2">
              <Text className="text-sm font-semibold text-primary capitalize">{clipType}</Text>
            </View>
          </View>
        </View>

        {/* Clip Name */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-foreground">Clip Name</Text>
          <TextInput
            className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            value={name}
            onChangeText={setName}
            placeholder="Enter clip name"
            placeholderTextColor="#9BA1A6"
          />
        </View>

        {/* Timing */}
        <View className="gap-3">
          <Text className="text-sm font-semibold text-foreground">Timing</Text>
          <View className="gap-2">
            <View>
              <Text className="text-xs text-muted mb-1">Start Time (seconds)</Text>
              <TextInput
                className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                value={start}
                onChangeText={setStart}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor="#9BA1A6"
              />
            </View>
            <View>
              <Text className="text-xs text-muted mb-1">Duration (seconds)</Text>
              <TextInput
                className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                value={dur}
                onChangeText={setDur}
                keyboardType="decimal-pad"
                placeholder="5"
                placeholderTextColor="#9BA1A6"
              />
            </View>
          </View>
        </View>

        {/* Effects */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-foreground">Effects</Text>
          <View className="gap-2">
            <TouchableOpacity className="bg-surface border border-border rounded-xl px-4 py-3 active:opacity-70">
              <Text className="text-foreground font-semibold">+ Add Transition</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface border border-border rounded-xl px-4 py-3 active:opacity-70">
              <Text className="text-foreground font-semibold">+ Add Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface border border-border rounded-xl px-4 py-3 active:opacity-70">
              <Text className="text-foreground font-semibold">+ Add Text Overlay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Actions */}
        <View className="gap-2 mt-4">
          <TouchableOpacity
            className="bg-primary px-6 py-4 rounded-2xl active:opacity-80"
            onPress={handleSave}
          >
            <Text className="text-background font-semibold text-center">Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-error/20 border border-error px-6 py-4 rounded-2xl active:opacity-70"
            onPress={onDelete}
          >
            <Text className="text-error font-semibold text-center">Delete Clip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

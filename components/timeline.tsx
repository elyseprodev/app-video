import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useCallback } from "react";

interface TimelineClip {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  type: "image" | "video" | "text" | "ai-generated";
}

interface TimelineProps {
  clips: TimelineClip[];
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
  onSelectClip: (clipId: string) => void;
  selectedClipId?: string;
}

export function Timeline({
  clips,
  duration,
  currentTime,
  onSeek,
  onSelectClip,
  selectedClipId,
}: TimelineProps) {
  const screenWidth = Dimensions.get("window").width;
  const timelineWidth = screenWidth - 48; // Account for padding
  const pixelsPerSecond = timelineWidth / Math.max(duration, 1);

  const handleTimelinePress = useCallback(
    (event: any) => {
      const x = event.nativeEvent.locationX;
      const time = x / pixelsPerSecond;
      onSeek(Math.max(0, Math.min(time, duration)));
    },
    [pixelsPerSecond, duration, onSeek]
  );

  const currentTimePixels = currentTime * pixelsPerSecond;

  const getClipColor = (type: string) => {
    switch (type) {
      case "video":
        return "#4F46E5"; // Indigo
      case "image":
        return "#EC4899"; // Pink
      case "text":
        return "#F59E0B"; // Amber
      case "ai-generated":
        return "#10B981"; // Emerald
      default:
        return "#6B7280"; // Gray
    }
  };

  return (
    <View className="gap-4">
      {/* Timeline Ruler */}
      <View className="bg-surface rounded-lg border border-border p-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-1">
            {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
              <View key={i} className="items-center gap-1">
                <View className="w-0.5 h-2 bg-border" />
                <Text className="text-xs text-muted w-8 text-center">{i}s</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Timeline Tracks */}
      <View
        className="bg-surface rounded-lg border border-border p-2 overflow-hidden"
        onTouchEnd={handleTimelinePress}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            className="relative bg-background/50"
            style={{ width: timelineWidth, minHeight: 120 }}
          >
            {/* Clips */}
            {clips.map((clip) => {
              const clipX = clip.startTime * pixelsPerSecond;
              const clipWidth = Math.max(clip.duration * pixelsPerSecond, 20);

              return (
                <TouchableOpacity
                  key={clip.id}
                  className={`absolute rounded border-2 items-center justify-center ${
                    selectedClipId === clip.id ? "border-primary" : "border-border"
                  }`}
                  style={{
                    left: clipX,
                    width: clipWidth,
                    height: 80,
                    backgroundColor: getClipColor(clip.type),
                    opacity: selectedClipId === clip.id ? 1 : 0.7,
                  }}
                  onPress={() => onSelectClip(clip.id)}
                >
                  <Text className="text-xs text-white font-semibold text-center px-1">
                    {clip.name}
                  </Text>
                  <Text className="text-xs text-white/70 capitalize">{clip.type}</Text>
                </TouchableOpacity>
              );
            })}

            {/* Playhead */}
            <View
              className="absolute w-1 bg-primary"
              style={{
                left: currentTimePixels,
                height: "100%",
              }}
            />
          </View>
        </ScrollView>
      </View>

      {/* Time Display */}
      <View className="flex-row justify-between items-center px-2">
        <Text className="text-sm text-muted">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </Text>
        <Text className="text-sm text-muted">
          {clips.length} clip{clips.length !== 1 ? "s" : ""}
        </Text>
      </View>
    </View>
  );
}

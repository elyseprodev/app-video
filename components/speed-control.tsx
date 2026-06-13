import { View, Text, TouchableOpacity } from "react-native";

interface SpeedControlProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function SpeedControl({ currentSpeed, onSpeedChange }: SpeedControlProps) {
  return (
    <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
      <Text className="text-base font-semibold text-foreground">Playback Speed</Text>
      <View className="flex-row flex-wrap gap-2">
        {SPEED_OPTIONS.map((speed) => (
          <TouchableOpacity
            key={speed}
            className={`px-4 py-2 rounded-lg border ${
              Math.abs(currentSpeed - speed) < 0.01
                ? "bg-primary border-primary"
                : "bg-background border-border"
            }`}
            onPress={() => onSpeedChange(speed)}
          >
            <Text
              className={`text-sm font-semibold ${
                Math.abs(currentSpeed - speed) < 0.01 ? "text-background" : "text-foreground"
              }`}
            >
              {speed}x
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

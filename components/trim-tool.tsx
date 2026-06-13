import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

interface TrimToolProps {
  clipDuration: number;
  onTrim: (startTime: number, endTime: number) => void;
  onCancel: () => void;
}

export function TrimTool({ clipDuration, onTrim, onCancel }: TrimToolProps) {
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState(clipDuration.toString());

  const handleTrim = () => {
    const start = parseFloat(startTime) || 0;
    const end = parseFloat(endTime) || clipDuration;
    
    if (start < end && start >= 0 && end <= clipDuration) {
      onTrim(start, end);
    }
  };

  return (
    <View className="bg-surface rounded-2xl p-4 border border-border gap-4">
      <View>
        <Text className="text-base font-bold text-foreground mb-3">Trim Clip</Text>
        <Text className="text-sm text-muted mb-4">
          Clip duration: {clipDuration.toFixed(2)}s
        </Text>
      </View>

      <View className="gap-3">
        <View>
          <Text className="text-xs text-muted mb-1">Start Time (seconds)</Text>
          <TextInput
            className="bg-background border border-border rounded-lg px-3 py-2 text-foreground"
            value={startTime}
            onChangeText={setStartTime}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor="#9BA1A6"
          />
        </View>

        <View>
          <Text className="text-xs text-muted mb-1">End Time (seconds)</Text>
          <TextInput
            className="bg-background border border-border rounded-lg px-3 py-2 text-foreground"
            value={endTime}
            onChangeText={setEndTime}
            keyboardType="decimal-pad"
            placeholder={clipDuration.toString()}
            placeholderTextColor="#9BA1A6"
          />
        </View>
      </View>

      <View className="gap-2 flex-row">
        <TouchableOpacity
          className="flex-1 bg-primary px-4 py-2 rounded-lg active:opacity-80"
          onPress={handleTrim}
        >
          <Text className="text-background font-semibold text-center">Apply Trim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-border px-4 py-2 rounded-lg active:opacity-70"
          onPress={onCancel}
        >
          <Text className="text-foreground font-semibold text-center">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

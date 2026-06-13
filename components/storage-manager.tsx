import { View, Text, TouchableOpacity } from "react-native";

interface StorageStats {
  used: number;
  total: number;
  videos: number;
  projects: number;
}

interface StorageManagerProps {
  stats: StorageStats;
  onClearCache: () => void;
  onManageStorage: () => void;
}

export function StorageManager({ stats, onClearCache, onManageStorage }: StorageManagerProps) {
  const usagePercent = (stats.used / stats.total) * 100;
  const remainingGB = ((stats.total - stats.used) / 1024 / 1024 / 1024).toFixed(1);

  return (
    <View className="bg-surface rounded-2xl border border-border p-4 gap-4">
      <View>
        <Text className="text-base font-semibold text-foreground mb-3">Storage</Text>
        <View className="gap-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-muted">
              {(stats.used / 1024 / 1024 / 1024).toFixed(1)} GB / {(stats.total / 1024 / 1024 / 1024).toFixed(1)} GB
            </Text>
            <Text className="text-sm font-semibold text-foreground">{Math.round(usagePercent)}%</Text>
          </View>
          <View className="w-full h-3 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${usagePercent}%` }}
            />
          </View>
          <Text className="text-xs text-muted">{remainingGB} GB available</Text>
        </View>
      </View>

      <View className="gap-2 pt-2 border-t border-border">
        <View className="flex-row justify-between">
          <Text className="text-sm text-muted">Videos</Text>
          <Text className="text-sm font-semibold text-foreground">{stats.videos}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm text-muted">Projects</Text>
          <Text className="text-sm font-semibold text-foreground">{stats.projects}</Text>
        </View>
      </View>

      <View className="gap-2 flex-row">
        <TouchableOpacity
          className="flex-1 bg-primary/20 border border-primary px-4 py-2 rounded-lg active:opacity-70"
          onPress={onClearCache}
        >
          <Text className="text-primary font-semibold text-center text-sm">Clear Cache</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-primary px-4 py-2 rounded-lg active:opacity-80"
          onPress={onManageStorage}
        >
          <Text className="text-background font-semibold text-center text-sm">Manage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

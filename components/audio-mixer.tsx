import { View, Text, TouchableOpacity } from "react-native";

interface AudioTrack {
  id: string;
  name: string;
  type: "music" | "voiceover" | "soundeffect";
  volume: number;
  isMuted: boolean;
}

interface AudioMixerProps {
  tracks: AudioTrack[];
  onVolumeChange: (trackId: string, volume: number) => void;
  onMuteToggle: (trackId: string) => void;
  onRemoveTrack: (trackId: string) => void;
}

export function AudioMixer({
  tracks,
  onVolumeChange,
  onMuteToggle,
  onRemoveTrack,
}: AudioMixerProps) {
  return (
    <View className="bg-surface rounded-2xl border border-border p-4 gap-4">
      <Text className="text-base font-semibold text-foreground">Audio Mixer</Text>

      {tracks.length === 0 ? (
        <Text className="text-sm text-muted text-center py-4">No audio tracks added</Text>
      ) : (
        <View className="gap-3">
          {tracks.map((track) => (
            <View key={track.id} className="bg-background rounded-lg p-3 gap-2">
              {/* Track Header */}
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">{track.name}</Text>
                  <Text className="text-xs text-muted capitalize mt-1">{track.type}</Text>
                </View>
                <TouchableOpacity
                  className="px-3 py-1"
                  onPress={() => onRemoveTrack(track.id)}
                >
                  <Text className="text-error text-xs font-semibold">Remove</Text>
                </TouchableOpacity>
              </View>

              {/* Volume Control */}
              <View className="gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-muted">Volume</Text>
                  <Text className="text-xs font-semibold text-foreground">
                    {Math.round(track.volume * 100)}%
                  </Text>
                </View>
                <View className="flex-row gap-1">
                  {[0, 0.25, 0.5, 0.75, 1].map((vol) => (
                    <TouchableOpacity
                      key={vol}
                      className={`flex-1 py-1 rounded border ${
                        Math.abs(track.volume - vol) < 0.05
                          ? "bg-primary border-primary"
                          : "bg-border border-border"
                      }`}
                      onPress={() => onVolumeChange(track.id, vol)}
                    >
                      <Text className="text-xs text-center font-semibold text-foreground">
                        {Math.round(vol * 100)}%
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Mute Button */}
              <TouchableOpacity
                className={`py-2 rounded border ${
                  track.isMuted
                    ? "bg-error/20 border-error"
                    : "bg-background border-border"
                }`}
                onPress={() => onMuteToggle(track.id)}
              >
                <Text
                  className={`text-center text-xs font-semibold ${
                    track.isMuted ? "text-error" : "text-foreground"
                  }`}
                >
                  {track.isMuted ? "🔇 Muted" : "🔊 Unmuted"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Add Audio Button */}
      <TouchableOpacity className="bg-primary/20 border border-primary rounded-lg py-3 active:opacity-70">
        <Text className="text-primary font-semibold text-center">+ Add Audio Track</Text>
      </TouchableOpacity>
    </View>
  );
}

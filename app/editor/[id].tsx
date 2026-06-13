import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";
import { ScreenContainer } from "@/components/screen-container";
import { Timeline } from "@/components/timeline";
import { ClipEditor } from "@/components/clip-editor";
import { SpeedControl } from "@/components/speed-control";
import { EffectsPanel } from "@/components/effects-panel";
import { AudioMixer } from "@/components/audio-mixer";

interface TimelineClip {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  type: "image" | "video" | "text" | "ai-generated";
}

export default function EditorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [clips, setClips] = useState<TimelineClip[]>([
    {
      id: "1",
      name: "Intro Video",
      startTime: 0,
      duration: 3,
      type: "video",
    },
    {
      id: "2",
      name: "Main Content",
      startTime: 3,
      duration: 5,
      type: "video",
    },
    {
      id: "3",
      name: "Outro Text",
      startTime: 8,
      duration: 2,
      type: "text",
    },
  ]);

  const [currentTime, setCurrentTime] = useState(0);
  const [selectedClipId, setSelectedClipId] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activePanel, setActivePanel] = useState<"clips" | "effects" | "audio" | "export">(
    "clips"
  );

  const projectId = id ? parseInt(id, 10) : 0;
  const projectQuery = trpc.projects.get.useQuery(
    { projectId },
    { enabled: !!id && isAuthenticated }
  );

  const totalDuration = clips.reduce((sum, clip) => Math.max(sum, clip.startTime + clip.duration), 0);
  const selectedClip = clips.find((c) => c.id === selectedClipId);

  if (authLoading || projectQuery.isLoading) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-foreground">Please sign in to edit videos</Text>
      </ScreenContainer>
    );
  }

  if (!projectQuery.data) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-foreground">Project not found</Text>
        <TouchableOpacity
          className="bg-primary px-6 py-3 rounded-full mt-4 active:opacity-80"
          onPress={() => router.back()}
        >
          <Text className="text-background font-semibold">Go Back</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const project = projectQuery.data;

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1 bg-background">
        {/* Header */}
        <View className="bg-surface border-b border-border px-6 py-4 gap-2">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-base text-primary font-semibold">← Back</Text>
            </TouchableOpacity>
            <Text className="text-lg font-bold text-foreground">{project.name}</Text>
            <TouchableOpacity
              className="bg-primary px-4 py-2 rounded-full active:opacity-80"
              onPress={() => setActivePanel("export")}
            >
              <Text className="text-background font-semibold text-sm">Export</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1">
          <View className="p-6 gap-6">
            {/* Preview Area */}
            <View className="bg-black rounded-2xl aspect-video items-center justify-center border border-border">
              <Text className="text-white text-center text-sm">
                Video Preview
                {"\n"}
                {Math.floor(currentTime)}s / {Math.floor(totalDuration)}s
              </Text>
            </View>

            {/* Playback Controls */}
            <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className="flex-1 bg-primary px-4 py-3 rounded-lg active:opacity-80"
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  <Text className="text-background font-semibold text-center">
                    {isPlaying ? "⏸ Pause" : "▶ Play"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-surface border border-border px-4 py-3 rounded-lg active:opacity-70"
                  onPress={() => setCurrentTime(0)}
                >
                  <Text className="text-foreground font-semibold text-center">⏮ Reset</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Timeline */}
            <Timeline
              clips={clips}
              duration={totalDuration}
              currentTime={currentTime}
              onSeek={setCurrentTime}
              onSelectClip={setSelectedClipId}
              selectedClipId={selectedClipId}
            />

            {/* Panel Navigation */}
            <View className="flex-row gap-2 bg-surface rounded-2xl p-2 border border-border">
              {["clips", "effects", "audio", "export"].map((panel) => (
                <TouchableOpacity
                  key={panel}
                  className={`flex-1 py-2 rounded-lg ${
                    activePanel === panel ? "bg-primary" : "bg-background"
                  }`}
                  onPress={() => setActivePanel(panel as any)}
                >
                  <Text
                    className={`text-center text-xs font-semibold capitalize ${
                      activePanel === panel ? "text-background" : "text-foreground"
                    }`}
                  >
                    {panel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Clips Panel */}
            {activePanel === "clips" && selectedClip && (
              <ClipEditor
                clipId={selectedClip.id}
                clipName={selectedClip.name}
                clipType={selectedClip.type}
                startTime={selectedClip.startTime}
                duration={selectedClip.duration}
                onUpdate={(updates) => {
                  setClips(
                    clips.map((c) =>
                      c.id === selectedClip.id ? { ...c, ...updates } : c
                    )
                  );
                }}
                onDelete={() => {
                  setClips(clips.filter((c) => c.id !== selectedClip.id));
                  setSelectedClipId(undefined);
                }}
              />
            )}

            {activePanel === "clips" && !selectedClip && (
              <View className="bg-surface rounded-2xl p-6 border border-border items-center gap-2">
                <Text className="text-base font-semibold text-foreground">Select a Clip</Text>
                <Text className="text-sm text-muted text-center">
                  Click on a clip in the timeline to edit it
                </Text>
              </View>
            )}

            {/* Effects Panel */}
            {activePanel === "effects" && (
              <View className="gap-4">
                <SpeedControl currentSpeed={playbackSpeed} onSpeedChange={setPlaybackSpeed} />
                <EffectsPanel
                  onApplyEffect={(type, name) => {
                    console.log(`Applied ${type}: ${name}`);
                  }}
                />
              </View>
            )}

            {/* Audio Panel */}
            {activePanel === "audio" && (
              <AudioMixer
                tracks={[
                  {
                    id: "music-1",
                    name: "Background Music",
                    type: "music",
                    volume: 0.7,
                    isMuted: false,
                  },
                  {
                    id: "voice-1",
                    name: "Voice Over",
                    type: "voiceover",
                    volume: 0.9,
                    isMuted: false,
                  },
                ]}
                onVolumeChange={(trackId, volume) => {
                  console.log(`Track ${trackId} volume: ${volume}`);
                }}
                onMuteToggle={(trackId) => {
                  console.log(`Toggled mute for ${trackId}`);
                }}
                onRemoveTrack={(trackId) => {
                  console.log(`Removed track ${trackId}`);
                }}
              />
            )}

            {/* Export Panel */}
            {activePanel === "export" && (
              <View className="bg-surface rounded-2xl p-4 border border-border gap-4">
                <Text className="text-base font-semibold text-foreground">Export Video</Text>
                <View className="gap-2">
                  <TouchableOpacity className="bg-primary px-6 py-4 rounded-2xl active:opacity-80">
                    <Text className="text-background font-semibold text-center">
                      📤 Export as MP4
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-primary/20 border border-primary px-6 py-4 rounded-2xl active:opacity-70">
                    <Text className="text-primary font-semibold text-center">
                      📤 Export as MOV
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-primary/20 border border-primary px-6 py-4 rounded-2xl active:opacity-70">
                    <Text className="text-primary font-semibold text-center">
                      💾 Save Project
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

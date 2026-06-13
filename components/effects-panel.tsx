import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

interface EffectsPanelProps {
  onApplyEffect: (effectType: string, effectName: string) => void;
}

const FILTERS = [
  { name: "None", value: "none" },
  { name: "Warm", value: "warm" },
  { name: "Cool", value: "cool" },
  { name: "Vintage", value: "vintage" },
  { name: "B&W", value: "bw" },
  { name: "Vibrant", value: "vibrant" },
  { name: "Sepia", value: "sepia" },
  { name: "Grayscale", value: "grayscale" },
];

const TRANSITIONS = [
  { name: "Fade", value: "fade" },
  { name: "Slide Left", value: "slide-left" },
  { name: "Slide Right", value: "slide-right" },
  { name: "Zoom In", value: "zoom-in" },
  { name: "Zoom Out", value: "zoom-out" },
  { name: "Blur", value: "blur" },
  { name: "Dissolve", value: "dissolve" },
  { name: "Wipe", value: "wipe" },
];

const ADJUSTMENTS = [
  { name: "Brightness", value: "brightness" },
  { name: "Contrast", value: "contrast" },
  { name: "Saturation", value: "saturation" },
  { name: "Hue", value: "hue" },
];

export function EffectsPanel({ onApplyEffect }: EffectsPanelProps) {
  const [activeTab, setActiveTab] = useState<"filters" | "transitions" | "adjustments">(
    "filters"
  );

  return (
    <View className="bg-surface rounded-2xl border border-border overflow-hidden">
      {/* Tab Navigation */}
      <View className="flex-row border-b border-border">
        {["filters", "transitions", "adjustments"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-3 px-2 border-b-2 ${
              activeTab === tab ? "border-primary" : "border-transparent"
            }`}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              className={`text-center text-sm font-semibold capitalize ${
                activeTab === tab ? "text-primary" : "text-muted"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView className="p-3" scrollEnabled={false}>
        <View className="gap-2">
          {activeTab === "filters" &&
            FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                className="bg-background rounded-lg px-4 py-3 border border-border active:opacity-70"
                onPress={() => onApplyEffect("filter", filter.value)}
              >
                <Text className="text-foreground font-semibold text-center">{filter.name}</Text>
              </TouchableOpacity>
            ))}

          {activeTab === "transitions" &&
            TRANSITIONS.map((transition) => (
              <TouchableOpacity
                key={transition.value}
                className="bg-background rounded-lg px-4 py-3 border border-border active:opacity-70"
                onPress={() => onApplyEffect("transition", transition.value)}
              >
                <Text className="text-foreground font-semibold text-center">
                  {transition.name}
                </Text>
              </TouchableOpacity>
            ))}

          {activeTab === "adjustments" &&
            ADJUSTMENTS.map((adjustment) => (
              <TouchableOpacity
                key={adjustment.value}
                className="bg-background rounded-lg px-4 py-3 border border-border active:opacity-70"
                onPress={() => onApplyEffect("adjustment", adjustment.value)}
              >
                <Text className="text-foreground font-semibold text-center">
                  {adjustment.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

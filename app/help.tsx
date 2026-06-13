import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useState } from "react";

const FAQS = [
  {
    q: "How do I create a new video?",
    a: "Tap the 'Create New' button on the Home screen or navigate to the Create tab. Set your project name, resolution, and format, then follow the step-by-step wizard to add content, apply effects, and export.",
  },
  {
    q: "What formats are supported?",
    a: "THE BEST VIDEO supports MP4 and MOV export formats. You can upload images (JPG, PNG, WebP), videos (MP4, MOV, WebM), and audio files (MP3, WAV, M4A).",
  },
  {
    q: "How do I use AI tools?",
    a: "During the create flow, you'll reach the AI Tools screen where you can enable Text-to-Video, Auto-Captions, Narration, and Background Removal. All AI features are optional and opt-in.",
  },
  {
    q: "Can I edit videos on mobile?",
    a: "Yes! THE BEST VIDEO is built with mobile-first design. You can trim clips, adjust speed, add effects, mix audio, and add text overlays directly from your device.",
  },
  {
    q: "Where are my exported videos saved?",
    a: "Exported videos appear in the Downloads tab. From there you can share them to social media, generate a share link, or save them to your device.",
  },
  {
    q: "How do I delete a project?",
    a: "Navigate to the Projects tab, find the project you want to delete, and tap the 'Delete' button at the bottom of the project card.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All your data is encrypted in transit and at rest. We use secure OAuth authentication and never share your content without your permission.",
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-base text-primary font-semibold">← Back</Text>
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-foreground mt-2">Help & FAQ</Text>
            <Text className="text-base text-muted">Frequently asked questions</Text>
          </View>

          <View className="gap-3">
            {FAQS.map((faq, index) => (
              <View
                key={index}
                className="bg-surface rounded-2xl border border-border overflow-hidden"
              >
                <TouchableOpacity
                  className="p-4 active:opacity-70"
                  onPress={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-foreground flex-1 pr-4">
                      {faq.q}
                    </Text>
                    <Text className="text-lg text-muted">
                      {openIndex === index ? "−" : "+"}
                    </Text>
                  </View>
                </TouchableOpacity>
                {openIndex === index && (
                  <View className="px-4 pb-4 pt-0">
                    <Text className="text-sm text-muted leading-5">{faq.a}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View className="bg-primary/10 border border-primary rounded-2xl p-4 gap-2">
            <Text className="text-sm font-semibold text-primary">💡 Need more help?</Text>
            <Text className="text-sm text-foreground">
              Contact our support team at elyseelissa7@gmail.com for personalized assistance.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

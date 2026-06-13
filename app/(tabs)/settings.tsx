import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Switch, Linking } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { ScreenContainer } from "@/components/screen-container";

export default function SettingsScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  const handleLogout = async () => {
    await logout();
    router.replace("/");
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
        <Text className="text-lg text-foreground">Please sign in to access settings</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Settings</Text>
            <Text className="text-base text-muted">Manage your preferences</Text>
          </View>

          {/* Account Section */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Account</Text>
            <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
              <View>
                <Text className="text-xs text-muted uppercase">Name</Text>
                <Text className="text-base font-semibold text-foreground mt-1">{user?.name || "User"}</Text>
              </View>
              <View className="pt-2 border-t border-border">
                <Text className="text-xs text-muted uppercase">Email</Text>
                <Text className="text-base font-semibold text-foreground mt-1">{user?.email || "Not set"}</Text>
              </View>

            </View>
          </View>

          {/* Preferences Section */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Preferences</Text>
            <View className="bg-surface rounded-2xl p-4 border border-border gap-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-foreground">Dark Mode</Text>
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                />
              </View>
            </View>
          </View>

          {/* Help Section */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Help</Text>
            <TouchableOpacity
              className="bg-surface rounded-2xl p-4 border border-border active:opacity-70"
              onPress={() => router.push("../help")}
            >
              <Text className="text-base text-foreground font-semibold">FAQ</Text>
              <Text className="text-sm text-muted mt-1">Frequently asked questions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-2xl p-4 border border-border active:opacity-70"
              onPress={() => Linking.openURL("mailto:elyseelissa7@gmail.com")}
            >
              <Text className="text-base text-foreground font-semibold">Contact Support</Text>
              <Text className="text-sm text-muted mt-1">Get help from our support team</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-error px-6 py-4 rounded-2xl active:opacity-80 mt-4"
            onPress={handleLogout}
          >
            <Text className="text-background font-semibold text-center text-lg">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

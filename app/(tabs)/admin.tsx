import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

import { ScreenContainer } from "@/components/screen-container";

export default function AdminScreen() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "exports">("overview");

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
        <Text className="text-lg text-foreground">Please sign in to access admin panel</Text>
      </ScreenContainer>
    );
  }

  // Check if user is admin (would need to add admin role to user object)
  const isAdmin = user?.email === "elysedev14@gmail.com";

  if (!isAdmin) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-foreground">Admin access required</Text>
        <Text className="text-sm text-muted mt-2">You don&apos;t have permission to access this panel</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Admin Dashboard</Text>
            <Text className="text-base text-muted">Manage THE BEST VIDEO platform</Text>
          </View>

          {/* Tab Navigation */}
          <View className="flex-row gap-2 bg-surface rounded-2xl p-2 border border-border">
            {["overview", "users", "exports"].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`flex-1 py-2 rounded-lg ${
                  activeTab === tab ? "bg-primary" : "bg-background"
                }`}
                onPress={() => setActiveTab(tab as any)}
              >
                <Text
                  className={`text-center text-xs font-semibold capitalize ${
                    activeTab === tab ? "text-background" : "text-foreground"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <View className="gap-4">
              {/* Stats Cards */}
              <View className="gap-3">
                <View className="bg-surface rounded-2xl p-4 border border-border">
                  <Text className="text-sm text-muted mb-1">Total Users</Text>
                  <Text className="text-3xl font-bold text-foreground">--</Text>
                  <Text className="text-xs text-muted mt-2">Loading...</Text>
                </View>
                <View className="bg-surface rounded-2xl p-4 border border-border">
                  <Text className="text-sm text-muted mb-1">Total Projects</Text>
                  <Text className="text-3xl font-bold text-foreground">--</Text>
                  <Text className="text-xs text-muted mt-2">Loading...</Text>
                </View>
                <View className="bg-surface rounded-2xl p-4 border border-border">
                  <Text className="text-sm text-muted mb-1">Exports This Month</Text>
                  <Text className="text-3xl font-bold text-foreground">--</Text>
                  <Text className="text-xs text-muted mt-2">Loading...</Text>
                </View>
              </View>

              {/* System Status */}
              <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
                <Text className="text-base font-semibold text-foreground">System Status</Text>
                <View className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted">Database</Text>
                    <View className="w-3 h-3 rounded-full bg-success" />
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted">API Server</Text>
                    <View className="w-3 h-3 rounded-full bg-success" />
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted">File Storage</Text>
                    <View className="w-3 h-3 rounded-full bg-success" />
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <View className="gap-4">
              <Text className="text-base font-semibold text-foreground">User Management</Text>
              <View className="bg-surface rounded-2xl p-4 border border-border items-center gap-2 min-h-32">
                <Text className="text-sm text-muted text-center">User management interface</Text>
                <Text className="text-xs text-muted text-center">
                  View, manage, and monitor user accounts
                </Text>
              </View>
            </View>
          )}

          {/* Exports Tab */}
          {activeTab === "exports" && (
            <View className="gap-4">
              <Text className="text-base font-semibold text-foreground">Export History</Text>
              <View className="bg-surface rounded-2xl p-6 border border-border items-center gap-2">
                <Text className="text-sm text-muted">Export history coming soon</Text>
                <Text className="text-xs text-muted text-center">
                  View all exports across the platform
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

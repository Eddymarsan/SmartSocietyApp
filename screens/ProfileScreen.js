import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, StatusBar, Linking } from "react-native";
import api from "../services/api";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({ name: "", phone: "", flat: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    complaints: true,
    payments: true,
    notices: true,
    visitors: false,
  });

  // Assuming user_id is 1 for now (from login)
  const userId = 1;

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // For now, we'll simulate getting user data
      // In a real app, you'd have a getUser.php API
      const mockUser = {
        id: 1,
        name: "Test User",
        phone: "1234567890",
        flat: "A101"
      };
      setUser(mockUser);
    } catch (error) {
      Alert.alert("Error", "Failed to load profile");
    }
  };

  const updateProfile = async () => {
    if (!user.name.trim() || !user.phone.trim() || !user.flat.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // In a real app, you'd call an updateUser.php API
      // For now, we'll just simulate success
      Alert.alert("Success", "Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    navigation.navigate('Login');
  };

  const changePassword = () => {
    Alert.alert(
      "Change Password",
      "Password change feature is not yet implemented. Please contact support to change your password.",
      [
        { text: "Contact Support", onPress: contactSupport },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const openNotificationSettings = () => {
    Alert.alert(
      "Notification Settings",
      "Choose which notifications you want to receive:",
      [
        {
          text: `Complaints: ${notifications.complaints ? 'ON' : 'OFF'}`,
          onPress: () => setNotifications({...notifications, complaints: !notifications.complaints})
        },
        {
          text: `Payments: ${notifications.payments ? 'ON' : 'OFF'}`,
          onPress: () => setNotifications({...notifications, payments: !notifications.payments})
        },
        {
          text: `Notices: ${notifications.notices ? 'ON' : 'OFF'}`,
          onPress: () => setNotifications({...notifications, notices: !notifications.notices})
        },
        {
          text: `Visitors: ${notifications.visitors ? 'ON' : 'OFF'}`,
          onPress: () => setNotifications({...notifications, visitors: !notifications.visitors})
        },
        { text: "Done", style: "cancel" }
      ]
    );
  };

  const contactSupport = () => {
    const phoneNumber = '0792905715';
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Unable to make phone call. Please call 0792905715 manually.");
        }
      })
      .catch((err) => Alert.alert("Error", "Unable to make phone call"));
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Account Deletion", "Account deletion feature will be available soon. Please contact support for assistance.");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#607D8B" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account</Text>
      </View>

      {/* Quick Actions - Moved to top for visibility */}
      <View style={styles.accountCard}>
        <Text style={styles.accountTitle}>Quick Actions</Text>

        <TouchableOpacity style={styles.accountButton} onPress={changePassword} activeOpacity={0.8}>
          <Text style={styles.accountButtonText}>🔒 Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountButton} onPress={openNotificationSettings} activeOpacity={0.8}>
          <Text style={styles.accountButtonText}>🔔 Notification Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountButton} onPress={contactSupport} activeOpacity={0.8}>
          <Text style={styles.accountButtonText}>📞 Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountButton} onPress={deleteAccount} activeOpacity={0.8}>
          <Text style={styles.accountButtonText}>🗑️ Delete Account</Text>
        </TouchableOpacity>

        {/* Logout Button - Moved here for better visibility */}
        <TouchableOpacity
          style={[styles.logoutButton, { marginTop: 15 }]}
          onPress={logout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Form */}
      <View style={styles.profileCard}>
        <View style={styles.field}>
          <Text style={styles.label}>👤 Full Name</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(text) => setUser({...user, name: text})}
              placeholder="Enter your full name"
            />
          ) : (
            <Text style={styles.value}>{user.name}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>📞 Phone Number</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={user.phone}
              onChangeText={(text) => setUser({...user, phone: text})}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{user.phone}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>🏠 Flat Number</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={user.flat}
              onChangeText={(text) => setUser({...user, flat: text})}
              placeholder="Enter your flat number"
            />
          ) : (
            <Text style={styles.value}>{user.flat}</Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {editing ? (
          <>
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.buttonDisabled]}
              onPress={updateProfile}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>
                {loading ? "💾 Saving..." : "💾 Save Changes"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setEditing(false);
                fetchUserProfile(); // Reset changes
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditing(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* App Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>About Smart Society</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Version:</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Last Updated:</Text>
          <Text style={styles.infoValue}>February 2026</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Support:</Text>
          <Text style={styles.infoValue}>0792905715</Text>
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>← Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#607D8B',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#607D8B',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#607D8B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
    shadowOpacity: 0,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  accountButton: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  accountButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FECACA',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#666',
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});
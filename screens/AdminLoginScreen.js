import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ScrollView } from "react-native";
import api from "../services/api";

export default function AdminLoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const adminLogin = async () => {
    if (!phone.trim()) {
      Alert.alert("Error", "Please enter your admin phone number");
      return;
    }

    if (phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("login.php", {
        phone: phone.trim()
      });

      console.log(res.data);

      if (res.data.status === "success") {
        if (res.data.user.role === "admin") {
          Alert.alert("Success", "Admin login successful! Welcome 👑");
          navigation.replace("AdminPanel", { adminUser: res.data.user });
        } else {
          Alert.alert("Access Denied", "You don't have admin privileges");
        }
      } else {
        Alert.alert("Login Failed", "Admin user not found. Please check your phone number.");
      }

    } catch (error) {
      Alert.alert("Connection Error", "Unable to connect to server. Please check your internet connection.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>👑</Text>
        </View>
        <Text style={styles.title}>Admin Portal</Text>
        <Text style={styles.subtitle}>Society Management System</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Admin Access</Text>
        <Text style={styles.instructionText}>Enter your admin phone number</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>📞 Admin Phone Number</Text>
          <TextInput
            placeholder="Enter admin phone number"
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={setPhone}
            value={phone}
            maxLength={15}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.buttonDisabled]}
          onPress={adminLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "🔄 Authenticating..." : "🔐 Admin Login"}
          </Text>
        </TouchableOpacity>

        {/* Demo Admin Credentials */}
        <View style={styles.demoContainer}>
          <Text style={styles.demoTitle}>Demo Admin Credentials:</Text>
          <Text style={styles.demoText}>Phone: 1234567890</Text>
          <Text style={styles.demoText}>Phone: 1111111111</Text>
        </View>

        {/* Back to User Login */}
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.replace("Login")}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>
            ← Back to Resident Login
          </Text>
        </TouchableOpacity>
      </View>

      {/* Admin Features Preview */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Admin Capabilities:</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👥</Text>
            <Text style={styles.featureText}>Manage Residents</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📝</Text>
            <Text style={styles.featureText}>Handle Complaints</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureText}>Monitor Payments</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📢</Text>
            <Text style={styles.featureText}>Post Notices</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    marginBottom: 15,
  },
  logoIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#9C27B0',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
    shadowOpacity: 0,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoContainer: {
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 14,
    color: '#7B1FA2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  demoText: {
    fontSize: 14,
    color: '#7B1FA2',
    fontWeight: '600',
  },
  backContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    color: '#9C27B0',
    fontWeight: 'bold',
  },
  featuresContainer: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});
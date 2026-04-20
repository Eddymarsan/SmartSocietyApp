import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ScrollView } from "react-native";
import api from "../services/api";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!phone.trim()) {
      Alert.alert("Error", "Please enter your phone number");
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
        Alert.alert("Success", "Login successful! Welcome back 👋");
        navigation.replace("Dashboard");
      } else {
        Alert.alert("Login Failed", "User not found. Please check your phone number or register first.");
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
      <StatusBar barStyle="light-content" backgroundColor="#1E73E8" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>🏢</Text>
        </View>
        <Text style={styles.title}>Smart Society</Text>
        <Text style={styles.subtitle}>Your community at your fingertips</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.instructionText}>Enter your phone number to continue</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>📞 Phone Number</Text>
          <TextInput
            placeholder="Enter your mobile number"
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
          onPress={login}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "🔄 Signing In..." : "🚪 Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Demo Credentials */}
        <View style={styles.demoContainer}>
          <Text style={styles.demoTitle}>Demo Credentials:</Text>
          <Text style={styles.demoText}>Phone: 1234567890</Text>
        </View>

        {/* Register Link */}
        <TouchableOpacity
          style={styles.registerContainer}
          onPress={() => navigation.navigate("Register")}
          activeOpacity={0.7}
        >
          <Text style={styles.registerText}>
            New to Smart Society? <Text style={styles.registerLink}>Register here</Text>
          </Text>
        </TouchableOpacity>

        {/* Admin Access */}
        <TouchableOpacity
          style={styles.adminContainer}
          onPress={() => navigation.navigate("AdminLogin")}
          activeOpacity={0.7}
        >
          <Text style={styles.adminText}>🔐 Admin Access</Text>
        </TouchableOpacity>
      </View>

      {/* Features Preview */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>What you can do:</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📝</Text>
            <Text style={styles.featureText}>Submit Complaints</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👥</Text>
            <Text style={styles.featureText}>Register Visitors</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💳</Text>
            <Text style={styles.featureText}>Pay Bills Online</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📢</Text>
            <Text style={styles.featureText}>View Notices</Text>
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
    backgroundColor: '#1E73E8',
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
    backgroundColor: '#1E73E8',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1E73E8',
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
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  demoText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#1E73E8',
    fontWeight: 'bold',
  },
  adminContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  adminText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
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
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ScrollView } from "react-native";
import api from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [flat, setFlat] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name.trim() || !phone.trim() || !flat.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("register.php", {
        name: name.trim(),
        phone: phone.trim(),
        flat: flat.trim()
      });

      console.log(res.data);

      if (res.data.status === "success") {
        Alert.alert("Success", "Registration successful! Please login with your phone number.");
        navigation.replace("Login");
      } else {
        Alert.alert("Registration Failed", res.data.message || "Registration failed. Please try again.");
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
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>🏢</Text>
        </View>
        <Text style={styles.title}>Join Smart Society</Text>
        <Text style={styles.subtitle}>Create your account to get started</Text>
      </View>

      {/* Registration Form */}
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Create Account</Text>
        <Text style={styles.instructionText}>Fill in your details to register</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>👤 Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholderTextColor="#999"
          />
        </View>

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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>🏠 Flat Number</Text>
          <TextInput
            placeholder="Enter your flat number (e.g., A-101)"
            style={styles.input}
            onChangeText={setFlat}
            value={flat}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[styles.registerButton, loading && styles.buttonDisabled]}
          onPress={register}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>
            {loading ? "🔄 Creating Account..." : "📝 Register"}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => navigation.replace("Login")}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Why Register?</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>📱</Text>
            <Text style={styles.benefitText}>Easy access to all society services</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💳</Text>
            <Text style={styles.benefitText}>Pay maintenance bills online</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>📝</Text>
            <Text style={styles.benefitText}>Submit complaints and track status</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>👥</Text>
            <Text style={styles.benefitText}>Register visitors and manage access</Text>
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
    backgroundColor: '#4CAF50',
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
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
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
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  benefitsContainer: {
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
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  benefitsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});
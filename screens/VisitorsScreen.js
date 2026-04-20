import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ScrollView, StatusBar } from "react-native";
import api from "../services/api";

export default function VisitorsScreen({ navigation }) {
  const [visitors, setVisitors] = useState([]);
  const [visitorName, setVisitorName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  // Assuming user_id is 1 for now (from login)
  const userId = 1;

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await api.get(`getVisitors.php?user_id=${userId}`);
      setVisitors(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load visitors");
    }
  };

  const registerVisitor = async () => {
    if (!visitorName.trim() || !purpose.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("addVisitor.php", {
        user_id: userId,
        visitor_name: visitorName.trim(),
        purpose: purpose.trim()
      });

      if (response.data.status === "success") {
        Alert.alert("Success", "Visitor registered successfully");
        setVisitorName("");
        setPurpose("");
        fetchVisitors(); // Refresh the list
      } else {
        Alert.alert("Error", "Failed to register visitor");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to register visitor");
    } finally {
      setLoading(false);
    }
  };

  const renderVisitor = ({ item }) => (
    <View style={styles.visitorItem}>
      <View style={styles.visitorAvatar}>
        <Text style={styles.avatarText}>{item.visitor_name.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.visitorContent}>
        <Text style={styles.visitorName}>{item.visitor_name}</Text>
        <Text style={styles.visitorPurpose}>{item.purpose}</Text>
        <Text style={styles.visitorDate}>
          {new Date(item.created_at).toLocaleDateString()} • {new Date(item.created_at).toLocaleTimeString()}
        </Text>
      </View>
      <View style={styles.visitorBadge}>
        <Text style={styles.badgeText}>👤</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Visitors</Text>
        <Text style={styles.headerSubtitle}>Manage visitor access</Text>
      </View>

      {/* Register Visitor Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Register New Visitor</Text>
        <TextInput
          style={styles.input}
          placeholder="Visitor Name"
          value={visitorName}
          onChangeText={setVisitorName}
        />
        <TextInput
          style={styles.input}
          placeholder="Purpose of Visit"
          value={purpose}
          onChangeText={setPurpose}
        />
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={registerVisitor}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Registering..." : "👤 Register Visitor"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Visitors List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Recent Visitors</Text>
        <FlatList
          data={visitors}
          renderItem={renderVisitor}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🚪</Text>
              <Text style={styles.emptyTitle}>No visitors registered</Text>
              <Text style={styles.emptyText}>Registered visitors will appear here</Text>
            </View>
          }
        />
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
    backgroundColor: '#2196F3',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  formCard: {
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
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
    shadowOpacity: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  list: {
    flex: 1,
  },
  visitorItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visitorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  visitorContent: {
    flex: 1,
  },
  visitorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  visitorPurpose: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  visitorDate: {
    fontSize: 12,
    color: '#999',
  },
  visitorBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#666',
    margin: 20,
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
});
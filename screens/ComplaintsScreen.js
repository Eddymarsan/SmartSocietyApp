import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ScrollView, StatusBar } from "react-native";
import api from "../services/api";

export default function ComplaintsScreen({ navigation }) {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState("");
  const [loading, setLoading] = useState(false);

  // Assuming user_id is 1 for now (from login)
  const userId = 1;

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get(`getComplaints.php?user_id=${userId}`);
      setComplaints(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load complaints");
    }
  };

  const submitComplaint = async () => {
    if (!newComplaint.trim()) {
      Alert.alert("Error", "Please enter a complaint");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("addComplaint.php", {
        user_id: userId,
        title: newComplaint.trim()
      });

      if (response.data.status === "success") {
        Alert.alert("Success", "Complaint submitted successfully");
        setNewComplaint("");
        fetchComplaints(); // Refresh the list
      } else {
        Alert.alert("Error", "Failed to submit complaint");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  const renderComplaint = ({ item }) => (
    <View style={styles.complaintItem}>
      <View style={styles.complaintHeader}>
        <Text style={styles.complaintTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, item.status === 'pending' ? styles.statusPending : styles.statusResolved]}>
          <Text style={[styles.statusText, item.status === 'pending' ? styles.statusTextPending : styles.statusTextResolved]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.complaintDate}>
        Submitted on {new Date().toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#FF9800" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complaints</Text>
        <Text style={styles.headerSubtitle}>Report issues and track status</Text>
      </View>

      {/* Submit Complaint Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Submit New Complaint</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your complaint..."
          value={newComplaint}
          onChangeText={setNewComplaint}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={submitComplaint}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "📝 Submit Complaint"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Complaints List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Your Complaints</Text>
        <FlatList
          data={complaints}
          renderItem={renderComplaint}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>No complaints yet</Text>
              <Text style={styles.emptyText}>Your submitted complaints will appear here</Text>
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
    backgroundColor: '#FF9800',
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
    minHeight: 100,
  },
  submitButton: {
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
  complaintItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusResolved: {
    backgroundColor: '#E8F5E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextPending: {
    color: '#FF9800',
  },
  statusTextResolved: {
    color: '#4CAF50',
  },
  complaintDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
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
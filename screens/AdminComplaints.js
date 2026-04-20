import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, StatusBar, ScrollView } from "react-native";
import api from "../services/api";

export default function AdminComplaints({ navigation, route }) {
  const { adminUser } = route.params;
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
    try {
      const response = await api.post("getAllComplaints.php", {
        admin_id: adminUser.id
      });
      setComplaints(response.data.complaints);
    } catch (error) {
      Alert.alert("Error", "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      const response = await api.post("updateComplaintStatus.php", {
        admin_id: adminUser.id,
        complaint_id: complaintId,
        status: newStatus
      });

      if (response.data.status === "success") {
        Alert.alert("Success", "Complaint status updated");
        fetchAllComplaints(); // Refresh the list
      } else {
        Alert.alert("Error", "Failed to update status");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update complaint status");
    }
  };

  const renderComplaint = ({ item }) => (
    <View style={styles.complaintCard}>
      <View style={styles.complaintHeader}>
        <View style={styles.complaintInfo}>
          <Text style={styles.complaintTitle}>{item.title}</Text>
          <Text style={styles.complaintUser}>
            👤 {item.user_name} • 🏠 {item.flat}
          </Text>
          <Text style={styles.complaintDate}>
            📅 {new Date().toLocaleDateString()}
          </Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'pending' ? styles.statusPending : styles.statusResolved]}>
          <Text style={[styles.statusText, item.status === 'pending' ? styles.statusTextPending : styles.statusTextResolved]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.statusActions}>
        {item.status === 'pending' && (
          <TouchableOpacity
            style={[styles.statusButton, styles.resolveButton]}
            onPress={() => updateComplaintStatus(item.id, 'resolved')}
            activeOpacity={0.7}
          >
            <Text style={styles.resolveButtonText}>✅ Mark Resolved</Text>
          </TouchableOpacity>
        )}
        {item.status === 'resolved' && (
          <TouchableOpacity
            style={[styles.statusButton, styles.reopenButton]}
            onPress={() => updateComplaintStatus(item.id, 'pending')}
            activeOpacity={0.7}
          >
            <Text style={styles.reopenButtonText}>🔄 Reopen</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#FF9800" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complaint Management</Text>
        <Text style={styles.headerSubtitle}>Handle all resident complaints</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{complaints.length}</Text>
          <Text style={styles.statLabel}>Total Complaints</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{resolvedCount}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      {/* Complaints List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>All Complaints</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading complaints...</Text>
          </View>
        ) : (
          <FlatList
            data={complaints}
            renderItem={renderComplaint}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📋</Text>
                <Text style={styles.emptyTitle}>No complaints found</Text>
                <Text style={styles.emptyText}>All complaints will appear here</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>← Back to Admin Panel</Text>
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
  statsContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
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
  complaintCard: {
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
    marginBottom: 12,
  },
  complaintInfo: {
    flex: 1,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  complaintUser: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  complaintDate: {
    fontSize: 12,
    color: '#999',
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
  statusActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  resolveButton: {
    backgroundColor: '#4CAF50',
  },
  resolveButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reopenButton: {
    backgroundColor: '#FF9800',
  },
  reopenButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
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
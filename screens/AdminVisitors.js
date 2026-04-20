import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, ScrollView } from "react-native";
import api from "../services/api";

export default function AdminVisitors({ navigation, route }) {
  const { adminUser } = route.params;
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllVisitors();
  }, []);

  const fetchAllVisitors = async () => {
    try {
      const response = await api.post("getAllVisitors.php", {
        admin_id: adminUser.id
      });
      setVisitors(response.data.visitors);
    } catch (error) {
      console.log("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  const renderVisitor = ({ item }) => (
    <View style={styles.visitorCard}>
      <View style={styles.visitorHeader}>
        <View style={styles.visitorInfo}>
          <Text style={styles.visitorName}>👤 {item.visitor_name}</Text>
          <Text style={styles.visitorHost}>
            Host: {item.user_name} • 🏠 {item.flat}
          </Text>
          <Text style={styles.visitorPurpose}>
            Purpose: {item.purpose}
          </Text>
        </View>
        <View style={styles.visitorDate}>
          <Text style={styles.dateText}>
            📅 {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.timeText}>
            🕐 {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </View>
      <View style={styles.visitorStatus}>
        <Text style={styles.statusText}>✅ Entry Logged</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Visitor Management</Text>
        <Text style={styles.headerSubtitle}>Monitor all visitor entries</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{visitors.length}</Text>
          <Text style={styles.statLabel}>Total Visitors</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{new Set(visitors.map(v => v.user_id)).size}</Text>
          <Text style={styles.statLabel}>Active Flats</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{new Date().toLocaleDateString('en-US', { month: 'short' })}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
      </View>

      {/* Visitors List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Recent Visitors</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading visitors...</Text>
          </View>
        ) : (
          <FlatList
            data={visitors}
            renderItem={renderVisitor}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🚪</Text>
                <Text style={styles.emptyTitle}>No visitors found</Text>
                <Text style={styles.emptyText}>Visitor logs will appear here</Text>
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
    backgroundColor: '#9C27B0',
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
    color: '#9C27B0',
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
  visitorCard: {
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
  visitorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  visitorHost: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  visitorPurpose: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  visitorDate: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  visitorStatus: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
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
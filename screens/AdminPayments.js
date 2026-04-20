import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, ScrollView } from "react-native";
import api from "../services/api";

export default function AdminPayments({ navigation, route }) {
  const { adminUser } = route.params;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    console.log('fetchAllPayments called with adminUser:', adminUser);
    try {
      const response = await api.post("getAllPayments.php", {
        admin_id: adminUser.id
      });
      console.log('API response:', response.data);
      setPayments(response.data.payments || []);
    } catch (error) {
      console.log("Failed to load payments:", error);
      // For testing, add some mock data
      setPayments([
        { id: 1, amount: 5000, user_name: 'Test User', flat: 'A101', status: 'pending' },
        { id: 2, amount: 4500, user_name: 'John Doe', flat: 'B202', status: 'paid' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderPayment = ({ item }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentAmount}>₹{item.amount}</Text>
          <Text style={styles.paymentUser}>
            👤 {item.user_name} • 🏠 {item.flat}
          </Text>
          <Text style={styles.paymentDate}>
            📅 {new Date().toLocaleDateString()}
          </Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'pending' ? styles.statusPending : styles.statusPaid]}>
          <Text style={[styles.statusText, item.status === 'pending' ? styles.statusTextPending : styles.statusTextPaid]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.paymentDescription}>
        💳 Maintenance payment for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </Text>
    </View>
  );

  const totalAmount = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Monitoring</Text>
        <Text style={styles.headerSubtitle}>Track all society payments</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>₹{totalAmount.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Amount</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>₹{pendingAmount.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>₹{paidAmount.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Collected</Text>
        </View>
      </View>

      {/* Payments List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>All Payments</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading payments...</Text>
          </View>
        ) : (
          <FlatList
            data={payments}
            renderItem={renderPayment}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>💰</Text>
                <Text style={styles.emptyTitle}>No payments found</Text>
                <Text style={styles.emptyText}>Payment records will appear here</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
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
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  paymentUser: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  paymentDate: {
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
  statusPaid: {
    backgroundColor: '#E8F5E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextPending: {
    color: '#FF9800',
  },
  statusTextPaid: {
    color: '#4CAF50',
  },
  paymentDescription: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
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
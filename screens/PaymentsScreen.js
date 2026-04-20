import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView, StatusBar } from "react-native";
import api from "../services/api";

export default function PaymentsScreen({ navigation }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Assuming user_id is 1 for now (from login)
  const userId = 1;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get(`getPayments.php?user_id=${userId}`);
      setPayments(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load payments");
    }
  };

  const makePayment = async (paymentId, amount) => {
    setLoading(true);
    try {
      // In a real app, this would integrate with a payment gateway
      // For now, we'll just simulate payment processing
      Alert.alert(
        "Payment Processing",
        `Processing payment of KSh ${amount}...`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Confirm Payment",
            onPress: async () => {
              // Simulate payment success
              Alert.alert("Success", "Payment processed successfully!");
              fetchPayments(); // Refresh the list
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const renderPayment = ({ item }) => (
    <View style={styles.paymentItem}>
      <View style={styles.paymentIcon}>
        <Text style={styles.iconText}>💳</Text>
      </View>
      <View style={styles.paymentContent}>
        <Text style={styles.paymentAmount}>KSh {parseFloat(item.amount).toFixed(2)}</Text>
        <Text style={styles.paymentLabel}>Maintenance Fee</Text>
      </View>
      <View style={styles.paymentRight}>
        <View style={[styles.statusBadge, item.status === 'pending' ? styles.statusPending : styles.statusPaid]}>
          <Text style={[styles.statusText, item.status === 'pending' ? styles.statusTextPending : styles.statusTextPaid]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        {item.status === 'pending' && (
          <TouchableOpacity
            style={[styles.payButton, loading && styles.buttonDisabled]}
            onPress={() => makePayment(item.id, item.amount)}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const totalPending = payments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

  const totalPaid = payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
        <Text style={styles.headerSubtitle}>Manage your payments</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, styles.pendingCard]}>
          <Text style={styles.summaryAmount}>KSh {totalPending.toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>⏳</Text>
          </View>
        </View>
        <View style={[styles.summaryCard, styles.paidCard]}>
          <Text style={styles.summaryAmount}>KSh {totalPaid.toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Paid</Text>
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>✅</Text>
          </View>
        </View>
      </View>

      {/* Payments List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        <FlatList
          data={payments}
          renderItem={renderPayment}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💳</Text>
              <Text style={styles.emptyTitle}>No payments found</Text>
              <Text style={styles.emptyText}>Your payment history will appear here</Text>
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
    backgroundColor: '#4CAF50',
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
  summaryContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  paidCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  cardIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconText: {
    fontSize: 16,
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
  paymentItem: {
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
  paymentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
  },
  paymentContent: {
    flex: 1,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
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
  payButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  payButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
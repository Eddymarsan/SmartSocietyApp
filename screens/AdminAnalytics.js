import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";

export default function AdminAnalytics({ navigation }) {
  // Mock data for analytics
  const analytics = {
    totalResidents: 24,
    activeComplaints: 8,
    totalPayments: 156,
    monthlyRevenue: 125000,
    visitorCount: 45,
    noticeCount: 12,
  };

  const chartData = [
    { label: "Jan", value: 85000 },
    { label: "Feb", value: 92000 },
    { label: "Mar", value: 88000 },
    { label: "Apr", value: 95000 },
    { label: "May", value: 102000 },
    { label: "Jun", value: 125000 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#607D8B" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Society Analytics</Text>
        <Text style={styles.headerSubtitle}>Key performance metrics</Text>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.metricsTitle}>📊 Key Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{analytics.totalResidents}</Text>
            <Text style={styles.metricLabel}>Total Residents</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{analytics.activeComplaints}</Text>
            <Text style={styles.metricLabel}>Active Complaints</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>₹{analytics.monthlyRevenue.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Monthly Revenue</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{analytics.visitorCount}</Text>
            <Text style={styles.metricLabel}>Monthly Visitors</Text>
          </View>
        </View>
      </View>

      {/* Revenue Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>💰 Monthly Revenue Trend</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartPlaceholderText}>📈 Revenue Chart</Text>
          <Text style={styles.chartPlaceholderSubtext}>Interactive chart will be displayed here</Text>
        </View>
        <View style={styles.chartData}>
          {chartData.map((item, index) => (
            <View key={index} style={styles.chartItem}>
              <Text style={styles.chartLabel}>{item.label}</Text>
              <Text style={styles.chartValue}>₹{item.value.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Activity Summary */}
      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>📋 Activity Summary</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>📝</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>Complaints resolved this month</Text>
              <Text style={styles.activityValue}>23</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>💳</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>Payments processed</Text>
              <Text style={styles.activityValue}>156</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>🚪</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>Visitor entries logged</Text>
              <Text style={styles.activityValue}>45</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityIcon}>📢</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>Notices posted</Text>
              <Text style={styles.activityValue}>12</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: '#607D8B',
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
  metricsContainer: {
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
  metricsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#607D8B',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chartPlaceholder: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 15,
  },
  chartPlaceholderText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: '#999',
  },
  chartData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartItem: {
    alignItems: 'center',
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  chartValue: {
    fontSize: 14,
    color: '#607D8B',
    fontWeight: 'bold',
  },
  activityContainer: {
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
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityList: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
    textAlign: 'center',
  },
  activityInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  activityValue: {
    fontSize: 16,
    color: '#607D8B',
    fontWeight: 'bold',
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
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, StatusBar } from "react-native";

export default function AmenitiesScreen({ navigation }) {
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const amenities = [
    {
      id: 1,
      name: 'Gym',
      icon: '🏋️',
      available: true,
      description: '24/7 access to fitness equipment',
      color: '#FF5722'
    },
    {
      id: 2,
      name: 'Swimming Pool',
      icon: '🏊',
      available: true,
      description: 'Temperature controlled pool',
      color: '#2196F3'
    },
    {
      id: 3,
      name: 'Community Hall',
      icon: '🏛️',
      available: false,
      description: 'Perfect for events and gatherings',
      color: '#9C27B0'
    },
    {
      id: 4,
      name: 'Tennis Court',
      icon: '🎾',
      available: true,
      description: 'Professional grade court',
      color: '#4CAF50'
    },
    {
      id: 5,
      name: 'Garden Area',
      icon: '🌳',
      available: true,
      description: 'Relaxing outdoor space',
      color: '#8BC34A'
    },
    {
      id: 6,
      name: 'Parking',
      icon: '🚗',
      available: true,
      description: 'Secure parking facility',
      color: '#607D8B'
    },
  ];

  const bookAmenity = (amenity) => {
    if (!amenity.available) {
      Alert.alert("Not Available", `${amenity.name} is currently not available for booking.`);
      return;
    }

    Alert.alert("Success", `${amenity.name} booked successfully!`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#FF5722" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Amenities</Text>
        <Text style={styles.headerSubtitle}>Book and enjoy society facilities</Text>
      </View>

      {/* Amenities Grid */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Available Facilities</Text>
        <View style={styles.amenitiesGrid}>
          {amenities.map((amenity) => (
            <View
              key={amenity.id}
              style={[
                styles.amenityCard,
                !amenity.available && styles.unavailableCard,
                { borderLeftColor: amenity.color }
              ]}
            >
              <View style={styles.amenityHeader}>
                <Text style={styles.amenityIcon}>{amenity.icon}</Text>
                {!amenity.available && (
                  <View style={styles.unavailableBadge}>
                    <Text style={styles.unavailableText}>Busy</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.amenityName, !amenity.available && styles.unavailableName]}>
                {amenity.name}
              </Text>
              <Text style={[styles.amenityDescription, !amenity.available && styles.unavailableDescription]}>
                {amenity.description}
              </Text>
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  !amenity.available && styles.disabledButton,
                  { backgroundColor: amenity.available ? amenity.color : '#CCC' }
                ]}
                onPress={() => bookAmenity(amenity)}
                disabled={!amenity.available}
                activeOpacity={0.8}
              >
                <Text style={styles.bookButtonText}>
                  {amenity.available ? 'Book Now' : 'Unavailable'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
    backgroundColor: '#FF5722',
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
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityCard: {
    backgroundColor: 'white',
    width: '48%',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  unavailableCard: {
    opacity: 0.7,
  },
  amenityHeader: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  amenityIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  unavailableBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF9800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  unavailableText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  amenityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  unavailableName: {
    color: '#999',
  },
  amenityDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 16,
  },
  unavailableDescription: {
    color: '#CCC',
  },
  bookButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 12,
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
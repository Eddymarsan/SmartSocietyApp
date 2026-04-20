import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, StatusBar, ScrollView } from "react-native";
import api from "../services/api";

export default function AdminNotices({ navigation, route }) {
  const { adminUser } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);

  const postNotice = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Please fill in both title and content");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("addNotice.php", {
        admin_id: adminUser.id,
        title: title.trim(),
        content: content.trim(),
        priority: priority
      });

      if (response.data.status === "success") {
        Alert.alert("Success", "Notice posted successfully!");
        setTitle("");
        setContent("");
        setPriority("normal");
      } else {
        Alert.alert("Error", "Failed to post notice");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to post notice");
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions = [
    { label: "🔴 High Priority", value: "high", color: "#F44336" },
    { label: "🟡 Normal Priority", value: "normal", color: "#FF9800" },
    { label: "🟢 Low Priority", value: "low", color: "#4CAF50" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#FF5722" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post Notices</Text>
        <Text style={styles.headerSubtitle}>Communicate with residents</Text>
      </View>

      {/* Notice Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Create New Notice</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>📢 Notice Title</Text>
          <TextInput
            placeholder="Enter notice title..."
            style={styles.titleInput}
            onChangeText={setTitle}
            value={title}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>📝 Notice Content</Text>
          <TextInput
            placeholder="Enter notice content..."
            style={styles.contentInput}
            onChangeText={setContent}
            value={content}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.priorityContainer}>
          <Text style={styles.priorityLabel}>🎯 Priority Level</Text>
          <View style={styles.priorityOptions}>
            {priorityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.priorityOption,
                  priority === option.value && { backgroundColor: option.color },
                ]}
                onPress={() => setPriority(option.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === option.value && styles.priorityTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.postButton, loading && styles.buttonDisabled]}
          onPress={postNotice}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.postButtonText}>
            {loading ? "📤 Posting..." : "📢 Post Notice"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notice Guidelines */}
      <View style={styles.guidelinesContainer}>
        <Text style={styles.guidelinesTitle}>📋 Notice Guidelines</Text>
        <View style={styles.guidelinesList}>
          <Text style={styles.guidelineItem}>• Keep titles clear and concise</Text>
          <Text style={styles.guidelineItem}>• Use high priority for urgent matters</Text>
          <Text style={styles.guidelineItem}>• Include relevant dates and times</Text>
          <Text style={styles.guidelineItem}>• Be respectful and professional</Text>
          <Text style={styles.guidelineItem}>• Notices are visible to all residents</Text>
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
  formContainer: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
  titleInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
    minHeight: 120,
  },
  priorityContainer: {
    marginBottom: 20,
  },
  priorityLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    fontWeight: '600',
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  priorityTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#FF5722',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
    shadowOpacity: 0,
  },
  postButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guidelinesContainer: {
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
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  guidelinesList: {
    paddingLeft: 10,
  },
  guidelineItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
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
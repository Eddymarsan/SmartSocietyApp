import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Dashboard from "../screens/Dashboard";
import PaymentsScreen from "../screens/PaymentsScreen";
import ComplaintsScreen from "../screens/ComplaintsScreen";
import VisitorsScreen from "../screens/VisitorsScreen";
import NoticesScreen from "../screens/NoticesScreen";
import AmenitiesScreen from "../screens/AmenitiesScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Admin Screens
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminPanel from "../screens/AdminPanel";
import AdminUsers from "../screens/AdminUsers";
import AdminComplaints from "../screens/AdminComplaints";
import AdminPayments from "../screens/AdminPayments";
import AdminVisitors from "../screens/AdminVisitors";
import AdminNotices from "../screens/AdminNotices";
import AdminAnalytics from "../screens/AdminAnalytics";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
      <Stack.Screen name="Complaints" component={ComplaintsScreen} />
      <Stack.Screen name="Visitors" component={VisitorsScreen} />
      <Stack.Screen name="Notices" component={NoticesScreen} />
      <Stack.Screen name="Amenities" component={AmenitiesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />

      {/* Admin Routes */}
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="AdminPanel" component={AdminPanel} />
      <Stack.Screen name="AdminUsers" component={AdminUsers} />
      <Stack.Screen name="AdminComplaints" component={AdminComplaints} />
      <Stack.Screen name="AdminPayments" component={AdminPayments} />
      <Stack.Screen name="AdminVisitors" component={AdminVisitors} />
      <Stack.Screen name="AdminNotices" component={AdminNotices} />
      <Stack.Screen name="AdminAnalytics" component={AdminAnalytics} />
    </Stack.Navigator>
  );
}
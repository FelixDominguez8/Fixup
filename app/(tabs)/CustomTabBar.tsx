// components/CustomTabBar.tsx

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../style/customTabBarStyles';

export default function CustomTabBar() {
  const router = useRouter();

  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/inicio')}>
        <Feather name="home" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/explore')}>
        <Feather name="map" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
        <Feather name="user" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

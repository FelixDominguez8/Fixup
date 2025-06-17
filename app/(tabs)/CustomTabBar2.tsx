import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { styles } from '../style/customTabBarStyles';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/inicioTecnico')}>
        <Feather
          name="home"
          size={28}
          color={pathname.includes('inicio') ? '#3B99A3' : 'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(tabs)/exploreTecnico')}>
        <Feather
          name="map"
          size={28}
          color={pathname.includes('explore') ? '#3B99A3' : 'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(tabs)/calendarTecnico')}>
        <Feather
          name="calendar"
          size={28}
          color={pathname.includes('calendar') ? '#3B99A3' : 'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(tabs)/chatTecnico')}>
        <Feather
          name="message-circle"
          size={28}
          color={pathname.includes('chat') ? '#3B99A3' : 'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(tabs)/profileTecnico')}>
        <Feather
          name="user"
          size={28}
          color={pathname.includes('profile') ? '#3B99A3' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
}

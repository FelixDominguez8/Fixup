import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from '../style/styleMap';
import CustomTabBar2 from './CustomTabBar2';

export default function MapScreen() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Pedir permiso
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado');
        Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación.');
        return;
      }

      // Obtener ubicación actual
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
        <CustomTabBar2 />
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B99A3" />
        <CustomTabBar2 />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Mi ubicación"
        />
      </MapView>
      <CustomTabBar2 />
    </View>
  );
}
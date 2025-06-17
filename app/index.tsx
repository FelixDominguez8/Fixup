import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login';
import InicioScreen from './(tabs)/inicio';
import InicioTecnicoScreen from './(tabs)/inicioTecnico';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function Index() {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold,
  });

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await AsyncStorage.getItem('userData');
        if (session) {
          const { userType } = JSON.parse(session);
          setInitialRoute(userType === 'cliente' ? 'Inicio' : 'InicioTecnico');
        } else {
          setInitialRoute('Login');
        }
      } catch (e) {
        console.error('Error al cargar sesión:', e);
        setInitialRoute('Login');
      }
    };

    checkSession();
  }, []);

  if (!fontsLoaded || initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B99A3" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="InicioTecnico" component={InicioTecnicoScreen} />
    </Stack.Navigator>
  );
}
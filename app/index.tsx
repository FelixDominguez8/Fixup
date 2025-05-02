import React from 'react';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './login';
import InicioScreen from './(tabs)/inicio';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Index() {
  const navigation = useNavigation<any>();

  React.useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B99A3" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Inicio" component={InicioScreen} />
    </Stack.Navigator>
  );
}

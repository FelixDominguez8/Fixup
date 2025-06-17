import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../style/styleServicios';
import { Feather, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfiguracionScreen() {
  const router = useRouter();

  const handleLogout = () => {
      Alert.alert(
        'Cerrar sesión',
        '¿Estás seguro de que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sí, salir',
            onPress: async () => {
              await AsyncStorage.removeItem('userData');
              router.replace('/login');
            },
          },
        ],
        { cancelable: true }
      );
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.flechaVolver} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.titulo}>Configuración</Text>

      <TouchableOpacity style={styles.botonServicio}>
        <View style={styles.contenidoServicio}>
          <View style={styles.iconoYTexto}>
            <Feather name="sun" size={24} color="white" />
            <Text style={styles.textoServicio}>Tema</Text>
          </View>
          <Feather name="chevron-right" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonServicio}>
        <View style={styles.contenidoServicio}>
          <View style={styles.iconoYTexto}>
            <Ionicons name="language" size={24} color="white" />
            <Text style={styles.textoServicio}>Lenguaje</Text>
          </View>
          <Feather name="chevron-right" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonServicio}>
        <View style={styles.contenidoServicio}>
          <View style={styles.iconoYTexto}>
            <Entypo name="location-pin" size={24} color="white" />
            <Text style={styles.textoServicio}>Ubicación</Text>
          </View>
          <Feather name="chevron-right" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonServicio}>
        <View style={styles.contenidoServicio}>
          <View style={styles.iconoYTexto}>
            <MaterialIcons name="delete" size={24} color="white" />
            <Text style={styles.textoServicio}>Eliminar Cuenta</Text>
          </View>
          <Feather name="chevron-right" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonServicio} onPress={handleLogout}>
        <View style={styles.contenidoServicio}>
          <View style={styles.iconoYTexto}>
            <Feather name="log-out" size={24} color="white" />
            <Text style={styles.textoServicio}>Cerrar Sesión</Text>
          </View>
          <Feather name="chevron-right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

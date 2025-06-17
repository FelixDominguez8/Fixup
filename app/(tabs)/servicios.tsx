// services.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../style/styleServicios';

export default function ServicesScreen() {
  const router = useRouter();

  const servicios = [
    { nombre: 'Reparación de Teléfonos', icono: <Feather name="smartphone" size={24} color="white" /> },
    { nombre: 'Reparacion de Computadoras', icono: <MaterialIcons name="computer" size={24} color="white" /> },
    { nombre: 'Asistencia de Hogar', icono: <FontAwesome5 name="tools" size={20} color="white" /> },
    { nombre: 'Configuración de Red', icono: <Feather name="wifi" size={24} color="white" /> },
    { nombre: 'Reparación de Computadoras', icono: <MaterialIcons name="desktop-windows" size={24} color="white" /> },
    { nombre: 'Fontanería', icono: <MaterialIcons name="plumbing" size={24} color="white" /> },
    { nombre: 'Asistencia Mecánica', icono: <MaterialIcons name="build" size={24} color="white" /> },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/inicio')}>
        <Feather name="arrow-left" size={24} color="white" style={styles.flecha} />
      </TouchableOpacity>

      <Text style={styles.titulo}>Servicios</Text>

      {servicios.map((servicio, index) => (
        <TouchableOpacity key={index} style={styles.botonServicio}>
            <View style={styles.contenidoServicio}>
            <View style={styles.iconoYTexto}>
                {servicio.icono}
                <Text
                style={styles.textoServicio}
                numberOfLines={1}
                ellipsizeMode="tail"
                >
                {servicio.nombre}
                </Text>
            </View>
            <Feather name="chevron-right" size={20} color="white" />
            </View>
        </TouchableOpacity>
      
      ))}
    </View>
  );
}

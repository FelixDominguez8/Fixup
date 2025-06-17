import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { styles } from '../style/styleperfil';
import CustomTabBar from './CustomTabBar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
  const router = useRouter();
  const [nombreUsuario, setNombreUsuario] = useState('Nombre del Usuario');
  const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const uid = parsedUser?.uid;
        if (!uid) return;

        const response = await fetch(`https://fixup-backend.onrender.com/getProfile?uid=${uid}`);
        const data = await response.json();

        if (response.ok) {
          setNombreUsuario(data.nombre || 'Nombre del Usuario');
          setImagenPerfil(data.foto || null);
        }
      } catch (error) {
        console.log('No se pudo cargar el perfil:', error);
      }
    };

    cargarPerfil();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.titulo}>Perfil</Text>

        <View style={styles.bloquePerfil}>
          {imagenPerfil ? (
            <Image source={{ uri: imagenPerfil }} style={styles.imagenPerfil} />
          ) : (
            <Image source={require('../../assets/images/icon.png')} style={styles.imagenPerfil} />
          )}
          <Text style={styles.nombreUsuario}>{nombreUsuario}</Text>
          <TouchableOpacity style={styles.botonEditar} onPress={() => router.push('/editarPerfil')}>
            <Text style={styles.botonEditarTexto}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.seccionTitulo}>Historial</Text>
        <TouchableOpacity style={styles.botonSeccion} onPress={() => router.push('/historial')}>
          <Feather name="clock" size={20} color="white" style={styles.iconoSeccion} />
          <Text style={styles.textoSeccion}>Servicios Pasados</Text>
        </TouchableOpacity>

        <Text style={styles.seccionTitulo}>Métodos de Pago</Text>
        <TouchableOpacity style={styles.botonSeccion}>
          <FontAwesome name="credit-card" size={20} color="white" style={styles.iconoSeccion} />
          <Text style={styles.textoSeccion}>Tarjeta de Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonSeccion}>
          <FontAwesome name="paypal" size={20} color="white" style={styles.iconoSeccion} />
          <Text style={styles.textoSeccion}>PayPal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonConfiguracion} onPress={() => router.push('/configuracion')}>
          <Feather name="settings" size={20} color="white" style={styles.iconoSeccion} />
          <Text style={styles.textoSeccion}>Configuración</Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomTabBar />
    </View>
  );
}

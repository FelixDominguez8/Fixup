import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { styles } from '../style/styleperfil';
import CustomTabBar2 from './CustomTabBar2';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const uid = parsedUser?.uid;

        if (!uid) {
          Alert.alert('Error', 'No se pudo obtener el UID del usuario.');
          return;
        }

        const response = await fetch(`https://fixup-backend.onrender.com/getProfile?uid=${uid}`);
        const data = await response.json();

        if (response.ok) {
          setNombre(data.nombre || '');
          setFotoPerfil(data.foto || null);
        } else {
          Alert.alert('Error', data.msg || 'No se pudo cargar el perfil.');
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error);
        Alert.alert('Error', 'Ocurrió un error al cargar el perfil.');
      }
    };

    cargarPerfil();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.titulo}>Perfil</Text>

        <View style={styles.bloquePerfil}>
          {fotoPerfil ? (
            <Image source={{ uri: fotoPerfil }} style={styles.imagenPerfil} />
          ) : (
            <Image source={require('../../assets/images/icon.png')} style={styles.imagenPerfil} />
          )}
          <Text style={styles.nombreUsuario}>{nombre || 'Nombre del Usuario'}</Text>

          <TouchableOpacity style={styles.botonEditar} onPress={() => { router.push('/editarPerfilTecnico'); }}>
            <Text style={styles.botonEditarTexto}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.seccionTitulo}>Historial</Text>
        <TouchableOpacity style={styles.botonSeccion} onPress={() => { router.push('/historial'); }}>
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

        <TouchableOpacity style={styles.botonConfiguracion} onPress={() => { router.push('/configuracionTecnico'); }}>
          <Feather name="settings" size={20} color="white" style={styles.iconoSeccion} />
          <Text style={styles.textoSeccion}>Configuración</Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomTabBar2 />
    </View>
  );
}

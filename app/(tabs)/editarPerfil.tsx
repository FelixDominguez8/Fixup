import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../style/styleEditarPerfil';

export default function EditarPerfil() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
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
          setNombre(data.nombre || '');
          setImagenPerfil(data.foto || null);
        }
      } catch (error) {
        console.log('Perfil aún no existe o falló la carga.');
      }
    };

    cargarPerfil();
  }, []);

  const seleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      const base64 = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setImagenPerfil(base64);
    }
  };

  const guardarPerfil = async () => {
    try {
      if (!nombre.trim()) {
        Alert.alert('Error', 'Por favor ingresa un nombre.');
        return;
      }

      const storedUser = await AsyncStorage.getItem('userData');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const uid = parsedUser?.uid;

      if (!uid) {
        Alert.alert('Error', 'No se pudo obtener el UID del usuario.');
        return;
      }

      let imagenBase64 = null;

      if (imagenPerfil) {
        if (imagenPerfil.startsWith('data:image')) {
          imagenBase64 = imagenPerfil;
        } else {
          const response = await fetch(imagenPerfil);
          const blob = await response.blob();
          const reader = new FileReader();

          imagenBase64 = await new Promise<string>((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
      }

      const perfilData = {
        nombre,
        fotoBase64: imagenBase64,
        modificado: 'Si',
      };

      const response = await fetch(`https://fixup-backend.onrender.com/guardarPerfilBasico/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(perfilData),
      });

      const resultado = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Perfil guardado correctamente.');
        router.back();
      } else {
        Alert.alert('Error', resultado.msg || 'Error al guardar el perfil.');
      }
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar el perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.flechaVolver} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Editar Perfil</Text>

      <TouchableOpacity style={styles.perfilFotoContainer} onPress={seleccionarImagen}>
        {imagenPerfil ? (
          <Image source={{ uri: imagenPerfil }} style={styles.perfilFoto} />
        ) : (
          <Image source={require('../../assets/images/icon.png')} style={styles.perfilFoto} />
        )}
        <Text style={styles.cambiarFotoTexto}>Cambiar Foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarPerfil}>
        <Text style={styles.botonGuardarTexto}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

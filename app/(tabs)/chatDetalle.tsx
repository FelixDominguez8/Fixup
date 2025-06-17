import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../style/stylechats';
import moment from 'moment';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

export default function ChatDetalle() {
  const [mensajes, setMensajes] = useState([] as any[]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [usuario, setUsuario] = useState<any>(null);
  const params = useLocalSearchParams();
  const router = useRouter();
  const socket = io('https://fixup-backend.onrender.com');


  useEffect(() => {
    const obtenerMensajes = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUsuario(parsedUser);
        const uid = parsedUser?.uid;

        const mensajeData = {
          enviadopor: uid,
          recibidopor: params.id, 
        };

        const response = await fetch(`https://fixup-backend.onrender.com/obtenerMensajes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mensajeData),
        });
        const data = await response.json();

        const mensajesConBandera = data.map((mensaje: any) => ({
          ...mensaje,
          enviadoPorMi: mensaje.enviadopor === uid,   
          id: mensaje._id     
        }));

        setMensajes(mensajesConBandera);
        
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      }
    };

    obtenerMensajes();

    socket.on('mensajeRecibido', (mensaje) => {
    if (!usuario) return;

    if (
      (mensaje.enviadopor === params.id && mensaje.recibidopor === usuario.uid) ||
      (mensaje.enviadopor === usuario.uid && mensaje.recibidopor === params.id)
    ) {
      setMensajes((prevMensajes) => [
        ...prevMensajes,
        {
          ...mensaje,
          enviadoPorMi: mensaje.enviadopor === usuario.uid,
        },
      ]);
    }
  });

  return () => {
    socket.off('mensajeRecibido');
  };
}, [usuario]); 

  const crearMensajes = async (nuevo: any) => {
    try {
      const storedUser = await AsyncStorage.getItem('userData');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const uid = parsedUser?.uid;

      const mensajeData = {
        mensaje: nuevo.texto,
        fecha: nuevo.hora,
        enviadopor: uid,
        recibidopor: params.id, 
      };

      const response = await fetch(`https://fixup-backend.onrender.com/crearMensajes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensajeData),
      });
      const data = await response.json();
      
    } catch (error) {
      console.error('Error al crear mensajes:', error);
    }
  };

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;

    const storedUser = await AsyncStorage.getItem('userData');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const uid = parsedUser?.uid;

    const nuevo = {
      mensaje: nuevoMensaje,
      fecha: new Date().toISOString(),
      enviadopor: uid,
      recibidopor: params.id,
    };

    await crearMensajes(nuevo);

    socket.emit('nuevoMensaje', nuevo);

    setMensajes((prev) => [...prev, { ...nuevo, enviadoPorMi: true }]);
    setNuevoMensaje('');
  };


  const renderItem = ({ item }: { item: any }) => (
    <View
      style={[
        styles.burbujaMensaje,
        item.enviadoPorMi ? styles.mensajeDerecha : styles.mensajeIzquierda,
      ]}
    >
      <Text style={styles.textoMensaje}>{item.mensaje}</Text>
      <Text style={styles.horaMensaje}>{moment(item.fecha).format('HH:mm')}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <TouchableOpacity style={styles.flechaVolver} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.headerChat}>
        {params.foto && (Array.isArray(params.foto) ? params.foto[0] : params.foto) !== '' ? (
          <Image
            source={{ uri: Array.isArray(params.foto) ? params.foto[0] : params.foto }}
            style={styles.tecnicoImagen}
          />
        ) : (
          <Image
            source={require('../../assets/images/icon.png')}
            style={styles.tecnicoImagen}
          />
        )}
        <Text style={[styles.tecnicoNombre, { marginLeft: 10 }]}>{params.nombre}</Text>
      </View>

      <FlatList
        data={mensajes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        style={{ flex: 1 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputMensaje}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#888"
          value={nuevoMensaje}
          onChangeText={setNuevoMensaje}
          onSubmitEditing={enviarMensaje}
          returnKeyType="send" 
        />
        <TouchableOpacity onPress={enviarMensaje}>
          <Ionicons name="send" size={24} color="#3B99A3" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

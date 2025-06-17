import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from '../style/stylechats';
import { useRouter } from 'expo-router';
import moment from 'moment';
import CustomTabBar from './CustomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chats() {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);;

  useEffect(() => {
    const obtenerChats = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const uid = parsedUser?.uid;

        const response = await fetch(`https://fixup-backend.onrender.com/obtenerChats/${uid}`);
        const data = await response.json();
        
        obtenerInfo(data);
      } catch (error) {
        console.error('Error al obtener chats:', error);
      }
    };

    const obtenerInfo = async (chats: any[]) => {
      try {
        const promesas = chats.map(async (chat) => {
          const response = await fetch(`https://fixup-backend.onrender.com/obtenerUsuarioChat/${chat.tecnico}`);
          const data = await response.json();
          return data;
        });

        const resultados = await Promise.all(promesas);
        setChats(resultados);
      } catch (error) {
        console.error("Error al obtener información de chats:", error);
        return [];
      }
    };


    obtenerChats();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const ahora = moment();
    const enviado = moment(item.timestamp);
    const esHoy = ahora.isSame(enviado, 'day');

    return (
      <TouchableOpacity
        style={styles.tecnicoCard}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/chatDetalle',
            params: {
              id: item.uid,
              foto: item.fotoBase64 || '',
              nombre: item.nombre,
            },
          })
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.fotoBase64 ? (
            <Image source={{ uri: item.fotoBase64 }} style={styles.tecnicoImagen} />
          ) : (
            <Image source={require('../../assets/images/icon.png')} style={styles.tecnicoImagen} />
          )}
          <View style={{ flex: 1 , paddingLeft: 12 }}>
            <Text style={[styles.tecnicoNombre, { marginBottom: 2 }]}>
              {item.nombre}
            </Text>
            <Text style={styles.tecnicoDetalles} numberOfLines={1}>
              {item.tipo}
            </Text>
          </View>
          <Text style={{ color: '#999', fontSize: 12 }}>
            {esHoy ? enviado.format('HH:mm') : enviado.format('DD/MM')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Chats</Text>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <CustomTabBar />
    </View>
  );
}
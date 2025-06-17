import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { styles } from '../style/stylehome';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TecnicoDetalleScreen() {
const router = useRouter();
const params = useLocalSearchParams();
const servicios = JSON.parse(params.servicios as string);

const crearChat = async () => {
    const storedUser = await AsyncStorage.getItem('userData');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const uidcliente = parsedUser?.uid;
    const chatid = uidcliente + params.id;
    try {
        const response = await fetch('https://fixup-backend.onrender.com/crearChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente: uidcliente, tecnico: params.id, idchat: chatid }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || 'Error al crear el chat');
        router.push('/(tabs)/chat');

    } catch (error: any) {
        Alert.alert('Error al crear el chat', error.message);
    }
};

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity style={styles.flechaVolver} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.titulo}>{params.nombre}</Text>

        <View style={styles.tecnicoCard}>
            <View style={styles.tecnicoInfoContainer}>
            <Image source={
                    params.foto
                      ? { uri: params.foto }
                      : require('../../assets/images/icon.png')
                  } style={styles.tecnicoImagen} />
            <View style={styles.tecnicoTextoContainer}>
                <Text style={styles.tecnicoNombre}>{params.nombre}</Text>
                <Text style={styles.tecnicoDetalles}>
                    {Array.isArray(params.tipo)
                        ? params.tipo.join(', ')
                        : typeof params.tipo === 'string' && params.tipo.startsWith('[')
                        ? JSON.parse(params.tipo).join(', ')
                        : params.tipo}
                </Text>
                <Text style={styles.tecnicoDetalles}>{params.ubicacion}</Text>

                <View style={styles.estrellasContainer}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <Feather
                    key={i}
                    name="star"
                    size={16}
                    color={i < Math.round(Number(params.calificacion)) ? '#3B99A3' : '#555'}
                    style={{ marginRight: 2 }}
                    />
                ))}
                </View>
            </View>
            <Text style={styles.tecnicoPuntaje}>{Number(params.calificacion).toFixed(1)}</Text>
            </View>
        </View>

        <Text style={styles.seccionTitulo}>Descripción</Text>
        <View style={styles.tecnicoCard}>
            <Text style={styles.tecnicoDetalles}>
            {params.descripcion}
            </Text>
        </View>

        {servicios.map(
            (
                servicio: { nombre: string; descripcion: string },
                index: number
            ) => (
                <View key={index} style={styles.tecnicoCard}>
                <Text style={styles.tecnicoNombre}>{servicio.nombre}</Text>
                <Text style={styles.tecnicoDetalles}>{servicio.descripcion}</Text>
                </View>
            )
        )}


        <TouchableOpacity style={[styles.botonAccion2, { alignSelf: 'center', marginTop: 20 }]} onPress={crearChat}>
            <Feather name="message-circle" size={18} color="white" />
            <Text style={styles.botonTexto}>Chatear</Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

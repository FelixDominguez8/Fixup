import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from '../style/stylehome'; 
import { useRouter } from 'expo-router';


const tecnicos = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    nombre: `Técnico ${i + 1}`,
    calificacion: 4.5,
    ubicacion: 'Ciudad Ejemplo',
    imagen: require('../../assets/images/icon.png'), 
    tipo: 'Mecanico',
  }));

const historialServicios = [
  { id: '1', nombre: 'Juan Pérez', tipo: 'Reparación de Computadoras', fecha: '05/04/2025', monto: '$150', imagen: require('../../assets/images/icon.png') },
  { id: '2', nombre: 'Ana Martínez', tipo: 'Fontanería', fecha: '02/04/2025', monto: '$80', imagen: require('../../assets/images/icon.png') },
];

export default function HistorialServiciosScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
            <TouchableOpacity style={styles.flechaVolver} onPress={() => router.back()}>
                <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.titulo}>Todos los servicios</Text>

            <Text style={styles.seccionTitulo}>Servicios en Proceso</Text>

                {tecnicos.map((tecnico) => (
                    <View key={tecnico.id}>
                        <View style={styles.tecnicoCard}>
                        <View style={styles.tecnicoInfoContainer}>
                            <Image source={tecnico.imagen} style={styles.tecnicoImagen} />
                            <View style={styles.tecnicoTextoContainer}>
                            <Text style={styles.tecnicoNombre}>{tecnico.nombre}</Text>
                    
                            <View style={styles.estrellasContainer}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                <Feather
                                    key={i}
                                    name="star"
                                    size={16}
                                    color={i < Math.round(tecnico.calificacion) ? '#3B99A3' : '#555'}
                                    style={{ marginRight: 2 }}
                                />
                                ))}
                            </View>
                    
                            <View style={styles.ubicacionCalificacion}>
                                <Text style={styles.tecnicoDetalles}>{tecnico.ubicacion}</Text>
                            </View>
                            </View>
                            <Text style={styles.tecnicoPuntaje}>{tecnico.calificacion.toFixed(1)}</Text>
                        </View>

                        <View style={styles.botonesContainer}>
                            <View style={styles.tecnicoBotones}>
                            <TouchableOpacity style={styles.botonAccion}>
                                <Feather name="message-circle" size={18} color="white" />
                                <Text style={styles.botonTexto}>Chat</Text>
                            </TouchableOpacity>
                            </View>
                        
                            <View style={styles.tecnicoBotones}>
                            <TouchableOpacity style={styles.botonAccion}>
                                <Feather name="credit-card" size={18} color="white" />
                                <Text style={styles.botonTexto}>Pago</Text>
                            </TouchableOpacity>
                            </View>
                        
                            <View style={styles.tecnicoBotones}>
                            <TouchableOpacity style={styles.botonAccion}>
                                <Feather name="calendar" size={18} color="white" />
                                <Text style={styles.botonTexto}>Citas</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        
                        </View>
                    </View>
                    ))}

            <Text style={styles.seccionTitulo}>Historial de Servicios</Text>

            {historialServicios.map((servicio) => (
                <View key={servicio.id} style={styles.tecnicoCard}>
                <View style={styles.tecnicoInfoContainer}>
                    <Image source={servicio.imagen} style={styles.tecnicoImagen} />
                    <View style={styles.tecnicoTextoContainer}>
                    <Text style={styles.tecnicoNombre}>{servicio.nombre}</Text>
                    <Text style={styles.tecnicoDetalles}>{servicio.tipo}</Text>
                    <Text style={styles.tecnicoDetalles}>{servicio.fecha}</Text>
                    <Text style={styles.tecnicoDetalles}>{servicio.monto}</Text>
                    </View>
                </View>
                </View>
            ))}
        </ScrollView>   
    </View>
  );
}
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from '../style/stylehome';
import { useRouter } from 'expo-router';
import CustomTabBar from './CustomTabBar2';

const serviciosEnProceso = Array.from({ length: 4 }, (_, i) => ({
  id: i.toString(),
  cliente: `Cliente ${i + 1}`,
  fecha: '05/04/2025',
  tipo: 'Reparación de Computadora',
  ubicacion: 'Ciudad Ejemplo',
  imagen: require('../../assets/images/icon.png'),
}));

export default function InicioTecnico() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.saludo}>Hola, Técnico</Text>
        <Text style={styles.titulo}>Tus Servicios Actuales</Text>

        <Text style={styles.seccionTitulo}>En Proceso</Text>

        {serviciosEnProceso.map((servicio) => (
          <View key={servicio.id}>
            <View style={styles.tecnicoCard}>
              <View style={styles.tecnicoInfoContainer}>
                <Image source={servicio.imagen} style={styles.tecnicoImagen} />
                <View style={styles.tecnicoTextoContainer}>
                  <Text style={styles.tecnicoNombre}>{servicio.cliente}</Text>
                  <Text style={styles.tecnicoDetalles}>{servicio.fecha}</Text>
                  <Text style={styles.tecnicoDetalles}>{servicio.tipo}</Text>
                  <Text style={styles.tecnicoDetalles}>{servicio.ubicacion}</Text>
                </View>
              </View>

              <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonAccion}>
                    <Feather name="map-pin" size={18} color="white" />
                    <Text style={styles.botonTexto}>Ubicación</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonAccion}>
                    <Feather name="message-circle" size={18} color="white" />
                    <Text style={styles.botonTexto}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonAccion}>
                    <Feather name="credit-card" size={18} color="white" />
                    <Text style={styles.botonTexto}>Pago</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonAccion}>
                    <Feather name="calendar" size={18} color="white" />
                    <Text style={styles.botonTexto}>Citas</Text>
                </TouchableOpacity>
                </View>
            </View>

          </View>
        ))}
      </ScrollView>
      <CustomTabBar />
    </View>
  );
}

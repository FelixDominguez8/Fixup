import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../style/stylehome';
import CustomTabBar from './CustomTabBar';

const servicios = [
  { nombre: 'Reparación de Teléfonos', icon: <Feather name="smartphone" size={24} color="white" /> },
  { nombre: 'Instalación de Software', icon: <MaterialIcons name="computer" size={24} color="white" /> },
  { nombre: 'Asistencia de Hogar', icon: <FontAwesome5 name="tools" size={24} color="white" /> },
  { nombre: 'Otros Servicios', icon: <Feather name="more-horizontal" size={24} color="white" /> },
];

const tecnicos = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  nombre: `Tecnico ${i + 1}`,
  calificacion: 4.5,
  ubicacion: 'Ciudad Ejemplo',
  imagen: require('../../assets/images/icon.png'), 
}));

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}> 
      <Text style={styles.saludo}>Hola, (Usuario)</Text>
      <Text style={styles.titulo}>Encontrar Técnicos Cerca</Text>

      <View style={styles.barraBusqueda}>
        <Feather name="search" size={20} color="#999" style={styles.iconoBusqueda} />
        <TextInput
          style={styles.inputBusqueda}
          placeholder="Encontrar servicios"
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.seccionTitulo}>Servicios Populares</Text>

      <View style={styles.serviciosContainer}>
        {servicios.map((servicio, index) => (
          <TouchableOpacity key={index} style={styles.servicioBtn}>
            {servicio.icon}
            <Text style={styles.servicioTexto}>{servicio.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.seccionTitulo}>Técnicos Cercanos</Text>

      {tecnicos.map((tecnico) => (
        <View key={tecnico.id} style={styles.tecnicoCard}>
          <Image source={tecnico.imagen} style={styles.tecnicoImagen} />
          <View style={styles.tecnicoInfo}>
            <Text style={styles.tecnicoNombre}>{tecnico.nombre}</Text>
            <Text style={styles.tecnicoDetalles}>⭐ {tecnico.calificacion} estrellas</Text>
            <Text style={styles.tecnicoDetalles}>📍 {tecnico.ubicacion}</Text>
          </View>
          <Text style={styles.tecnicoPuntaje}>{tecnico.calificacion.toFixed(1)}</Text>
          <View style={styles.botonesContainer}>
            <TouchableOpacity style={styles.botonAccion}>
              <Feather name="message-circle" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonAccion}>
              <Feather name="credit-card" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonAccion}>
              <Feather name="calendar" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <CustomTabBar />
    </ScrollView> 
  );
}
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../style/stylehome';
import CustomTabBar from './CustomTabBar';
import { useRouter } from 'expo-router';

const servicios = [
  { nombre: 'Reparación de Teléfonos', icon: <Feather name="smartphone" size={24} color="white" /> },
  { nombre: 'Reparación de Computadoras', icon: <MaterialIcons name="computer" size={24} color="white" /> },
  { nombre: 'Asistencia de Hogar', icon: <FontAwesome5 name="tools" size={24} color="white" /> },
  { nombre: 'Otros Servicios', icon: <Feather name="more-horizontal" size={24} color="white" /> },
];

export default function HomeScreen() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [tecnicos, setTecnicos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const obtenerTecnicos = async () => {
      try {
        const response = await fetch('https://fixup-backend.onrender.com/obtenerTecnicos'); 
        const data = await response.json();

        const tecnicosFiltrados = data.filter(
          (t: any) => t.tipo === 'tecnico' && t.modificado === 'Si'
        );

        setTecnicos(tecnicosFiltrados);
      } catch (error) {
        console.error('Error al obtener técnicos:', error);
      }
    };

    obtenerTecnicos();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.saludo}>Hola, (Usuario)</Text>
        <Text style={styles.titulo}>Encontrar Técnicos Cerca</Text>

        <View style={styles.barraBusqueda}>
          <Feather name="search" size={20} color="#999" style={styles.iconoBusqueda} />
          <TextInput
            style={styles.inputBusqueda}
            placeholder="Encontrar servicios"
            placeholderTextColor="#999"
            value={terminoBusqueda}
            onChangeText={setTerminoBusqueda}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              router.push({
                pathname: '/(tabs)/busqueda',
                params: { q: terminoBusqueda },
              });
            }}
          />
        </View>

        <Text style={styles.seccionTitulo}>Servicios Populares</Text>
        <View style={styles.serviciosContainer}>
          {servicios.map((servicio, index) => (
            <TouchableOpacity
              key={index}
              style={styles.servicioBtn}
              onPress={() => {
                if (servicio.nombre !== 'Otros Servicios') {
                  router.push({
                    pathname: '/(tabs)/busquedaTipo',
                    params: {
                      servicioNombre: servicio.nombre,
                      servicioIcono: 'smartphone',
                    },
                  });
                } else {
                  router.push('/(tabs)/servicios');
                }
              }}
            >
              {servicio.icon}
              <Text style={styles.servicioTexto}>{servicio.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.seccionTitulo}>Técnicos Cercanos</Text>

        {tecnicos.map((tecnico: any) => (
          <TouchableOpacity
            key={tecnico._id}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/tecnicoDetalle',
                params: {
                  id: tecnico.uid,
                  foto: tecnico.fotoBase64 || '',
                  nombre: tecnico.nombre,
                  tipo: tecnico.especialidades || 'Especialidad no definida',
                  calificacion: tecnico.calificacion?.toString() || '0',
                  ubicacion: tecnico.direccion || 'Ubicación no definida',
                  descripcion: tecnico.descripcionGeneral || 'Este técnico cuenta con amplia experiencia.',
                  servicios: JSON.stringify(
                    tecnico.servicios?.map((s: { nombre: string; descripcion: string }) => ({
                      nombre: s.nombre,
                      descripcion: s.descripcion,
                    })) || [],
                  ),
                },
              })
            }
          >
            <View style={styles.tecnicoCard}>
              <View style={styles.tecnicoInfoContainer}>
                <Image
                  source={
                    tecnico.fotoBase64
                      ? { uri: tecnico.fotoBase64 }
                      : require('../../assets/images/icon.png')
                  }
                  style={styles.tecnicoImagen}
                />
                <View style={styles.tecnicoTextoContainer}>
                  <Text style={styles.tecnicoNombre}>{tecnico.nombre}</Text>

                  <View style={styles.ubicacionCalificacion}>
                    <Text style={styles.tecnicoDetalles}>{tecnico.especialidades?.[0] || ''}</Text>
                  </View>

                  <View style={styles.estrellasContainer}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Feather
                        key={i}
                        name="star"
                        size={16}
                        color={i < Math.round(tecnico.calificacion || 0) ? '#3B99A3' : '#555'}
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>

                  <View style={styles.ubicacionCalificacion}>
                    <Text style={styles.tecnicoDetalles}>{tecnico.direccion}</Text>
                  </View>
                </View>
                <Text style={styles.tecnicoPuntaje}>
                  {(tecnico.calificacion || 0).toFixed(1)}
                </Text>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
      <CustomTabBar />
    </View>
  );
}


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from '../style/stylehome';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function BusquedaResultado() {
  const { q } = useLocalSearchParams();
  const router = useRouter();

  const [termino, setTermino] = useState(q?.[0] || '');
  const [tecnicos, setTecnicos] = useState([]);

  const obtenerTecnicos = async (busqueda: string) => {
    if (!busqueda || busqueda.trim() === '') {
      setTecnicos([]);
      return;
    }
    setTecnicos([]);
    try {
      const response = await fetch(`https://fixup-backend.onrender.com/buscarTecnicos?q=${encodeURIComponent(busqueda)}`);
      const data = await response.json();

      const tecnicosFiltrados = data.filter(
        (t: any) => t.tipo === 'tecnico' && t.modificado === 'Si'
      );

      setTecnicos(tecnicosFiltrados);
    } catch (error) {
      console.error('Error al obtener técnicos:', error);
    }
  };

  useEffect(() => {
    obtenerTecnicos(termino);
  }, []);

  const handleBuscar = () => {
    Keyboard.dismiss();
    obtenerTecnicos(termino.trim());
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity style={styles.flechaVolver} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.barraBusqueda}>
          <Feather name="search" size={20} color="#999" style={styles.iconoBusqueda} />
          <TextInput
            style={styles.inputBusqueda}
            placeholder="Encontrar servicios"
            placeholderTextColor="#999"
            value={termino}
            onChangeText={setTermino}
            onSubmitEditing={handleBuscar}
          />
        </View>

        {tecnicos.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Feather name="search" size={48} color="#888" style={{ marginBottom: 10 }} />
            <Text style={{ color: 'white', fontSize: 16 }}>
              No se encontraron resultados para “{termino}”
            </Text>
          </View>
        ) : (
          tecnicos.map((tecnico: any) => (
            <TouchableOpacity
              key={tecnico._id}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/tecnicoDetalle',
                  params: {
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
          ))
        )}
      </ScrollView>
    </View>
  );
}

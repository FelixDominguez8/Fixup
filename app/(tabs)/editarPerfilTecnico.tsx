import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../style/styleEditarPerfil';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const especialidadesOpciones = [
  'Reparacion de Telefonos',
  'Reparacion de Computadoras',
  'Asistencia de Hogar',
  'Configuracion de Red',
  'Reparacion de Televisor',
  'Fontaneria',
  'Asistencia Mecanica',
];

export default function EditarPerfil() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [descripcionGeneral, setDescripcionGeneral] = useState('');
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [servicios, setServicios] = useState<
    { nombre: string; descripcion: string }[]
  >([]);
  const [nuevoServicio, setNuevoServicio] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string | null>(null);
  const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);

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
        const result = await response.json();

        if (response.ok) {
          setNombre(result.nombre);
          setDireccion(result.direccion || '');  
          setDescripcionGeneral(result.descripcion || '');  
          setEspecialidades(result.especialidades || []);  
          setServicios(result.serviciosOfrecidos || []);  
          setImagenPerfil(result.foto || null);
        } else {
          Alert.alert('Error', result.msg || 'Error al cargar el perfil.');
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        Alert.alert('Error', 'Ocurrió un error al cargar el perfil.');
      }
    };

    cargarPerfil();
  }, []); 

  const guardarPerfil = async () => {
    try {
      if (
        !nombre.trim() ||
        !direccion.trim() ||
        !descripcionGeneral.trim() ||
        especialidades.length === 0 ||
        servicios.length === 0
      ) {
        Alert.alert('Error', 'Por favor completa todos los campos antes de guardar.');
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
        direccion,
        descripcionGeneral,
        especialidades,
        servicios,
        fotoBase64: imagenBase64,
        modificado: 'Si',
      };

      const storedUser = await AsyncStorage.getItem('userData');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const uid = parsedUser?.uid;

      if (!uid) {
        Alert.alert('Error', 'No se pudo obtener el UID del usuario.');
        return;
      }

      const response = await fetch(`https://fixup-backend.onrender.com/perfil/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(perfilData),
      });

      const resultado = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Perfil guardado correctamente.');
      } else {
        console.error('Error del servidor:', resultado);
        Alert.alert('Error', resultado.msg || 'Error al guardar perfil.');
      }
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar el perfil.');
    }
  };



  const toggleEspecialidad = (opcion: string) => {
    setEspecialidades((prev) =>
      prev.includes(opcion)
        ? prev.filter((item) => item !== opcion)
        : [...prev, opcion]
    );
  };

  const agregarServicio = () => {
    if (!nuevoServicio.trim() || !nuevaDescripcion.trim()) return;

    if (servicioSeleccionado) {
      setServicios((prev) =>
        prev.map((s) =>
          s.nombre === servicioSeleccionado
            ? { nombre: nuevoServicio.trim(), descripcion: nuevaDescripcion.trim() }
            : s
        )
      );
      setServicioSeleccionado(null);
    } else {
      setServicios((prev) => [
        ...prev,
        { nombre: nuevoServicio.trim(), descripcion: nuevaDescripcion.trim() },
      ]);
    }

    setNuevoServicio('');
    setNuevaDescripcion('');
  };

  const eliminarServicio = () => {
    if (!servicioSeleccionado) return;
    Alert.alert(
      'Eliminar Servicio',
      `¿Deseas eliminar "${servicioSeleccionado}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setServicios((prev) =>
              prev.filter((s) => s.nombre !== servicioSeleccionado)
            );
            setServicioSeleccionado(null);
            setNuevoServicio('');
            setNuevaDescripcion('');
          },
        },
      ]
    );
  };

  const seleccionarServicio = (nombre: string | null) => {
    setServicioSeleccionado(nombre);
    if (nombre === null) {
        setNuevoServicio('');
        setNuevaDescripcion('');
        return;
    }
    const servicio = servicios.find((s) => s.nombre === nombre);
    if (servicio) {
        setNuevoServicio(servicio.nombre);
        setNuevaDescripcion(servicio.descripcion);
    }
 };

  const cambiarFotoPerfil = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para cambiar la foto.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!resultado.canceled) {
      setImagenPerfil(resultado.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.flechaVolver} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Editar Perfil</Text>

      <TouchableOpacity style={styles.perfilFotoContainer} onPress={cambiarFotoPerfil}>
        <Image
          source={imagenPerfil ? { uri: imagenPerfil } : require('../../assets/images/icon.png')}
          style={styles.perfilFoto}
        />
        <Text style={styles.cambiarFotoTexto}>Cambiar Foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
        placeholder="Dirección"
        placeholderTextColor="#888"
      />

      <Text style={styles.seccionTitulo}>Especialidades</Text>
      {especialidadesOpciones.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxItem}
          onPress={() => toggleEspecialidad(item)}
        >
          <Feather
            name={especialidades.includes(item) ? 'check-square' : 'square'}
            size={20}
            color="white"
          />
          <Text style={styles.checkboxLabel}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.seccionTitulo}>Descripción General</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
        value={descripcionGeneral}
        onChangeText={setDescripcionGeneral}
        placeholder="Habla sobre tu experiencia, años de trabajo, etc."
        placeholderTextColor="#888"
      />

      <Text style={styles.seccionTitulo}>Servicios Ofrecidos</Text>
      {servicios.map((servicio, index) => (
        <View key={index} style={styles.servicioItem}>
          <Text style={styles.servicioNombre}>{servicio.nombre}</Text>
          <Text style={styles.servicioDescripcion}>{servicio.descripcion}</Text>
        </View>
      ))}

      {servicios.length > 0 && (
        <>
          <Text style={styles.seccionTitulo}>Seleccionar para editar/eliminar</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={servicioSeleccionado}
              onValueChange={(itemValue) => seleccionarServicio(itemValue)}
              style={styles.picker}
              dropdownIconColor="white"
            >
              <Picker.Item label="Selecciona un servicio" value={null} />
              {servicios.map((s, index) => (
                <Picker.Item key={index} label={s.nombre} value={s.nombre} />
              ))}
            </Picker>
          </View>

          <View style={styles.botonesEdicion}>
            <TouchableOpacity style={styles.botonEliminar} onPress={eliminarServicio}>
              <Text style={styles.botonGuardarTexto}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TextInput
        style={styles.input}
        value={nuevoServicio}
        onChangeText={setNuevoServicio}
        placeholder="Nombre del nuevo servicio"
        placeholderTextColor="#888"
      />

      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
        multiline
        value={nuevaDescripcion}
        onChangeText={setNuevaDescripcion}
        placeholder="Descripción del nuevo servicio"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.botonAgregar} onPress={agregarServicio}>
        <Text style={styles.botonAgregarTexto}>
          {servicioSeleccionado ? 'Modificar Servicio' : 'Agregar Servicio'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarPerfil}>
        <Text style={styles.botonGuardarTexto}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
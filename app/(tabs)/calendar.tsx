import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../style/styleCalendario';
import CustomTabBar from './CustomTabBar';

export default function CalendarioScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [evento, setEvento] = useState('');
  const [eventos, setEventos] = useState<{ [key: string]: string[] }>({});

  const citasEstaticas = [
    { fecha: '2025-06-15', texto: 'Revisión de fontanería - 10:00 AM' },
    { fecha: '2025-06-18', texto: 'Cita con técnico eléctrico - 2:30 PM' },
    { fecha: '2025-06-20', texto: 'Instalación de aire acondicionado - 9:00 AM' },
  ];

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const guardarEvento = () => {
    if (evento.trim()) {
      setEventos(prev => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), evento],
      }));
    }
    setEvento('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Calendario</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...Object.keys(eventos).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: '#3B99A3' };
            return acc;
          }, {} as any),
        }}
        theme={{
          calendarBackground: '#191F24',
          dayTextColor: '#fff',
          monthTextColor: '#3B99A3',
          arrowColor: '#3B99A3',
          todayTextColor: '#3B99A3',
          textDisabledColor: '#555',
        }}
      />

      {selectedDate && eventos[selectedDate] && (
        <View style={styles.eventosContainer}>
          <Text style={styles.eventosTitulo}>Eventos para {selectedDate}</Text>
          <FlatList
            data={eventos[selectedDate]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.eventoTexto}>• {item}</Text>}
          />
        </View>
      )}

        <View style={{ height: 280 }}>
        <FlatList
            data={citasEstaticas}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
            <View style={styles.citaCard}>
                <Text style={styles.citaFecha}>{item.fecha}</Text>
                <Text style={styles.citaTexto}>{item.texto}</Text>
            </View>
            )}
        />
        </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Nueva Cita para {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe la cita"
              placeholderTextColor="#aaa"
              value={evento}
              onChangeText={setEvento}
            />
            <TouchableOpacity style={styles.botonGuardar} onPress={guardarEvento}>
              <Text style={styles.botonGuardarTexto}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonCancelar} onPress={() => setModalVisible(false)}>
              <Text style={styles.botonCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomTabBar />
    </View>
  );
}

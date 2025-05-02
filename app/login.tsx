
// login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style/styleinicio';
import { Feather } from '@expo/vector-icons'; // Íconos

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'cliente' | 'tecnico'>('cliente');

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo-FixUp.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setMode('login')}>
          <Text style={[styles.tabText, mode === 'login' && styles.activeTabText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('signup')}>
          <Text style={[styles.tabText, mode === 'signup' && styles.activeTabText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {mode === 'signup' && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Cliente" value="cliente" />
            <Picker.Item label="Técnico" value="tecnico" />
          </Picker>
        </View>
      )}

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => {
          if (mode === 'login') {
            // Podés poner validación aquí si querés
            navigation.navigate('Inicio');
          } else {
            // lógica de Sign Up si hace falta
            console.log('Registrarse...');
          }
        }}
      >
        <Text style={styles.mainButtonText}>
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>


      {mode === 'login' && (
        <TouchableOpacity>
          <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

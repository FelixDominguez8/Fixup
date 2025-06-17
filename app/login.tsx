import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style/styleinicio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

let emailTimeout: NodeJS.Timeout;
let passwordTimeout: NodeJS.Timeout;

export default function LoginScreen() {
  const router = useRouter();
  const navigation = useNavigation<any>();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'cliente' | 'tecnico'>('cliente');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (emailTimeout) clearTimeout(emailTimeout);
    emailTimeout = setTimeout(() => {
      setEmailError(email.length > 0 && !emailRegex.test(email));
    }, 1000);
    return () => clearTimeout(emailTimeout);
  }, [email]);

  useEffect(() => {
    if (passwordTimeout) clearTimeout(passwordTimeout);
    passwordTimeout = setTimeout(() => {
      setPasswordError(password.length > 0 && password.length < 6);
    }, 1000);
    return () => clearTimeout(passwordTimeout);
  }, [password]);

  const validateInputs = (): boolean => {
    const isEmailValid = email.trim() !== '' && emailRegex.test(email);
    const isPasswordValid = password.trim() !== '' && password.length >= 6;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (!isEmailValid || !isPasswordValid) {
      Alert.alert('Datos inválidos', 'Revisa los campos marcados en rojo.');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await fetch('https://fixup-backend.onrender.com/logIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Error en el login');
  
      await AsyncStorage.setItem('userData', JSON.stringify({
        uid: data.uid,
        email: data.email,
        userType: data.tipo, 
      }));
  
      if (data.tipo === 'cliente') {
        router.push('/(tabs)/inicio');
      } else {
        router.push('/(tabs)/inicioTecnico');
      }
    } catch (error: any) {
      Alert.alert('Error de inicio de sesión', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await fetch('https://fixup-backend.onrender.com/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, password, tipo: userType }), 
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Error al registrarse');

      await AsyncStorage.setItem('userData', JSON.stringify({
        uid: data.uid,
        email: data.email,
        userType, 
      }));

      Alert.alert('¡Registro exitoso!', 'Ya puedes iniciar sesión.');
      setMode('login');
    } catch (error: any) {
      Alert.alert('Error de registro', error.message);
    } finally {
      setLoading(false);
    }
  };

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
        style={[styles.input, emailError && { borderColor: 'red', borderWidth: 1 }]}
        placeholder={emailError ? 'Correo inválido' : 'Correo'}
        placeholderTextColor={emailError ? 'red' : '#999'}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={[styles.passwordContainer, passwordError && { borderColor: 'red', borderWidth: 1 }]}>
        <TextInput
          style={styles.passwordInput}
          placeholder={passwordError ? 'Mínimo 6 caracteres' : 'Contraseña'}
          placeholderTextColor={passwordError ? 'red' : '#999'}
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
        onPress={mode === 'login' ? handleLogin : handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.mainButtonText}>
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </Text>
        )}
      </TouchableOpacity>

      {mode === 'login' && (
        <TouchableOpacity>
          <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

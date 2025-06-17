// styleservicios.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191F24',
    padding: 20,
  },
  flecha: {
    marginBottom: 10,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Montserrat',
    marginBottom: 20,
  },
  botonServicio: {
    backgroundColor: '#121518',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  
  contenidoServicio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  iconoYTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textoServicio: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginLeft: 12,
    flex: 1,
  },  
  flechaVolver: {
    marginBottom: 10,
  },
});

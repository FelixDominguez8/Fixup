import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titulo: {
    marginTop: 40,
    color: 'white',
    fontSize: 28,
    fontFamily: 'Montserrat',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#191F24',
    padding: 20,
  },
  tecnicoCard: {
    backgroundColor: '#191F24',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    borderColor: '#3B99A3',
    borderWidth: 2,
  },
  tecnicoImagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    paddingRight: 12,
  },
  tecnicoNombre: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat',
  },
  tecnicoDetalles: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
    headerChat: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  burbujaMensaje: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  mensajeIzquierda: {
    backgroundColor: '#121518',
    alignSelf: 'flex-start',
  },
  mensajeDerecha: {
    backgroundColor: '#3B99A3',
    alignSelf: 'flex-end',
  },
  textoMensaje: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  horaMensaje: {
    fontSize: 10,
    color: '#ccc',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121518',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
  },
  inputMensaje: {
    flex: 1,
    color: 'white',
    fontFamily: 'Montserrat',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  flechaVolver: {
    marginBottom: 10,
  },
});

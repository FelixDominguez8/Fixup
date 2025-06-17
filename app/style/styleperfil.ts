import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191F24',
    padding: 20,
  },
  titulo: {
    marginTop: 20,
    color: 'white',
    fontSize: 28,
    fontFamily: 'Montserrat',
    marginBottom: 20,
  },
  bloquePerfil: {
    backgroundColor: '#121518',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  imagenPerfil: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  nombreUsuario: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat',
    marginBottom: 12,
  },
  botonEditar: {
    backgroundColor: '#3B99A3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonEditarTexto: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  seccionTitulo: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginBottom: 10,
  },
  botonSeccion: {
    backgroundColor: '#121518',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  iconoSeccion: {
    marginRight: 10,
  },
  textoSeccion: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  botonConfiguracion: {
    backgroundColor: '#121518',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
});

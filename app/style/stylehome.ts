import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  saludo: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  titulo: {
    color: '#3B99A3',
    fontSize: 20,
    fontFamily: 'Montserrat',
    marginBottom: 16,
    maxWidth: '60%',
  },
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  iconoBusqueda: {
    marginRight: 8,
  },
  inputBusqueda: {
    flex: 1,
    color: 'white',
    fontFamily: 'Montserrat',
    paddingVertical: 10,
  },
  seccionTitulo: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginVertical: 10,
  },
  serviciosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  servicioBtn: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    width: '48%',
    marginVertical: 6,
    alignItems: 'center',
  },
  servicioTexto: {
    color: 'white',
    fontFamily: 'Montserrat',
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
  },
  tecnicoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  tecnicoImagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  tecnicoInfo: {
    marginLeft: 8,
  },
  tecnicoNombre: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  tecnicoDetalles: {
    color: '#ccc',
    fontSize: 13,
    fontFamily: 'Montserrat',
  },
  tecnicoPuntaje: {
    position: 'absolute',
    top: 12,
    right: 12,
    color: '#3B99A3',
    fontWeight: 'bold',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botonAccion: {
    backgroundColor: '#3B99A3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    flex: 1,
  },
});

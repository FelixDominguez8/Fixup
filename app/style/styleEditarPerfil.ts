// styleEditarPerfil.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191F24',
    padding: 20,
  },
  flechaVolver: {
    marginBottom: 10,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Montserrat',
    marginBottom: 30,
  },
  perfilFotoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  perfilFoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cambiarFotoTexto: {
    color: '#3B99A3',
    fontFamily: 'Montserrat',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#121518',
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  seccionTitulo: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121518',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxLabel: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 14,
    marginLeft: 10,
  },
  servicioItem: {
    backgroundColor: '#121518',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  servicioNombre: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 16,
    marginBottom: 6,
  },
  servicioDescripcion: {
    color: '#ccc',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  botonAgregar: {
    backgroundColor: '#3B99A3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  botonAgregarTexto: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  botonGuardar: {
    backgroundColor: '#3B99A3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  botonGuardarTexto: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
    pickerContainer: {
    backgroundColor: '#121518',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    color: 'white',
    fontFamily: 'Montserrat',
  },
  botonesEdicion: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  botonEliminar: {
    backgroundColor: '#D9534F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },

});

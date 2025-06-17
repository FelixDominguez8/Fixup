import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191F24',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    titulo: {
        marginTop: 40,
        color: 'white',
        fontSize: 28,
        fontFamily: 'Montserrat',
        marginBottom: 20,
        alignSelf: 'center'
    },
    flechaVolver: {
        marginBottom: 10,
    },
    eventosContainer: {
        marginTop: 20,
        backgroundColor: '#121518',
        padding: 16,
        borderRadius: 12,
    },
    eventosTitulo: {
        color: '#fff',
        fontFamily: 'Montserrat',
        fontSize: 16,
        marginBottom: 8,
    },
    eventoTexto: {
        color: '#ccc',
        fontFamily: 'Montserrat',
        fontSize: 14,
        marginBottom: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
    },
    modalContenido: {
        backgroundColor: '#121518',
        padding: 20,
        borderRadius: 10,
    },
    modalTitulo: {
        color: '#3B99A3',
        fontSize: 18,
        fontFamily: 'Montserrat',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#191F24',
        color: 'white',
        fontFamily: 'Montserrat',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 12,
    },
    botonGuardar: {
        backgroundColor: '#3B99A3',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    botonGuardarTexto: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: 16,
    },
    botonCancelar: {
        alignItems: 'center',
    },
    botonCancelarTexto: {
        color: '#aaa',
        fontFamily: 'Montserrat',
    },
    seccionTitulo: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat',
        marginVertical: 16,
    },

    citaCard: {
        backgroundColor: '#121518',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },

    citaFecha: {
        color: '#3B99A3',
        fontSize: 14,
        fontFamily: 'Montserrat',
        marginBottom: 6,
    },

    citaTexto: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Montserrat',
    },

});

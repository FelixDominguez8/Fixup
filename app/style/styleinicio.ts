import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 40,
    },
    tabs: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 30,
    },
    tabText: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Montserrat',
        paddingBottom: 4,
    },
    activeTabText: {
        color: '#3B99A3',
        borderBottomWidth: 2,
        borderBottomColor: '#3B99A3',
    },
    input: {
        width: '100%',
        paddingLeft: 20,
        backgroundColor: '#F2F2F2',
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
        fontFamily: 'Montserrat',
    },
    mainButton: {
        width: '100%',
        backgroundColor: '#3B99A3',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    mainButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
    },
    forgotText: {
        color: '#3B99A3',
        fontSize: 14,
        fontFamily: 'Montserrat',
        textAlign: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#000',
    },
    eyeIcon: {
        padding: 8,
    },
    pickerContainer: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: Platform.OS === 'ios' ? 180 : 50,
        color: '#000',
        fontSize: 16,
        fontFamily: 'Montserrat',
        paddingHorizontal: 10,
    },
  
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: '#191F24', 
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    borderColor: '#3B99A3', 
    borderWidth: 2,
  },
});

import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  smallText: {
    fontSize: 11,
    marginTop: 40,
    fontStyle: 'italic'
  },
  formInputGroup: {
    marginBottom: 15,
    width: '100%'
  },
  formInput: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
  },
  btnStyle: {
    borderWidth: .5,
    borderColor: '#111D4A',
    backgroundColor: '#111D4A',
    borderRadius: 8,
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default Styles;
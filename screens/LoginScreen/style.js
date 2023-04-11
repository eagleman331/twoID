import { StyleSheet } from 'react-native';
import Colors from '../../constant/Colors';

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.ufoGreen
  },
  inputContainer: {
      width:300,
      marginTop:30
  },
  button: {
      width:200,
      marginTop:10,
      borderRadius:5
  },
  buttonRegister:{
    width:200,
      marginTop:10,
      borderRadius:5,
      marginTop:10,
      borderWidth:1
  }
});

export default styles;
import { useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { funtionsContext } from "../Context/funtionsContext";
import ChooseImage from "./ImagePicker";

export default function Input({setTask,task,createTask,icon,setIcon}) {
  return (
    <View style={styles.container}>
      <ChooseImage icon={icon} setIcon={setIcon}/>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={e=>setTask(e)} value={task} />
        <Pressable style={styles.inputButton} onPress={createTask}>
        <Text>+</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    inputContainer:{
        width:'60%',
        height:30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    container:{
        width:'100%',
        height:100,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    input:{
      width:'100%',
      height:30,
      borderRadius:10,
      paddingLeft:10,
      backgroundColor:'#ccc',
    },
    inputButton:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green',
        borderRadius:15,
    }
  });
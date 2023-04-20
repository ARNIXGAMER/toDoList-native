import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({setTask,task,createTask}) {
  return (
    <View style={styles.inputContainer}> 
      <TextInput style={styles.input} onChangeText={e=>setTask(e)} value={task} />
      <Pressable style={styles.inputButton} onPress={createTask}>
        <Text>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    inputContainer:{
        width:'100%',
        height:60,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    input:{
      width:'70%',
      height:30,
      backgroundColor:'#ccc',
    },
    inputButton:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green',
    }
  });
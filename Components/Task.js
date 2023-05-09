import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { funtionsContext } from "../Context/funtionsContext";
import Button from "./Button";
import Input from "./Input";
import { Link, Navigator } from "expo-router";
import { set } from "react-hook-form";


export default function Task ({title, done, id}) {
    const { deleteTask , editabledTask , setEditabledTask, editTask , setDoneTask} = useContext(funtionsContext);
    const [editMode,setEditMode] = useState(false)
    const InputEdit = () =>{
      editTask(id)
      setEditMode(!editMode)
    }
    const handleEdit = () =>{
      setEditMode(!editMode)
      setEditabledTask(title)
    }
    
    return (
      <View style={styles.taskContainer}>
        {editMode ? <Input setTask={setEditabledTask} task={editabledTask} createTask={InputEdit} /> : <Link href={{pathname: `/${id}`, params:{title,done,id}}} ><Text>{title}</Text></Link>}
        <View style={styles.buttons}>

        {!editMode ? <Button onPress={()=>editTask(id)} label={done ? 'o' : 'x'}/> : ''}
        {editMode ? <Button onPress={()=>setEditMode(!editMode)} label={'Cancel'}/> : ''}
        {!editMode ? <Button onPress={()=>deleteTask(id)} label={'Delete'}/> : ''}
        {!editMode ? <Button onPress={handleEdit} label={'Edit'}/> : ''}
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    taskContainer:{
        flexDirection:'column',
        backgroundColor: '#ccc',
        gap: 5,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:140,
        marginVertical: 10,
        borderRadius: 15
    },
    buttons:{
        flexDirection: 'row',
        width:'100%',
        height:'auto',
        justifyContent:'center',
        alignItems:'center',

    }
})
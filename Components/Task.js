import { Image, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { funtionsContext } from "../Context/funtionsContext";
import Button from "./Button";
import Input from "./Input";
import { Link, Navigator } from "expo-router";


export default function Task ({title, icon, done, id}) {
    const { deleteTask , editabledTask , setEditabledTask, editTask, editIcon, setEditIcon} = useContext(funtionsContext);
    const [editMode,setEditMode] = useState(false)
    const InputEdit = () =>{
      editTask(id)
      setEditIcon(icon)
      setEditMode(!editMode)
    }
    const handleEdit = () =>{
      setEditMode(!editMode)
      setEditabledTask(title)
    }
    
    return (
      <View style={styles.taskContainer}>
        {!editMode ? <img src={icon} style={styles.image} /> : ''}
        {editMode ? <Input setTask={setEditabledTask} task={editabledTask} createTask={InputEdit} icon={editIcon} setIcon={setEditIcon} /> : <Link href={{pathname: `/${id}`, params:{title,done,icon}}} ><Text>{title}</Text></Link>}
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
        backgroundColor: '#aaa',
        gap: 5,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:200,
        marginVertical: 10,
        borderRadius: 15
    },
    buttons:{
        flexDirection: 'row',
        width:'100%',
        height:'auto',
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
      width:50,
      height:50,
      borderRadius: 18,
  }
})
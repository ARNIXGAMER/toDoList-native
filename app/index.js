import "expo-router/entry";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { funtionsContext } from "../Context/funtionsContext";
import Input from "../Components/Input";
import List from "../Components/List";
import { Link, Stack } from "expo-router";
import {
  createTaskDb,
  deleteTaskDb,
  findTasksDb,
  updateTaskDb,
} from "../DataBase/createData";
import getUser from "../DataBase/getUser";
import { v4 as uuid } from "uuid";
import Button from "../Components/Button";

export default function App() {
  const user = getUser()
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editabledTask, setEditabledTask] = useState("");
  const [icon,setIcon] = useState(null)
  const [editIcon,setEditIcon] = useState(null)
  const [userData,setUserData] = useState(user)

  const createTask = () => {
    if(user?.uid){
      const newtask = { title: task, icon, done: false, userId: user.uid, id: uuid() }
      setTasks([...tasks,newtask])
      createTaskDb(newtask);
      setTask("");
      setIcon("");
    }else{
      alert("You need an account to create tasks")
    }
    setTimeout(()=>{
      updateTasks();
    },3000)
  };
  const deleteTask = (taskId) => {
    deleteTaskDb(taskId);
    setTasks(tasks.filter(task =>{
      return task.id !== taskId
    }))
    setTimeout(()=>{
      updateTasks();
    },3000)
  };
  const editTask = (taskId) => {
    const updateTasksArry = tasks.map((task) =>{
      if(task.id === taskId){
        return {...task,
          title: editabledTask ? editabledTask : task.title,
          icon: editIcon ? editIcon : task.icon,
          done: !editabledTask ? !task.done : task.done
        }
      }else{
        return task
      }
    });
    const toUpdateTasks = updateTasksArry.filter(task => task.id === taskId)
    setTasks(updateTasksArry)
    updateTaskDb(taskId,toUpdateTasks[0]);
    setEditabledTask("");
    setIcon(null);
    setTimeout(()=>{
      updateTasks()
    },3000)
  };
  const updateTasks = async () => {
    setTasks(await findTasksDb(user?.uid));
  };
  console.log(tasks, user,icon);
  useEffect(() => {
      if(user?.uid){
        updateTasks()
      }
  }, []);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <funtionsContext.Provider
        value={{
          createTask,
          deleteTask,
          editTask,
          task,
          setTask,
          tasks,
          editabledTask,
          setEditabledTask,
          setIcon,
          icon,
          setEditIcon,
          editIcon
        }}
      >
        {!user ? <View style={styles.auth}>
          <Link style={styles.button} href={"/Auth"}>Login</Link>
          <Link style={styles.button} href={"/Auth/signUp"}>SignUp</Link>
        </View> : ''}
        <h1>To Do List</h1>
        <Input task={task} setTask={setTask} createTask={createTask} />
        <Button onPress={() => updateTasks()} label={"Actualizar"} />
        <List tasks={tasks} />
        <StatusBar style="auto" />
      </funtionsContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  auth:{
    display:"flex",
    flexDirection:"row  ",
    width:"30%"
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
}
});

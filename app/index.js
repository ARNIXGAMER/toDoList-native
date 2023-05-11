import "expo-router/entry";
import "../messaging_init_in_sw";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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
import { pushPermission, pushToken, reciveMessage } from "../services/pushNotification";

export default function App() {
  const user = getUser();
  const [task, setTask] = useState("");
  const [editabledTask, setEditabledTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const createTask = () => {
    const newtask = { title: task, done: false, userId: user.uid, id: uuid() }
    setTasks([...tasks,newtask])
    createTaskDb(newtask);
    setTask("");
  };
  const deleteTask = (taskId) => {
    deleteTaskDb(taskId);
    setTasks(tasks.filter(task =>{
      return task.id !== taskId
    }))
  };
  const editTask = (taskId) => {
    const updateTasks = tasks.map((task) =>{
      if(task.id === taskId){
        return {...task,
          title: editabledTask ? editabledTask : task.title,
          done: !editabledTask ? !task.done : task.done
        }
      }else{
        return task
      }
    });
    const toUpdateTasks = updateTasks.filter(task => task.id === taskId)
    setTasks(updateTasks)
    updateTaskDb(taskId,toUpdateTasks[0]);
    setEditabledTask("");
  };
  const updateTasks = async () => {
    setTasks(await findTasksDb(user?.uid));
  };
  console.log(tasks, user);
  useEffect(() => {
    updateTasks();
    //pushPermission()
    if(user){
      //pushToken()
    }
  }, [user]);
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
        }}
      >
        {!user ? <View style={styles.auth}>
          <Link style={styles.button} href={"/Auth"}>Login</Link>
          <Link style={styles.button} href={"/Auth/signUp"}>SignUp</Link>
        </View> : ''}
        <Text>To Do List</Text>
        <Input task={task} setTask={setTask} createTask={createTask} />
        {user ? user.uid : "No logged"}
        <Button onPress={() => updateTasks()} label={"Refresh tasks"} />
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

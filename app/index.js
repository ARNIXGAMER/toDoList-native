import "expo-router/entry";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { funtionsContext } from "../Context/funtionsContext";
import Input from "../Components/Input";
import List from "../Components/List";
import { Link, Navigator, Redirect, Stack } from "expo-router";
import { createTaskDb, findTasksDb } from "../DataBase/createData";
import getUser from "../DataBase/getUser";

export default function App() {
  const user = getUser()
  const [task, setTask] = useState("");
  const [editabledTask, setEditabledTask] = useState("");
  const [tasks, setTasks] = useState([])

  const createTask = () => {
    setTask("");
    createTaskDb({ title: task, done: false, userId:user.uid });
    updateTasks()
  };
  const deleteTask = (id) => {

  };
  const editTask = (id) => {
    
    setEditabledTask("");
  };
  const completeTask = (id) => {
    
  };
  const updateTasks = async() =>{
    setTasks(await findTasksDb(user?.uid))
  }
console.log(tasks,user)
  useEffect(()=>{
    updateTasks()
  },[user])
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
          completeTask,
        }}
      >
        <Text>To Do List</Text>
        <Input task={task} setTask={setTask} createTask={createTask} />
        <List tasks={tasks} />
        <Link href={"/auth"}>Go to login</Link>
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
});

import "expo-router/entry";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { funtionsContext } from "../Context/funtionsContext";
import Input from "../Components/Input";
import List from "../Components/List";
import { Stack } from "expo-router";
import { createTaskDb, deleteTaskDb, findTasksDb, updateTaskDb } from "../DataBase/createData";
import getUser from "../DataBase/getUser";
import { v4 as uuid } from "uuid";
import Button from "../Components/Button";

export default function App() {
  const user = getUser()
  const [task, setTask] = useState("");
  const [editabledTask, setEditabledTask] = useState("");
  const [tasks, setTasks] = useState([])

  const createTask = () => {
    createTaskDb({ title: task, done: false, userId:user.uid,id:uuid() });
    updateTasks()
    setTask("");
  };
  const deleteTask = (taskId) => {
    deleteTaskDb(taskId)
    updateTasks()
  };
  const editTask = (taskId) => {
    const oldTask = tasks.filter(task => task.id === taskId)
    updateTaskDb(taskId,{title:editabledTask},oldTask[0])
    setEditabledTask("");
    updateTasks();
  };
  const updateTasks = async() =>{
    setTasks(await findTasksDb(user?.uid))
  }
console.log(tasks,user)
  useEffect(()=>{
    updateTasks()
  },[])
  return (
    <View style={styles.container}>
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
        <Text>To Do List</Text>
        <Input task={task} setTask={setTask} createTask={createTask} />
        {user ? user.uid : 'No logged'}
        <Button onPress={()=>updateTasks()} label={'Refresh tasks'}/>
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
});

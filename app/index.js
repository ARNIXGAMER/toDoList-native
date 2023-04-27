import "expo-router/entry";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { funtionsContext } from "../Context/funtionsContext";
import Input from "../Components/Input";
import List from "../Components/List";
import Button from "../Components/Button";
import { Link, Stack } from "expo-router";

export default function App() {
  const [task, setTask] = useState("");
  const [editabledTask, setEditabledTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const createTask = () => {
    setTasks([...tasks, { title: task, done: false, id: tasks.length }]);
    setTask("");
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const editTask = (id) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: editabledTask || task.title,
          };
        }else{
          return task
        }
      });
      return newTasks;
    });
    setEditabledTask('')
  };
  const completeTask = (id) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          };
        }else{
          return task
        }
      });
      return newTasks;
    });
  }
  console.log(tasks)
  return (
    <View style={styles.container}>
        <Stack.Screen options={{
            title:"Home"
        }} />
      <funtionsContext.Provider value={{
        createTask,
        deleteTask,
        editTask,
        task,
        setTask,
        tasks,
        setTasks,
        editabledTask,
        setEditabledTask,
        completeTask
      }}>
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
    paddingHorizontal: 15
  },
});

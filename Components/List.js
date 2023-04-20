import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native";
import Task from "./Task";

export default function List({tasks}) {
  return (
    <View style={styles.TaskListContainer}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Task title={item.title} done={item.done} id={item.id} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    TaskListContainer:{
        width:'100%',
        height:'100%',
    }
})

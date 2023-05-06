import List from "../Components/List";
import { useSearchParams } from "expo-router";
import { findTasksDb } from "../DataBase/createData";
import { View } from "react-native-web";

export default function renderTasks(){
    
    return (
        <View>
            <List/>
        </View>
    )
}
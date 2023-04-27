import List from "../Components/List";
import { useSearchParams } from "expo-router";

export default function renderTasks(){
    const {tasks} = useSearchParams()
    return (
        <List tasks={tasks}/>
    )
}
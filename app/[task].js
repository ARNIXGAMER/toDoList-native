import { useSearchParams, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function task(){
    const {title,done, id} = useSearchParams();
    return (
        <View>
            <Stack.Screen options={{
                title: `Tarea: ${title}`
            }}/>
            <Text>{title}</Text>
            <Text>Done:{done}</Text>
            <Text>Id: {id}</Text>
        </View>
    )
}
import { useSearchParams, Stack } from "expo-router";
import { Image, Text, View } from "react-native";

export default function task(){
    const {title,done, id,icon,alt,token} = useSearchParams();
    console.log(icon,alt,token)
    return (
        <View>
            <Stack.Screen options={{
                title: `Tarea: ${title}`
            }}/>
            <Text>Title: {title}</Text>
            <Text>Done:{done}</Text>
            <Text>Id: {id}</Text>
            <img src={icon} style={{width:100,height:100}} />
        </View>
    )
}
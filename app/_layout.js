import { Link , Tabs, Stack } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function tabLayout(){
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon:()=> <FontAwesome name="home" size={24} color="black" />,
                    href:{
                        pathname:"."
                    },
                    title:"Home",
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    tabBarIcon: ()=><FontAwesome5 name="tasks" size={24} color="black" />,
                    href:{
                        pathname:"/tasks",
                        params:{}
                    },
                    title:"Tasks"
                }}
            />
        </Tabs>
        );
}
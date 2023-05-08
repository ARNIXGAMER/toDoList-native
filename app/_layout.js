import { Link , Tabs, Stack } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


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
                name="Auth/index"
                options={{
                    tabBarIcon: ()=><AntDesign name="login" size={24} color="black" />,
                    href:{
                        pathname:"/Auth/",
                        params:{}
                    },
                    title:"Login"
                }}
            />
            <Tabs.Screen
                name="/Auth/signUp"
                options={{
                    tabBarIcon: ()=><Ionicons name="md-person-add-outline" size={24} color="black" />,
                    href:{
                        pathname:"/Auth/signUp",
                    },
                    title:"SignUp"
                }}
            />
        </Tabs>
        );
}
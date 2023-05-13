import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Stack, useNavigation, useRouter } from "expo-router";
import { signInWithEmailAndPassword,getAuth } from "firebase/auth";
import createData, { findUser } from "../../DataBase/createData";

export default function App() {
  const navigation = useNavigation();
  const router = useRouter()
  const auth = getAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async(data) => {
    if (data.email !== "" && data.password !== "") {
      try {
        const validate = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        )
        if (validate.user.accessToken) {
          alert("Acceso permitido");
          navigation.goBack()
        } else {
          
        }
      } catch (error) {
        alert("Datos incorrectos");
        console.log(error);
      }
    }
  };

  return (
    <View>
      <Stack.Screen options={{
        title:"Login"
      }}/>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

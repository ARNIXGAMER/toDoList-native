import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import createData from "../../DataBase/createData";

export default function App() {
  const navigation = useNavigation();
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
  const onSubmit = async (data) => {
    if (data.email !== "" && data.password !== "") {
      try {
        const validate = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
          console.log(validate)
        if (validate.user.accessToken) {
          alert("Usuario creado con existo");
          navigation.navigate("/auth");
        }
      } catch (error) {
        alert("Datos incorrectos o el usuario ya existe");
        console.log(error);
      }
    }
  };

  return (
    <View>
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

      <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

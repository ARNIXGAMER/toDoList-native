import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "./Button";
import ImageComponent from "./ImageComponet";


const defaultImg = require("../assets/icon.png")
export default function ChooseImage({icon,setIcon}) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);
    
    if (!result.canceled) {
      setIcon(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Button label={"Select image"} onPress={pickImage} />
      </View>
      <View>
        <ImageComponent uri={icon} defaultImage={defaultImg} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width:250,
    height:100,
    alignItems: "center",
  },
  footerContainer: {
    alignItems: "center",
  },
});

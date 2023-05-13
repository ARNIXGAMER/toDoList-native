import { Image , StyleSheet } from "react-native"

export default function ImageComponent ({uri, defaultImage}) {
      return <Image source={uri ? uri : defaultImage} style={styles.image} />;
}

const styles = StyleSheet.create({
    image:{
        width:100,
        height:100,
        borderRadius: 18,
    }
})
import { Pressable, Text } from "react-native"

export default function Button ({onPress,label}) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Text>{label}</Text>
    </Pressable>
  )
}

const styles = {
    button: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        borderColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    }

}

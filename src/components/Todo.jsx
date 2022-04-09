import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AppText from "./ui/AppText";

const Todo = ({todo, onRemove, onOpen}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onOpen(todo.id)}
            onLongPress={onRemove.bind(null, todo.id)}
        >
            <View style={styles.todo}>
                <AppText style={styles.title}>
                    {todo.title}
                </AppText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eeeeee',
        borderRadius: 5,
        marginBottom: 10,
    },
    title: {
    }
})

export default Todo;
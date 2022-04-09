import {View, StyleSheet, TextInput, Alert, Keyboard} from "react-native";
import {useState} from "react";
import {THEME} from "../theme";
import {AntDesign} from '@expo/vector-icons';

const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('');
    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Название дела не может быть пустым')
        }
    }
    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder='Введите название дела'
                autoCorrect={false}
                autoCapitalize='none'
            />
            <AntDesign.Button name='pluscircleo' onPress={pressHandler}>
                Добавить
            </AntDesign.Button>
            {/*<Button title='Добавить' onPress={pressHandler}/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,

    },
    input: {
        width: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
    }
})

export default AddTodo;
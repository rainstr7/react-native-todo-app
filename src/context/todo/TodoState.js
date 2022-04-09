import TodoContext from './todoContext'
import {useContext, useReducer} from "react";
import todoReducer from "./todoReducer";
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";
import ScreenContext from "../screen/screenContext";
import {Alert} from "react-native";
import {Http} from "../../http";

const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    };
    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async (title) => {
        clearError();
        try {
            const data = await Http.post('https://rn-todo-app-3482a-default-rtdb.firebaseio.com/todos.json',
                {title}
            );
            dispatch({type: ADD_TODO, id: data.name});
        } catch (e) {
            showError('Что-то пошло не так...');
        }
    }

    const removeTodo = (id) => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить ${todo.title}`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: async () => {
                        changeScreen(null);
                        clearError();
                        try {
                            await Http.delete(`https://rn-todo-app-3482a-default-rtdb.firebaseio.com/todos/${id}.json`)
                            dispatch({type: REMOVE_TODO, id});
                        } catch (e) {
                            showError('Что-то пошло не так...');
                        }
                    }
                }
            ],
            {cancelable: false}
        )
    };

    const updateTodo = async (id, title) => {
        clearError();
        try {
            await Http.patch(`https://rn-todo-app-3482a-default-rtdb.firebaseio.com/todos/${id}.json`, {title})
            dispatch({type: UPDATE_TODO, id, title})
        } catch (e) {
            showError('Что-то пошло не так...');
            console.log(e);
            throw e;
        }
    };

    const showLoader = () => dispatch({type: SHOW_LOADER});
    const hideLoader = () => dispatch({type: HIDE_LOADER});
    const showError = (error) => dispatch({type: SHOW_ERROR, error});
    const clearError = () => dispatch({type: CLEAR_ERROR});

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            const data = await Http.get('https://rn-todo-app-3482a-default-rtdb.firebaseio.com/todos.json');
            const todos = Object.keys(data).map((key) => ({...data[key], id: key}));
            console.log(todos)
            dispatch({type: FETCH_TODOS, todos});
        } catch (e) {
            showError('Что-то пошло не так...');
            console.log(e);
            throw e;
        } finally {
            hideLoader();
        }
    }
    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            removeTodo,
            updateTodo,
            fetchTodos,
        }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export default TodoState
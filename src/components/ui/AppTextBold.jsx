import {Text, StyleSheet} from "react-native";

const AppTextBold = (props) => (
    <Text style={{...styles.default, ... props.style}}>
        {props.children}
    </Text>
);

const styles = StyleSheet.create({
    default: {
        fontFamily: 'roboto-bold',
    }
})

export default AppTextBold;
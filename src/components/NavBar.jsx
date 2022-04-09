import {View, Platform, StyleSheet} from "react-native";
import {THEME} from "../theme";
import AppTextBold from "./ui/AppTextBold";

const NavBar = ({title}) => (
        <View style={
            {...styles.navbar, ...Platform
                    .select(
                        ({
                            ios: styles.navbarIos,
                            android: styles.navbarAndroid
                        }))
            }
        }
        >
            <AppTextBold style={styles.text}>
                {title}
            </AppTextBold>
        </View>
    );

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    navbarIos: {
        borderBottomWidth: 1,
        borderBottomColor: THEME.MAIN_COLOR,
    },
    navbarAndroid: {
        backgroundColor: THEME.MAIN_COLOR,
    },
    text: {
        color: Platform.OS === 'ios' ? THEME.MAIN_COLOR :"#FFFFFF",
        fontSize: 20,
    }
});

export default NavBar;
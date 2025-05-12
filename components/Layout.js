import { SafeAreaView, Text, View, StyleSheet } from "react-native";

export function FormContainer({ children, title }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </SafeAreaView>
    );
}

export function ButtonContainer({ children }) {
    return (
        <View style={styles.buttonsContainer}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#27428f'
    },
    buttonsContainer: {
        marginTop: 20
    }
}); 
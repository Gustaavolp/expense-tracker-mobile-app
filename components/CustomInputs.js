import { TextInput, StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export function EmailInput ({ placeholder = "E-mail", value, setValue }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            inputMode="email"
            autoCapitalize="none"
            onChangeText={setValue}
            value={value}
        />
    )
}

export function PasswordInput ({ placeholder = "Senha", value, setValue }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={setValue}
            value={value}
        />
    )
}

export function CustomTextInput ({ placeholder, value, setValue, keyboardType = "default" }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={setValue}
            value={value}
            keyboardType={keyboardType}
        />
    )
}

export function DatePickerInput({ date, setDate }) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    return (
        <>
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.dateButtonText}>
                    {date.toLocaleDateString('pt-BR')}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        fontSize: 20,
        color: 'black',
        marginVertical: 15
    },
    dateButton: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 15,
        marginVertical: 10
    },
    dateButtonText: {
        fontSize: 18,
        textAlign: 'center'
    },
})
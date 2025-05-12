import { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc
} from '../firebase';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { EmailInput, PasswordInput, CustomTextInput } from '../components/CustomInputs';

export default function RegisterScreen() {
    const navigation = useNavigation();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const register = async () => {
        if (!email || !password || !name || !phone) {
            setErrorMessage('Preencha todos os campos.');
            return;
        }

        if (!regexEmail.test(email)) {
            setErrorMessage('E-mail inválido');
            return;
        }

        if (!regexPassword.test(password)) {
            setErrorMessage('A senha deve conter no mínimo 8 caracteres, letra maiúscula, minúscula, número e símbolo');
            return;
        }

        setErrorMessage('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Adicionar os dados do usuário (nome e telefone) ao Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                phone: phone,
                email: user.email
            });
            
            console.log('Usuário registrado com sucesso:', user);
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Erro no registro:', error);
        }
    }

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, name, phone])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Registrar-se</Text>
                
                <CustomTextInput 
                    placeholder="Nome completo" 
                    value={name} 
                    setValue={setName} 
                />
                
                <EmailInput 
                    value={email} 
                    setValue={setEmail} 
                />
                
                <CustomTextInput 
                    placeholder="Telefone" 
                    value={phone} 
                    setValue={setPhone} 
                />
                
                <PasswordInput 
                    value={password} 
                    setValue={setPassword} 
                />
                
                {errorMessage &&
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                
                <PrimaryButton text={"Registrar-se"} action={() => {
                    register();
                }} />

                <Text>Já tem uma conta?</Text>
                
                <SecondaryButton text={'Voltar para Login'} action={() => {
                    navigation.goBack();
                }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 25
    },
    title: {
        fontSize: 45,
        textAlign: 'center',
        marginVertical: 40
    },
    errorMessage: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red'
    }
})
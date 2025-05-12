import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db, collection, addDoc, Timestamp } from '../firebase';
import { PrimaryButton, SecondaryButton, ErrorMessage } from '../components/Buttons';
import { CustomTextInput, DatePickerInput } from '../components/CustomInputs';
import { FormContainer, ButtonContainer } from '../components/Layout';

export default function AddExpenseScreen() {
    const navigation = useNavigation();
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddExpense = async () => {
        if (!description || !value) {
            setErrorMessage('Preencha todos os campos obrigatórios.');
            return;
        }

        // Validar se o valor é um número
        const numericValue = parseFloat(value.replace(',', '.'));
        if (isNaN(numericValue) || numericValue <= 0) {
            setErrorMessage('Informe um valor válido.');
            return;
        }

        try {
            await addDoc(collection(db, 'expenses'), {
                description,
                value: numericValue,
                date: Timestamp.fromDate(date),
                userId: auth.currentUser.uid,
                createdAt: Timestamp.now()
            });

            // Navegar de volta para a tela inicial
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao adicionar despesa:', error);
            setErrorMessage('Erro ao adicionar despesa. Tente novamente.');
        }
    };

    return (
        <FormContainer title="Adicionar Despesa">
            <CustomTextInput
                placeholder="Descrição"
                value={description}
                setValue={setDescription}
            />

            <CustomTextInput
                placeholder="Valor (R$)"
                value={value}
                setValue={setValue}
                keyboardType="numeric"
            />

            <DatePickerInput date={date} setDate={setDate} />

            <ErrorMessage message={errorMessage} />

            <ButtonContainer>
                <PrimaryButton
                    text="Adicionar"
                    action={handleAddExpense}
                />

                <SecondaryButton
                    text="Cancelar"
                    action={() => navigation.goBack()}
                />
            </ButtonContainer>
        </FormContainer>
    );
} 
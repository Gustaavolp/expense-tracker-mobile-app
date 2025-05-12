import { useState } from 'react';
import { Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db, doc, updateDoc, deleteDoc, Timestamp } from '../firebase';
import { PrimaryButton, SecondaryButton, DangerButton, ErrorMessage } from '../components/Buttons';
import { CustomTextInput, DatePickerInput } from '../components/CustomInputs';
import { FormContainer, ButtonContainer } from '../components/Layout';

export default function EditExpenseScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { expense } = route.params;

    const [description, setDescription] = useState(expense.description);
    const [value, setValue] = useState(expense.value.toString());
    const [date, setDate] = useState(expense.date);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpdateExpense = async () => {
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
            const expenseRef = doc(db, 'expenses', expense.id);
            await updateDoc(expenseRef, {
                description,
                value: numericValue,
                date: Timestamp.fromDate(date),
                updatedAt: Timestamp.now()
            });

            // Navegar de volta para a tela inicial
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar despesa:', error);
            setErrorMessage('Erro ao atualizar despesa. Tente novamente.');
        }
    };

    const handleDeleteExpense = () => {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza que deseja excluir esta despesa?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const expenseRef = doc(db, 'expenses', expense.id);
                            await deleteDoc(expenseRef);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Erro ao excluir despesa:', error);
                            setErrorMessage('Erro ao excluir despesa. Tente novamente.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <FormContainer title="Editar Despesa">
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
                    text="Salvar Alterações"
                    action={handleUpdateExpense}
                />

                <SecondaryButton
                    text="Cancelar"
                    action={() => navigation.goBack()}
                />

                <DangerButton
                    text="Excluir Despesa"
                    action={handleDeleteExpense}
                />
            </ButtonContainer>
        </FormContainer>
    );
} 
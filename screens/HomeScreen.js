import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { auth, signOut, db, collection, query, where, getDocs, orderBy } from '../firebase';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseItem, ExpenseDateHeader, TotalExpenses, EmptyExpensesList } from "../components/ExpenseComponents";

export default function HomeScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState(auth.currentUser);
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        await signOut(auth);
    }

    const loadExpenses = async () => {
        if (!user) return;
        
        try {
            setLoading(true);
            const expensesQuery = query(
                collection(db, 'expenses'),
                where('userId', '==', user.uid),
                orderBy('date', 'desc')
            );
            
            const querySnapshot = await getDocs(expensesQuery);
            
            const expensesData = [];
            let total = 0;
            
            querySnapshot.forEach((doc) => {
                const expense = {
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date.toDate() // Convertendo Timestamp para Date
                };
                
                expensesData.push(expense);
                total += expense.value;
            });
            
            // Agrupar despesas por data (para as seções)
            const groupedExpenses = groupExpensesByDate(expensesData);
            
            setExpenses(groupedExpenses);
            setTotalExpenses(total);
        } catch (error) {
            console.error('Erro ao carregar despesas:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para agrupar despesas por data (para as seções)
    const groupExpensesByDate = (expenses) => {
        const groups = {};
        
        expenses.forEach(expense => {
            const dateStr = expense.date.toISOString().split('T')[0]; // YYYY-MM-DD
            
            if (!groups[dateStr]) {
                groups[dateStr] = [];
            }
            
            groups[dateStr].push(expense);
        });
        
        // Converter para array de seções
        return Object.keys(groups).map(date => ({
            date,
            data: groups[date]
        })).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort por data mais recente
    };

    useEffect(() => {
        if (user) {
            loadExpenses();
        }
        
        // Atualizar a lista quando retornar à tela
        const unsubscribe = navigation.addListener('focus', () => {
            loadExpenses();
        });
        
        return unsubscribe;
    }, [user, navigation]);

    const navigateToEditExpense = (expense) => {
        navigation.navigate('EditExpense', { expense });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Controle de Gastos</Text>
                    <TotalExpenses value={totalExpenses} />
                </View>
                
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Ionicons name="person" size={24} color="#27428f" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.iconButton, styles.addButton]}
                        onPress={() => navigation.navigate('AddExpense')}
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={logout}
                    >
                        <Ionicons name="log-out-outline" size={24} color="#ff3b30" />
                    </TouchableOpacity>
                </View>
                
                {loading ? (
                    <Text style={styles.loadingText}>Carregando despesas...</Text>
                ) : expenses.length === 0 ? (
                    <EmptyExpensesList />
                ) : (
                    <FlatList
                        data={expenses}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => (
                            <View>
                                <ExpenseDateHeader date={item.date} />
                                {item.data.map(expense => (
                                    <ExpenseItem 
                                        key={expense.id} 
                                        expense={expense} 
                                        onPress={() => navigateToEditExpense(expense)} 
                                    />
                                ))}
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    container: {
        flex: 1,
        padding: 16
    },
    header: {
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#27428f',
        marginBottom: 10,
        marginTop: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    addButton: {
        backgroundColor: '#27428f'
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#555'
    }
});
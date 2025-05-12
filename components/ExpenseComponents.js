import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

export function ExpenseItem({ expense, onPress }) {
    return (
        <TouchableOpacity
            style={styles.expenseItem}
            onPress={onPress}
        >
            <View style={styles.expenseInfo}>
                <Text style={styles.expenseDescription}>{expense.description}</Text>
                <Text style={styles.expenseValue}>{formatCurrency(expense.value)}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function ExpenseDateHeader({ date }) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{formatDate(date)}</Text>
        </View>
    );
}

export function TotalExpenses({ value }) {
    return (
        <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatCurrency(value)}</Text>
        </View>
    );
}

export function EmptyExpensesList() {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não tem despesas registradas.</Text>
            <Text style={styles.emptySubtext}>Adicione sua primeira despesa!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    expenseItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1
    },
    expenseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    expenseDescription: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1
    },
    expenseValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27428f'
    },
    sectionHeader: {
        backgroundColor: '#e0e0e0',
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5
    },
    sectionHeaderText: {
        fontWeight: 'bold',
        fontSize: 14
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27428f',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 5
    },
    totalValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        color: '#555'
    },
    emptySubtext: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888'
    }
}); 
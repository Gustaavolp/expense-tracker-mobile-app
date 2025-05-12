import { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { auth, db, doc, getDoc } from '../firebase';
import { DangerButton } from '../components/Buttons';

export default function ProfileScreen() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData({
                        id: user.uid,
                        email: user.email,
                        ...userDoc.data()
                    });
                } else {
                    // Se não houver documento no Firestore, use apenas os dados do Auth
                    setUserData({
                        id: user.uid,
                        email: user.email
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#27428f" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Minha Conta</Text>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Nome:</Text>
                    <Text style={styles.info}>{userData?.name || 'Não informado'}</Text>
                    
                    <Text style={styles.label}>E-mail:</Text>
                    <Text style={styles.info}>{userData?.email}</Text>
                    
                    <Text style={styles.label}>Telefone:</Text>
                    <Text style={styles.info}>{userData?.phone || 'Não informado'}</Text>
                </View>
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
        padding: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    infoContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#27428f'
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
        paddingLeft: 5
    }
}); 
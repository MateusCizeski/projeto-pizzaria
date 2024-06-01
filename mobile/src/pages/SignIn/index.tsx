import React, { useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { 
        Text, 
        View, 
        StyleSheet, 
        Image, 
        TextInput, 
        TouchableOpacity,
        ActivityIndicator
    } from "react-native";

export default function SigIn() {
    const { signIn, loadingAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if(email === '' || password === '') return;

        await signIn({ email, password });
    }

    return (
        <View style={styles.container}>
            <h1 style={{ color: '#fff' }}>Faça seu login</h1>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Digite seu email" 
                    style={styles.input} 
                    placeholderTextColor='#f0f0f0' 
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput 
                    placeholder="Digite sua senha" 
                    style={styles.input} 
                    placeholderTextColor='#f0f0f0' 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    { loadingAuth ? (
                        <ActivityIndicator size={25} color='#fff'/>
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    logo: {
        marginBottom: 18
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 34,
        paddingHorizontal: 14
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#fff'
    },
    button: {
        width: '95%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    }
});
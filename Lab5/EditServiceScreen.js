import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '.api';

export const EditServiceScreen = ({ route, navigation }) => {
    const { service } = route.params;
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price.toString());

    const handleUpdate = async () => {
        if (!name || !price) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            await api.updateService(service._id, name, parseInt(price), token);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update service');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Service name *</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Input a service name"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Price *</Text>
                <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        color: 'black',
    },
    button: {
        backgroundColor: '#E91E63',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
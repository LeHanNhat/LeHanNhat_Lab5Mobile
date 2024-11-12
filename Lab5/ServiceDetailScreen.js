import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export const ServiceDetailScreen = ({ route, navigation }) => {
    const [service, setService] = useState(null);
    const { id } = route.params;

    useEffect(() => {
        loadService();
    }, []);

    const loadService = async () => {
        try {
            const data = await api.getService(id);
            setService(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load service details');
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Warning',
            'Are you sure you want to remove this service? This operation cannot be returned',
            [
                { text: 'CANCEL', style: 'cancel' },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('token');
                            await api.deleteService(id, token);
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete service');
                        }
                    },
                },
            ]
        );
    };

    if (!service) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Service detail</Text>
                <Menu>
                    <MenuTrigger>
                        <View style={styles.menuTriggerContainer}>
                            <Text style={styles.menuTrigger}>⋮</Text>
                        </View>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('EditService', { service })} >
                            <Text style={styles.optionText}>Edit</Text>
                        </MenuOption>
                        <MenuOption onSelect={handleDelete}>
                            <Text style={[styles.optionText, styles.deleteText]}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.label}>Service name:</Text>
                <Text style={styles.value}>{service.name}</Text>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>{service.price.toLocaleString()} đ</Text>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.label}>Creator:</Text>
                <Text style={styles.value}>{service.createdBy}</Text>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.value}>
                    {new Date(service.createdAt).toLocaleString()}
                </Text>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.label}>Final update:</Text>
                <Text style={styles.value}>
                    {new Date(service.updatedAt).toLocaleString()}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    menuTriggerContainer: {
        padding: 8,
    },
    menuTrigger: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    optionText: {
        fontSize: 16,
        padding: 10,
        color: 'black',
    },
    deleteText: {
        color: 'red',
    },
    detailItem: {
        marginBottom: 15,
        color: 'black',
    },
    label: {
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: 'black',
    },
});
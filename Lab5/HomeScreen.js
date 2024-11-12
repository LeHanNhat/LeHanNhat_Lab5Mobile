import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { api } from './api';
import { useFocusEffect } from '@react-navigation/native';

export const HomeScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            loadServices();
        }, [])
    );

    const loadServices = async () => {
        try {
            const data = await api.getServices();
            setServices(data);
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate('ServiceDetail', { id: item._id })}
        >
            <Text style={styles.serviceName}>{item.name.toLocaleString()}</Text>
            <Text style={styles.servicePrice}>{item.price.toLocaleString()} đ</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Danh sách dịch vụ</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddService')}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E91E63',
    },
    serviceItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    serviceName: {
        fontSize: 16,
        color: 'black',
    },
    servicePrice: {
        color: '#666',
        marginTop: 5,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
    },
});
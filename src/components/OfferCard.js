import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const OfferCard = ({ offer }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: offer.icon }} style={styles.icon} />
            <Text style={styles.title}>{offer.title}</Text>
            <Image source={{ uri: offer.image }} style={styles.image} />
            <Text style={styles.instructions}>Instructions: {offer.instructions.join(', ')}</Text>
            <Text style={styles.reward}>Reward: {offer.reward}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // Handle offer click
                    Linking.openURL(offer.clickUrl);
                }}
            >
                <Text style={styles.buttonText}>Claim Offer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        elevation: 5,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    instructions: {
        fontSize: 14,
        marginTop: 10,
    },
    reward: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    button: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default OfferCard;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { fetchOffers } from '../redux/slices/offerSlice';
import OfferCard from '../components/OfferCard';
import { getData } from '../utils/asyncStorageUtils';

const Tab = createMaterialTopTabNavigator();

const OfferList = ({ offers, status, error }) => {
    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    }

    if (status === 'failed') {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>Error: {error}</Text>
            </View>
        )
    }

    if (offers.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.empty}>No offers available.</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={offers}
            renderItem={({ item }) => <OfferCard offer={item} />}
            keyExtractor={(item) => item.offerId.toString()}
        />
    );
};

const CompletedOffers = () => {
    const offers = useSelector((state) => state.offers.completedOffers);
    const status = useSelector((state) => state.offers.status);
    const error = useSelector((state) => state.offers.error);
    return <OfferList offers={offers} status={status} error={error} />;
};

const InProgressOffers = () => {
    const offers = useSelector((state) => state.offers.inProgressOffers);
    const status = useSelector((state) => state.offers.status);
    const error = useSelector((state) => state.offers.error);
    return <OfferList offers={offers} status={status} error={error} />;
};

const NewOffers = () => {
    const offers = useSelector((state) => state.offers.newOffers);
    const status = useSelector((state) => state.offers.status);
    const error = useSelector((state) => state.offers.error);
    return <OfferList offers={offers} status={status} error={error} />;
};

const OfferWall = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadOffers = async () => {
            const userId = await getData('userId');
            const secret = await getData('secret');
            if (userId && secret) {
                dispatch(fetchOffers({ userId, secret }));
            }
        };
        loadOffers();
    }, [dispatch]);

    return (
        <Tab.Navigator
            initialRouteName="NewOffers"
            screenOptions={{
                tabBarActiveTintColor: '#f4511e',
                tabBarIndicatorStyle: { backgroundColor: '#f4511e' },
                tabBarStyle: { backgroundColor: '#fff' },
                tabBarLabelStyle: { fontSize: 14 },
            }}
        >
            <Tab.Screen name="NewOffers" component={NewOffers} options={{ title: 'New Offers' }} />
            <Tab.Screen name="InProgressOffers" component={InProgressOffers} options={{ title: 'In Progress' }} />
            <Tab.Screen name="CompletedOffers" component={CompletedOffers} options={{ title: 'Completed' }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
        fontSize: 18,
    },
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        fontSize: 18,
        color: '#000',
    },
});

export default OfferWall;

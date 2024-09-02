import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../utils/asyncStorageUtils';
import { registerNewUser } from '../redux/slices/userSlice';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const secret = useSelector((state) => state.user.secret);
  const status = useSelector((state) => state.user.status);

//   console.log("USER ID & Status ==>", userId, status)

  useEffect(() => {
    const checkAuth = async () => {
      const savedUserId = await getData('userId');
      const savedSecret = await getData('secret');
      if (savedUserId && savedSecret) {
        navigation.replace('OfferWall');
      } else {
        dispatch(registerNewUser());
      }
    };
    checkAuth();
  }, [dispatch, navigation]);

  useEffect(() => {
    if (status === 'succeeded') {
      storeData('userId', userId);
      storeData('secret', secret);
      navigation.replace('OfferWall');
    }
  }, [status, userId, navigation]);

  return (
    <View style={styles.container}>
      {/* <Image source={require('../../assets/images/splash.png')} style={styles.image} /> */}
      <Text style={styles.title}>Kitty Cash App: Earn Money Now</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default SplashScreen;

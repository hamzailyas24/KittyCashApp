import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MyAppNavigation from './src/navigation/MyAppNavigation';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyAppNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
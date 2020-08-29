import React, { useReducer, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Routers from './src/Routers';

import loginReducer from './src/reducers/loginReducer';
import { AuthContext } from './src/contexts/AuthContext';

console.disableYellowBox = true;

const App = (props) => {
  const initialState = {
    isLoading: true,
    userEmail: null,
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContent = useMemo(() => ({
    auth: async (user) => {

      if (user.email != '' && user.password != '') {
        await AsyncStorage.setItem('email', user.email)
        dispatch({ type: 'AUTH', userEmail: user.email });
      } else {
        alert('Please input the missing fields!');
      }
    },
    logout: async () => {
      AsyncStorage.clear();
      dispatch({ type: 'LOGOUT' });
    }
  }), [])

  useEffect(() => {
    checkSession();
  }, [])

  const checkSession = async () => {
    try {
      const email = await AsyncStorage.getItem('email')

      if (email !== null) {
        dispatch({ type: 'AUTH', userEmail: email });
      }
    } catch (e) {
      console.error(e)
    }
  }

  return loginState.isLoading ? null : (
    <AuthContext.Provider value={authContent}>
      <Routers isLoggedIn={loginState.userEmail ? true : false} />
    </AuthContext.Provider>
  );
}

export default App


const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#FFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  }
})

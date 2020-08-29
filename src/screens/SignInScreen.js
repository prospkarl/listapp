import React, { Component, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

import Styles from '../Styles';

import { MyButton } from '../components/myComponents';
import { AuthContext } from '../contexts/AuthContext';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth } = useContext(AuthContext);

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      ...Styles.container
    }}>
      <Text style={styles.LoginTextHeader}>List App</Text>

      <View style={Styles.formInputGroup}>
        <TextInput
          style={Styles.formInput}
          onChangeText={(email) => setEmail(email)}
          value={email}
          placeholder="Email"
          textContentType="emailAddress"
        />
      </View>

      <View style={Styles.formInputGroup}>
        <TextInput
          style={Styles.formInput}
          onChangeText={(password) => setPassword(password)}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <MyButton title="Login" onPress={() => auth({ email, password })} />
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  LoginTextHeader: {
    fontSize: 35,
    marginBottom: 25
  }
});
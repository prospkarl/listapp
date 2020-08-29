import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

const myNav = (props) => {
  const { logout } = useContext(AuthContext);

  const { title, isHome } = props;

  return (
    <View style={navbarStyles.containerStyle}>
      <View style={navbarStyles.navColumn}>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>{title}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', ...navbarStyles.navColumn }} >
        {
          isHome ? (
            <TouchableOpacity onPress={logout} style={navbarStyles.logoutBtn}>
              <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
          ) : null
        }
      </View>
    </View >
  );
}

export default myNav;

const navbarStyles = StyleSheet.create({
  navColumn: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  transparentHeaderTitle: {
    margin: 10,
    fontSize: 15,
    alignSelf: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  containerStyle: {
    backgroundColor: '#111D4A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 0,
    height: 60,
  },
  logoutBtn: {
    marginLeft: 15,
    borderWidth: 1,
    borderRadius: 25,
    padding: 5,
    borderColor: 'white'
  }
})

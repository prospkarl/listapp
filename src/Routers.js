import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

// Screens
import SignInScreen from './screens/SignInScreen';
import ListScreen from './screens/ListScreen';
import RepoDetailsComponent from './screens/RepoDetailsComponent';

// Components
import myNav from './components/myNav';

const Routers = (props) => {
  return (
    <Router sceneStyle={styles.scene}>
      <Scene key="root" titleStyle={{ alignSelf: 'center' }} headerLayoutPreset="center">
        <Scene key="signin" title="Sign In" component={SignInScreen} hideNavBar type={ActionConst.RESET} />
        <Scene key="list" title="List Screen" component={ListScreen} initial={props.isLoggedIn} hideBackImage={true} navBar={myNav} type={ActionConst.RESET} isHome={true} />
        <Scene key="repo" title="Repository Details" component={RepoDetailsComponent} hideBackImage={true} navBar={myNav} />
      </Scene>
    </Router >
  );
}

export default Routers


const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#FFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  }
})

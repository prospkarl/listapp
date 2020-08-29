import React, { useEffect, useState } from 'react';
import { View, Text, Linking, StyleSheet, Image } from 'react-native';
import AppConfig from '../AppConfig';
import { MyButton } from '../components/myComponents';
import Styles from '../Styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';


const RepoDetailsComponent = ({ owner, repo_id }) => {
  const [repoDetails, setDetails] = useState(null);

  useEffect(() => {
    _fetchDetails();
  }, [])

  const _fetchDetails = () => {

    fetch(
      AppConfig.API_URL + 'repos/' + owner + '/' + repo_id
    )
      .then(response => response.json())
      .then(data => setDetails(data))
  }

  return repoDetails != null ? (
    <View style={Styles.container}>
      <ScrollView>
        <View style={styles.headerStyle}>
          <View style={{ flex: 8 }}>
            <Text style={styles.titleStyle}>{repoDetails.name}</Text>
            <Text style={styles.subTitleStyle}>by: {repoDetails.owner.login}</Text>
          </View>
          <Image source={{ uri: repoDetails.owner.avatar_url }} style={{ width: 50, height: 50 }} />
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 25, }}>
          <Text style={{ ...styles.countBox }}>{repoDetails.stargazers_count} | Stars</Text>
          <Text style={{ ...styles.countBox, marginLeft: 5 }}>{repoDetails.forks_count} | Forks</Text>
        </View>
        <Text style={{ fontSize: 25, marginTop: 10, }}>Description: </Text>
        <Text style={{ fontSize: 15, marginTop: 10, color: '#333' }}>{repoDetails.description ? repoDetails.description : 'Description unavailable'}</Text>
      </ScrollView>
      <MyButton
        title="Go to Repo"
        style={{ marginTop: 25 }}
        onPress={() => Linking.openURL(repoDetails.html_url)}
      />
      <MyButton
        title="Return"
        style={{ marginTop: 10, backgroundColor: 'white', borderColor: '#111D4A' }}
        textStyle={{ color: '#111D4A' }}
        onPress={Actions.pop}
      />
    </View>
  ) : null
}

export default RepoDetailsComponent;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 40
  },
  subTitleStyle: {
    fontSize: 15,
  },
  creator: {
    color: '#555'
  },
  countBox: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: .5,
    marginHorizontal: 3
  }
});
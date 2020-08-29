import React, { Component, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import Styles from '../Styles';
import { Actions } from 'react-native-router-flux';
import AppConfig from '../AppConfig';

const Item = ({ title, owner, onPress }) => {
  return (
    <TouchableOpacity style={{ height: 50, width: '100%', backgroundColor: '#EBEBEB', marginBottom: 5, padding: 5, paddingHorizontal: 15 }} onPress={onPress}>
      <Text style={{ fontSize: 18 }}>{title}</Text>
      <Text style={{ fontSize: 12 }}>by: {owner}</Text>
    </TouchableOpacity>
  )
}

const List = () => {
  const [searchQuery, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total_results, setTotal_results] = useState(0);
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasReachedLimit, reachedLimit] = useState(false);

  const handleSearch = () => {
    reachedLimit(false);
    setResults([]);
    _fetchDetails();
  }

  const loadMore = () => {
    if (hasReachedLimit) {
      return false;
    } else {
      _fetchDetails();
    }
  }

  const _fetchDetails = () => {
    setRefreshing(true);
    Keyboard.dismiss();

    const PER_PAGE = 20;

    fetch(
      AppConfig.API_URL + 'search/repositories?q=' + searchQuery + '&page=' + page + '&per_page=' + PER_PAGE
    )
      .then(response => response.json())
      .then(data => saveState(data))
  }

  const saveState = (data) => {
    if (data.message) {
      alert(data.message);
      return false;
    } else {
      setTotal_results(data.total_count);
      setPage(page + 1);
      setResults(results.concat(data.items));
      setRefreshing(false);
      
      if (data.items.length == total_results) {
        reachedLimit(true);
      }
    }
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        title={item.name}
        owner={item.owner.login}
        onPress={() => Actions.repo({ repo_id: item.name, owner: item.owner.login })}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <TextInput
          style={{ flex: 1, ...Styles.formInput }}
          onChangeText={(searchQuery) => setQuery(searchQuery)}
        />
        <TouchableOpacity
          style={styles.searchBar}
          onPress={handleSearch}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginHorizontal: 15, marginBottom: 15 }}>Total Results: {total_results}</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item, i) => i}
          onEndReached={loadMore}
          onEndReachedThreshold={5}
          ListFooterComponent={() => {
            return refreshing ? (
              <View style={{ flex: 1, paddingVertical: 25, alignItems: 'center' }}>
                <ActivityIndicator size="small" />
                <Text>Please wait...</Text>
              </View>
            ) : null
          }}
        />
      </View>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  searchBar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    marginLeft: 5,
    borderRadius: 8,
    borderColor: '#555'
  },
  resultText: {
    marginHorizontal: 15,
    marginBottom: 15
  }
});
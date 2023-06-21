import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);

  const searchHandle = async () => {
    const lowercaseBreed = searchTerm.toLowerCase();
    setImgUrl(undefined);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${lowercaseBreed}/images/random`
      );
      setImgUrl(response.data.message);
      setError(undefined);
      setLoading(false);
    } catch (error) {
      setError('Wrong breed. Try again!');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ paddingBottom: -50 }}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Pressable style={styles.button} onPress={searchHandle}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
        {isLoading ? (
          <ActivityIndicator size="large" color="#9b93b8" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <Image source={{ uri: imgUrl }} style={styles.img} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#18122B',
    paddingTop: 60,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  input: {
    width: '70%',
    borderColor: '#635985',
    borderWidth: 5,
    fontSize: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  img: {
    width: 400,
    height: 400,
  },
  error: {
    color: 'red',
    fontSize: 30,
  },
  button: {
    backgroundColor: '#D4ADFC',
    padding: 10,
    width: 200,
    alignItems: 'center',
    margin: 40,
  },
  buttonText: { color: 'white', fontSize: 25 },
});

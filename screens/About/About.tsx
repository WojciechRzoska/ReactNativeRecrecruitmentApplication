import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;
const About = ({ route }: Props) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${route.params.breed}/images/random`
      );
      setImgUrl(response.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>{route.params.breed}</Text>
      <Image source={{ uri: imgUrl }} style={styles.img} />
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#18122B',
    borderBottomColor: '#635985',

    alignItems: 'center',
    borderBottomWidth: 2,
  },
  img: {
    width: 400,
    height: 400,
  },
  text: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    marginBottom: 30,
  },
});

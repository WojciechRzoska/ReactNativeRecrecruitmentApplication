import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BreedProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'About', undefined>;
  route: RouteProp<RootStackParamList, 'About'>;
  breed: string;
  key: number;
}
const Breed = ({ navigation, breed, key }: BreedProps) => {
  const handleNavigate = () => {
    navigation.navigate('About', { breed });
  };
  return (
    <TouchableOpacity
      key={key}
      style={styles.wrapper}
      onPress={() => handleNavigate()}
    >
      <Text style={styles.text}>{breed}</Text>
    </TouchableOpacity>
  );
};

export default Breed;

const styles = StyleSheet.create({
  wrapper: {
    height: 100,
    backgroundColor: '#18122B',
    borderBottomColor: '#635985',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

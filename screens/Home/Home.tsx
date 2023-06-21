import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Breed from '../../components/Breed/Breed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { createNavigationContainerRef } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const Home = ({ route, navigation }: Props) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loadedBreeds, setLoadedBreeds] = useState<string[]>([]);
  const [isEndReached, setIsEndReached] = useState(false);

  const navigationRef = createNavigationContainerRef<RootStackParamList>();
  const fetchData = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      const result = Object.keys(response.data.message);
      setBreeds(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoadedBreeds(breeds.slice(0, 5));
  }, [breeds]);

  const loadMoreBreeds = () => {
    const nextBatch = breeds.slice(0, loadedBreeds.length + 5);
    const breedsToShowData = nextBatch.map((breed) => breed);
    setLoadedBreeds(breedsToShowData);
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const distanceToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (distanceToBottom < 20 && !isEndReached) {
      setIsEndReached(true);
      loadMoreBreeds();
    } else {
      setIsEndReached(false);
    }
  };

  return (
    <SafeAreaView style={{ paddingBottom: -50 }}>
      <ScrollView
        style={styles.wrapper}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {loadedBreeds.map((item, index) => (
          <Breed
            route={route}
            navigation={navigation}
            breed={item}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#18122B',
  },
});

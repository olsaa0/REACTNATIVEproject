
import { View, Text, StyleSheet } from 'react-native';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text>Discover Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});


import { View, FlatList, StyleSheet } from 'react-native';
import DestinationCard from '../components/DestinationCard';

const MOCK_DATA = [
  { id: '1', city: 'Prishtina', image: 'https://images.unsplash.com/photo-1622397444321-424b91811eb1?q=80&w=800&auto=format&fit=crop' },
  { id: '2', city: 'Istanbul', image: 'https://images.unsplash.com/photo-1522083111810-72cb615ed27a?q=80&w=800&auto=format&fit=crop' },
  { id: '3', city: 'Lisbon', image: 'https://images.unsplash.com/photo-1558694440-03ade9215d7b?q=80&w=800&auto=format&fit=crop' },
  { id: '4', city: 'Eskişehir', image: 'https://images.unsplash.com/photo-1588614945413-588865611e03?q=80&w=800&auto=format&fit=crop' },
];

export default function DiscoverScreen({ navigation }) {
  const handlePress = (city) => {
    navigation.navigate('CityDetail', { cityName: city });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => (
          <DestinationCard 
            cityName={item.city} 
            imageUrl={item.image} 
            onPress={() => handlePress(item.city)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
});
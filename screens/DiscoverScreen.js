import { View, FlatList, StyleSheet, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import DestinationCard from '../components/DestinationCard';

const MOCK_DATA = [
  { 
    id: '1', 
    city: 'Japan', 
    imageSource: { uri: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' } 
  },
  { 
    id: '2', 
    city: 'Egypt', 
    imageSource: { uri: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop' } 
  },
  { 
    id: '3', 
    city: 'Italy', 
    imageSource: { uri: 'https://images.unsplash.com/photo-1516483638261-f4088921ee42?q=80&w=800&auto=format&fit=crop' } 
  },
  { 
    id: '4', 
    city: 'Brazil', 
    imageSource: { uri: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop' } 
  },
  { 
    id: '5', 
    city: 'France', 
    imageSource: { uri: 'https://images.unsplash.com/photo-1502602898657-3e907a5ea581?q=80&w=800&auto=format&fit=crop' } 
  },
  { 
    id: '6', 
    city: 'Thailand', 
    imageSource: { uri: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop' } 
  },
];

export default function DiscoverScreen({ navigation }) {
  const handlePress = (city) => {
    navigation.navigate('CityDetail', { cityName: city });
  };

  const renderHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Featured</Text>
      <View style={styles.swiperContainer}>
        <Swiper 
          autoplay={true} 
          showsPagination={true} 
          dotColor="rgba(255,255,255,0.5)"
          activeDotColor="#ffffff"
        >
          {MOCK_DATA.slice(0, 3).map((item) => (
            <View key={`swiper-${item.id}`} style={styles.slide}>
              <DestinationCard 
                cityName={item.city} 
                imageSource={item.imageSource} 
                onPress={() => handlePress(item.city)}
              />
            </View>
          ))}
        </Swiper>
      </View>
      <Text style={styles.sectionTitle}>All Destinations</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 100 }} 
        renderItem={({ item }) => (
          <DestinationCard 
            cityName={item.city} 
            imageSource={item.imageSource} 
            onPress={() => handlePress(item.city)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa',
    paddingTop: 50, 
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
    color: '#333',
  },
  swiperContainer: {
    height: 230, 
  },
  slide: {
    flex: 1,
  },
});
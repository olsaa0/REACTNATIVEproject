import { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import DestinationCard from '../components/DestinationCard';

const MOCK_DATA = [
  { id: '1', city: 'Japan', region: 'Asia', imageSource: { uri: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' } },
  { id: '2', city: 'Egypt', region: 'Africa', imageSource: { uri: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop' } },
  { id: '3', city: 'Italy', region: 'Europe', imageSource: { uri: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=800&auto=format&fit=crop' } },
  { id: '4', city: 'Brazil', region: 'Americas', imageSource: { uri: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop' } },
  { id: '5', city: 'France', region: 'Europe', imageSource: { uri: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop' } },
  { id: '6', city: 'Thailand', region: 'Asia', imageSource: { uri: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop' } },
];

const CATEGORIES = ['All', 'Europe', 'Asia', 'Americas', 'Africa'];

export default function DiscoverScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('All');


  const handlePress = (city, image) => {
    navigation.navigate('CityDetail', { cityName: city, imageSource: image });
  };

  const filteredData = activeCategory === 'All' 
    ? MOCK_DATA 
    : MOCK_DATA.filter(item => item.region === activeCategory);

  const renderHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Featured</Text>
      <View style={styles.swiperContainer}>
        <Swiper autoplay={true} showsPagination={true} dotColor="rgba(255,255,255,0.5)" activeDotColor="#ffffff">
          {MOCK_DATA.slice(0, 3).map((item) => (
            <View key={`swiper-${item.id}`} style={styles.slide}>
              <DestinationCard 
                cityName={item.city} 
                imageSource={item.imageSource} 

                onPress={() => handlePress(item.city, item.imageSource)}
              />
            </View>
          ))}
        </Swiper>
      </View>

      <Text style={styles.sectionTitle}>Explore by Region</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity 
            key={category} 
            style={[styles.categoryButton, activeCategory === category && styles.categoryButtonActive]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[styles.categoryText, activeCategory === category && styles.categoryTextActive]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 100 }} 
        renderItem={({ item }) => (
          <DestinationCard 
            cityName={item.city} 
            imageSource={item.imageSource} 
            onPress={() => handlePress(item.city, item.imageSource)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffa6cfff', paddingTop: 60 },
  sectionTitle: { fontSize: 26, fontWeight: '900', marginHorizontal: 24, marginBottom: 16, marginTop: 24, color: '#ff0385ff', letterSpacing: 0.5 },
  swiperContainer: { height: 260 },
  slide: { flex: 1 },
  categoryContainer: { paddingHorizontal: 20, marginBottom: 24 },
  categoryButton: { paddingHorizontal: 22, paddingVertical: 12, backgroundColor: '#ffffff', borderRadius: 30, marginHorizontal: 6, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  categoryButtonActive: { backgroundColor: '#f1abb5ff', borderColor: '#FF6B81' }, // Coral active state!
  categoryText: { fontSize: 15, fontWeight: '700', color: '#f23097ff', letterSpacing: 0.3 },
  categoryTextActive: { color: '#f23097ff' },
});
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DestinationCard from '../components/DestinationCard';

export default function BoardScreen({ navigation }) {
  const [savedDestinations, setSavedDestinations] = useState([
    { id: '1', city: 'Lisbon', imageSource: { uri: 'https://images.unsplash.com/photo-1558694440-03ade9215d7b?q=80&w=800&auto=format&fit=crop' } },
    { id: '2', city: 'Istanbul', imageSource: { uri: 'https://images.unsplash.com/photo-1522083111810-72cb615ed27a?q=80&w=800&auto=format&fit=crop' } }
  ]);

  const removeDestination = (id) => {
    setSavedDestinations(current => current.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Travel Board~</Text>

      {savedDestinations.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cloud-offline-outline" size={80} color="#70A1FF" />
          <Text style={styles.emptyStateText}>Your board is dreaming... 💭</Text>
          <Text style={styles.emptyStateSubtext}>Save some beautiful places from the Discover tab!</Text>
        </View>
      ) : (
        <FlatList
          data={savedDestinations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }} 
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <DestinationCard 
                cityName={item.city} 
                imageSource={item.imageSource} 
                onPress={() => navigation.navigate('CityDetail', { cityName: item.city, imageSource: item.imageSource })}
              />
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeDestination(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ff98cfff', paddingTop: 60 },
  headerTitle: { fontSize: 32, fontWeight: '900', marginBottom: 24, marginHorizontal: 24, color: '#ff2093ff', letterSpacing: -0.5 },
  cardWrapper: { position: 'relative' },
  
  
  deleteButton: {
    position: 'absolute', top: 15, right: 35, 
    backgroundColor: '#FF6B81', 
    width: 44, height: 44, borderRadius: 22, 
    justifyContent: 'center', alignItems: 'center', 
    shadowColor: '#FF6B81', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6,
  },
  
 emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 },
  emptyStateText: { marginTop: 20, fontSize: 20, fontWeight: '800', color: '#ff0d7e' },
  emptyStateSubtext: { marginTop: 10, fontSize: 15, fontWeight: '600', color: '#A4B0BE', textAlign: 'center', paddingHorizontal: 50 },
});
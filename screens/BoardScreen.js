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
      <Text style={styles.headerTitle}>My Travel Board</Text>

      {savedDestinations.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={60} color="#ccc" />
          <Text style={styles.emptyStateText}>Your board is empty.</Text>
          <Text style={styles.emptyStateSubtext}>Save destinations from the Discover or Search tabs.</Text>
        </View>
      ) : (
        <FlatList
          data={savedDestinations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <DestinationCard 
                cityName={item.city} 
                imageSource={item.imageSource} 
                onPress={() => navigation.navigate('CityDetail', { cityName: item.city })}
              />

              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => removeDestination(item.id)}
              >
                <Ionicons name="trash" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 20,
    color: '#1a1a1a',
  },
  cardWrapper: {
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 30,
    backgroundColor: 'rgba(255, 59, 48, 0.9)', // iOS Red
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  emptyStateText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  emptyStateSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
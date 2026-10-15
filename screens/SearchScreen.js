import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DestinationCard from '../components/DestinationCard';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Fetch data from the free RestCountries API
      const response = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
      if (!response.ok) throw new Error('Location not found');
      
      const data = await response.json();
      const countryData = data[0]; // Grab the first closest match

      setResult({
        name: countryData.name.common,
        image: countryData.flags.png,
        region: countryData.region,
      });
    } catch (err) {
      setError('No destination found. Please try another search.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Find a Destination</Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Where to? (e.g., Portugal, Turkey, Japan)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => {
            setSearchQuery('');
            setHasSearched(false);
            setResult(null);
          }}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.resultsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1a1a1a" style={{ marginTop: 50 }} />
        ) : error ? (
          <View style={styles.emptyState}>
            <Ionicons name="alert-circle-outline" size={60} color="#ff3b30" />
            <Text style={styles.emptyStateText}>{error}</Text>
          </View>
        ) : result ? (
          <DestinationCard 
            cityName={result.name} 
            imageSource={{ uri: result.image }}
            onPress={() => navigation.navigate('CityDetail', { cityName: result.name })}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="earth" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>Search for a country to see details.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resultsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  emptyStateText: {
    marginTop: 15,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
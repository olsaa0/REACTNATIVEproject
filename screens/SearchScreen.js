import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DestinationCard from '../components/DestinationCard';

const UNSPLASH_API_KEY = 'PASTE_YOUR_ACCESS_KEY_HERE';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setHasSearched(true);

    try {
      let actualCountryName = query;
      let flag = null;

      const countryResponse = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`
      );

      if (countryResponse.ok) {
        const countryData = await countryResponse.json();
        actualCountryName = countryData[0].name.common;
        flag = countryData[0].flags?.png || null;
      }

      let fetchedImageUrl =
        `https://placehold.co/600x400/2a2a2a/ffffff/png?text=${encodeURIComponent(query)}`;

      if (
        UNSPLASH_API_KEY &&
        UNSPLASH_API_KEY !== 'PASTE_YOUR_ACCESS_KEY_HERE'
      ) {
        try {
          const unsplashResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' travel landscape')}&orientation=landscape&client_id=${UNSPLASH_API_KEY}`
          );

          if (unsplashResponse.ok) {
            const unsplashData = await unsplashResponse.json();

            if (unsplashData.results?.length > 0) {
              fetchedImageUrl = unsplashData.results[0].urls.regular;
            }
          }
        } catch (unsplashError) {
          console.log('Unsplash fetch failed.');
        }
      }

      setResult({
        name: actualCountryName,
        image: fetchedImageUrl,
        flag,
      });
    } catch (err) {
      setError("Oops! We couldn't find that place. Please try again.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    setResult(null);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Where to next? </Text>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleSearch} disabled={isLoading}>
          <Ionicons
            name="search"
            size={22}
            color="#FF6B81"
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="e.g., Lisbon, Tokyo, Paris..."
          placeholderTextColor="#A4B0BE"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons
              name="close-circle"
              size={22}
              color="#D1D8E0"
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.resultsContainer}>
        {isLoading ? (
          <View style={styles.emptyState}>
            <ActivityIndicator size="large" color="#FF6B81" />
            <Text style={styles.loadingText}>
              Packing our bags and searching...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.emptyState}>
            <Ionicons name="sad-outline" size={70} color="#FF4757" />
            <Text style={styles.emptyStateText}>{error}</Text>
          </View>
        ) : result ? (
          <DestinationCard
            cityName={result.name}
            imageSource={{ uri: result.image }}
            onPress={() =>
              navigation.navigate('CityDetail', {
                cityName: result.name,
                imageSource: { uri: result.image },
              })
            }
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="compass-outline"
              size={80}
              color="#ff46bbff"
            />
            <Text style={styles.emptyStateText}>
              Search for a country to start exploring!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 24,
    color: '#ff5599ff',
    letterSpacing: -0.5,
  },
  searchContainer: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 60,
    shadowColor: '#FF6B81',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: '#fc58a2ff',
  },
});
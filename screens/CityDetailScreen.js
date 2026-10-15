import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function CityDetailScreen({ route, navigation }) {
  
  const { cityName } = route.params || { cityName: 'Unknown Destination' };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: `https://placehold.co/600x400/2a2a2a/ffffff/png?text=${cityName}` }} 
        style={styles.heroImage} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{cityName}</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.cardHeader}>Saved Logistics</Text>
          <Text style={styles.cardItem}>✈️ Flight: Pegasus Airlines</Text>
          <Text style={styles.cardItem}>🚆 Train: TCDD Taşımacılık A.Ş.</Text>
          <Text style={styles.cardItem}>🚇 Transit: Navegante Zapping Fares</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardHeader}>Accommodation & Notes</Text>
          <Text style={styles.cardItem}>• Booked via One Key</Text>
          <Text style={styles.cardItem}>• Local SIM: WOO eSIM activated</Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Board</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  cardItem: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
  backButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
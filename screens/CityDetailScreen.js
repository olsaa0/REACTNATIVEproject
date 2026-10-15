import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CityDetailScreen({ route, navigation }) {
  const { cityName, imageSource } = route.params || { cityName: 'Unknown Destination' };
  const displayImage = imageSource || { uri: `https://placehold.co/600x400/2a2a2a/ffffff/png?text=${cityName}` };


  const [isLiked, setIsLiked] = useState(false);

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.imageContainer}>
        <Image source={displayImage} style={styles.heroImage} />
        

        <TouchableOpacity 
          style={styles.heartButton} 
          onPress={() => setIsLiked(!isLiked)}
        >
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={30} 
            color={isLiked ? "#ff3b30" : "#ffffff"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{cityName}</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.cardHeader}>Saved Logistics</Text>
          <Text style={styles.cardItem}>✈️ Flight: Pegasus Airlines</Text>
          <Text style={styles.cardItem}>🚆 Train: TCDD Taşımacılık A.Ş.</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  imageContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 300 },
  heartButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { padding: 20, paddingBottom: 40, marginTop: -20, backgroundColor: '#f8f9fa', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 20 },
  infoCard: { backgroundColor: '#ffffff', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 3 },
  cardHeader: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' },
  cardItem: { fontSize: 15, color: '#666', marginBottom: 8 },
  backButton: { marginTop: 15, padding: 16, backgroundColor: '#1a1a1a', borderRadius: 12, alignItems: 'center' },
  backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
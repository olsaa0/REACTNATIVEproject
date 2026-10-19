import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DestinationCard({ cityName, imageSource, onPress }) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} />

        <View style={styles.overlay}>
          <Text style={styles.title}>{cityName}</Text>
          <Text style={styles.subtitle}>Tap to explore →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8, 
  },
  imageWrapper: {
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
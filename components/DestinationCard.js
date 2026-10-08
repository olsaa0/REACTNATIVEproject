
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DestinationCard({ cityName, imageUrl, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{cityName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
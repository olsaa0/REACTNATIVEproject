import { View, Text, StyleSheet } from 'react-native';

export default function CityDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>City Detail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
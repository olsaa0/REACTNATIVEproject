import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CityDetailScreen({ route, navigation }) {
  const { cityName, imageSource } = route.params || { cityName: 'Unknown Destination' };
  const displayImage = imageSource || { uri: `https://placehold.co/600x400/2a2a2a/ffffff/png?text=${cityName}` };

  const [isLiked, setIsLiked] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [packingList, setPackingList] = useState([
    { id: '1', text: 'Passport', completed: false },
    { id: '2', text: 'Phone Charger', completed: false }
  ]);

  const addItem = () => {
    if (newItem.trim() === '') return;
    const newItemObject = { id: Date.now().toString(), text: newItem, completed: false };
    setPackingList([...packingList, newItemObject]);
    setNewItem('');
    Keyboard.dismiss();
  };

  const toggleItem = (id) => {
    setPackingList(packingList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.imageContainer}>
        <Image source={displayImage} style={styles.heroImage} />
        <TouchableOpacity style={styles.heartButton} onPress={() => setIsLiked(!isLiked)}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={30} color={isLiked ? "#FF4757" : "#ffffff"} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{cityName}</Text>
        

        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: '#FFEAA7' }]}>
            <Text style={[styles.badgeText, { color: '#D63031' }]}> 24°C</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#DFF9FB' }]}>
            <Text style={[styles.badgeText, { color: '#22A6B3' }]}> Top Rated</Text>
          </View>
        </View>


        <View style={styles.infoCard}>
          <Text style={styles.cardHeader}>Saved Logistics</Text>
          
          <View style={styles.logisticsRow}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(77, 150, 255, 0.15)' }]}>
              <Ionicons name="airplane" size={20} color="#4D96FF" />
            </View>
            <View>
              <Text style={styles.logisticsTitle}>Flight</Text>
              <Text style={styles.logisticsDetail}>Pegasus Airlines</Text>
            </View>
          </View>

          <View style={styles.logisticsRow}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 159, 67, 0.15)' }]}>
              <Ionicons name="train" size={20} color="#FF9F43" />
            </View>
            <View>
              <Text style={styles.logisticsTitle}>Train</Text>
              <Text style={styles.logisticsDetail}>TCDD Taşımacılık A.Ş.</Text>
            </View>
          </View>

          <View style={styles.logisticsRow}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(155, 89, 182, 0.15)' }]}>
              <Ionicons name="subway" size={20} color="#9B59B6" />
            </View>
            <View>
              <Text style={styles.logisticsTitle}>Transit</Text>
              <Text style={styles.logisticsDetail}>Navegante Zapping Fares</Text>
            </View>
          </View>
        </View>


        <View style={styles.infoCard}>
          <Text style={styles.cardHeader}>Packing List</Text>
          
          {packingList.map((item) => (
            <TouchableOpacity key={item.id} style={styles.checklistItem} onPress={() => toggleItem(item.id)}>
              <Ionicons 
                name={item.completed ? "checkmark-circle" : "ellipse-outline"} 
                size={26} 
                color={item.completed ? "#1DD1A1" : "#D1D8E0"} 
              />
              <Text style={[styles.checklistText, item.completed && styles.checklistTextCompleted]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add an item..."
              placeholderTextColor="#A4B0BE"
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={addItem}
            />

            <TouchableOpacity style={styles.addButton} onPress={addItem}>
              <Ionicons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Explore More Places</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  imageContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 350 },
  heartButton: { 
    position: 'absolute', top: 50, right: 20, 
    backgroundColor: 'rgba(255,255,255,0.85)', width: 50, height: 50, borderRadius: 25, 
    justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5
  },
  content: { 
    padding: 24, paddingBottom: 60, marginTop: -40, 
    backgroundColor: '#FAFAFA', borderTopLeftRadius: 32, borderTopRightRadius: 32, 
  },
  title: { fontSize: 36, fontWeight: '900', color: '#2F3640', marginBottom: 12, letterSpacing: -0.5 },
  

  badgeRow: { flexDirection: 'row', marginBottom: 24 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginRight: 10 },
  badgeText: { fontSize: 13, fontWeight: '800' },


  infoCard: { 
    backgroundColor: '#ffffff', padding: 24, borderRadius: 24, marginBottom: 20, 
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 3 
  },
  cardHeader: { fontSize: 20, fontWeight: '800', marginBottom: 20, color: '#2F3640' },
  

  logisticsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  logisticsTitle: { fontSize: 13, color: '#718093', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  logisticsDetail: { fontSize: 16, color: '#2F3640', fontWeight: '700', marginTop: 2 },
  

  checklistItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checklistText: { fontSize: 17, color: '#2F3640', marginLeft: 12, flex: 1, fontWeight: '600' },
  checklistTextCompleted: { color: '#A4B0BE', textDecorationLine: 'line-through' },
  inputContainer: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F1F2F6', padding: 16, borderRadius: 16, fontSize: 16, marginRight: 12, color: '#2F3640', fontWeight: '600' },
  addButton: { backgroundColor: '#1DD1A1', width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#1DD1A1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4 },
  

  backButton: { marginTop: 10, padding: 18, backgroundColor: '#FF6B81', borderRadius: 20, alignItems: 'center', shadowColor: '#FF6B81', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
});
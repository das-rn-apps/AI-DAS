import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, StatusBar, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Questions } from '@/constants/Questions';

const AIToolsLayout = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor={Colors.background} barStyle="light-content" />

    <View style={styles.header}>
      <Text style={styles.headerText}>AI Assistant</Text>
    </View>

    <Image source={require('@/assets/png/connection.png')} style={styles.logo} />

    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Ask me anything..." placeholderTextColor={Colors.placeholder} />
      <TouchableOpacity style={styles.voiceButton}>
        <Ionicons name="mic-outline" size={24} color={Colors.text} />
      </TouchableOpacity>
    </View>

    <Image source={require('@/assets/png/discussion.png')} style={styles.suggestionsTitleImage} />

    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsContainer}>
      {Questions.map((question, index) => (
        <Pressable key={index} style={styles.suggestion} onPress={() => console.log(question)}>
          <Text style={styles.suggestionText}>{question}</Text>
        </Pressable>
      ))}
    </ScrollView>
    <View style={styles.footer}>
      <Image source={require('@/assets/png/d.png')} style={styles.footerText} />
      <Image source={require('@/assets/png/a.png')} style={styles.footerText} />
      <Image source={require('@/assets/png/s.png')} style={styles.footerText} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 10 },
  header: { marginBottom: 30, alignItems: 'center' },
  headerText: { fontSize: 32, fontWeight: '600', color: Colors.text, letterSpacing: 1.5 },
  logo: { width: 280, height: 280, borderRadius: 20, marginBottom: 30, alignSelf: "center" },
  inputContainer: {
    flexDirection: 'row', alignSelf: "center", alignItems: 'center', backgroundColor: Colors.inputBackground, borderRadius: 30,
    paddingHorizontal: 20, paddingVertical: 12, width: '100%', marginBottom: 30, shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 10,
  },
  input: { flex: 1, color: Colors.text, fontSize: 16, paddingVertical: 10 },
  voiceButton: { marginLeft: 15, backgroundColor: Colors.primary, borderRadius: 25, padding: 12 },
  suggestionsTitleImage: { width: 30, height: 30, marginLeft: 10, },
  suggestionsContainer: { padding: 10 },
  suggestion: { backgroundColor: Colors.primary, borderRadius: 25, paddingHorizontal: 18, paddingVertical: 12, marginRight: 7, height: 47 },
  suggestionText: { color: Colors.text, fontSize: 16, fontWeight: '500', alignItems: "center" },
  footer: { display: "flex", flexDirection: "row", justifyContent: "center" },
  footerText: { width: 10, height: 10 },
});

export default AIToolsLayout;

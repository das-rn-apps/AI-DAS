import React, { useState } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, } from 'react-native';
import Footer from '@/components/Footer';
import InputSection from '@/components/InputSection';
import Suggestions from '@/components/Suggestions';
import ResponseModal from '@/components/ResponseModal';
import { Colors } from '@/constants/Colors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Extra from '@/components/Extra';
import { API_KEY, MODEL } from '@env';

const Main = () => {
  const [messages, setResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  console.log(API_KEY);
  const fetchAIResponse = async (question: string) => {
    if (!question.trim()) return;
    try {
      setModalVisible(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL });
      const result = await model.generateContent(question);
      const botMessageText = result.response.text();
      const botResponse = botMessageText || "Sorry, I couldn't understand that.";
      setResponse(botResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error fetching response. Please try again later.");
      setModalVisible(true);
    }
    setUserInput("");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.background} />
      <Image source={require('@/assets/png/connection.png')} style={styles.logo} />

      <InputSection
        userInput={userInput}
        setUserInput={setUserInput}
        fetchAIResponse={fetchAIResponse}
      />

      <Extra />
      <Suggestions
        setUserInput={setUserInput}
        fetchAIResponse={fetchAIResponse}
      />
      <Footer />

      <ResponseModal
        isVisible={isModalVisible}
        onClose={() => { setModalVisible(false), setResponse('') }}
        responseMessage={messages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
    paddingTop: 50,
  },
  logo: {
    width: 280,
    height: 280,
    borderRadius: 20,
    marginBottom: 30,
    alignSelf: "center",
  },

  testButton: {
    backgroundColor: Colors.secondary,
    padding: 30,
    margin: 30,
    borderRadius: 45,
  },
});

export default Main;

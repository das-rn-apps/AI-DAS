import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Colors } from "@/constants/Colors";
import { API_KEY, MODEL } from '@env';

const App = () => {
    const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! Ask me anything about AI." }]);
    const [userInput, setUserInput] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);

    const fetchAIResponse = async () => {
        if (!userInput.trim()) return;


        const userMessage = { sender: "user", text: userInput };
        setMessages((prev) => [...prev, userMessage]);
        setUserInput("");

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL });

            const result = await model.generateContent(userInput);

            const botMessageText = result.response.text();

            const botResponse = { sender: "bot", text: botMessageText || "Sorry, I couldn't understand that." };

            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorResponse = { sender: "bot", text: "Error fetching response. Please try again later." };
            setMessages((prev) => [...prev, errorResponse]);
        }
    };

    // Auto-scroll to the end whenever messages change
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
            <ScrollView
                ref={scrollViewRef}
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContent}
                keyboardShouldPersistTaps="handled">
                {messages.map((message, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageBubble,
                            message.sender === "user" ? styles.userBubble : styles.botBubble,
                        ]}>
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your query..."
                    placeholderTextColor={Colors.placeholder}
                    value={userInput}
                    onChangeText={setUserInput}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={fetchAIResponse}>
                    <Text style={styles.sendButtonText}>Ask</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background, // Using Colors from the constants
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    chatContent: {
        paddingTop: 15,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 18,
        marginVertical: 7,
        maxWidth: "90%",
        justifyContent: "center",
    },
    userBubble: {
        alignSelf: "flex-end",
        backgroundColor: Colors.primary, // Using primary color for user message
    },
    botBubble: {
        alignSelf: "flex-start",
        backgroundColor: Colors.cardBackground, // Using card background for bot message
    },
    messageText: {
        fontSize: 16,
        color: Colors.text, // Text color from Colors
        lineHeight: 22,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.border, // Using border color from Colors
        backgroundColor: Colors.inputBackground, // Input background from Colors
    },
    input: {
        flex: 1,
        padding: 12,
        borderRadius: 25,
        backgroundColor: Colors.inputBackground, // Using input background from Colors
        borderWidth: 1,
        borderColor: Colors.border, // Using border color from Colors
        fontSize: 16,
        color: Colors.text, // Input text color from Colors
        marginRight: 15,
        height: 45,
    },
    sendButton: {
        backgroundColor: Colors.primary, // Button background from Colors
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: 45,
    },
    sendButtonText: {
        color: Colors.buttonText, // Button text color from Colors
        fontSize: 16,
        fontWeight: "600",
    },
});

export default App;

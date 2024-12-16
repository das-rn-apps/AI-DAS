import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { Questions } from '@/constants/Questions';
import { Colors } from '@/constants/Colors';

interface InputSectionProps {
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
    fetchAIResponse: (question: string) => void;
}

const Suggestions: React.FC<InputSectionProps> = ({ setUserInput, fetchAIResponse }) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestionsContainer}
    >
        {Questions.map((question, index) => (
            <Pressable
                key={index}
                style={styles.suggestion}
                onPress={() => {
                    setUserInput(question);
                    fetchAIResponse(question);
                }}
            >
                <Text style={styles.suggestionText}>{question}</Text>
            </Pressable>
        ))}
    </ScrollView>
);

const styles = StyleSheet.create({
    suggestionsContainer: {
        padding: 10,
    },
    suggestion: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        paddingHorizontal: 18,
        paddingVertical: 12,
        marginRight: 7,
        height: 47,
    },
    suggestionText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '500',
        alignItems: "center",
    },
});

export default Suggestions;

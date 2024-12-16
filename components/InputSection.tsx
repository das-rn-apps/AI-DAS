import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
interface InputSectionProps {
    userInput: string;
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
    fetchAIResponse: (question: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ userInput, setUserInput, fetchAIResponse }) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={Colors.placeholder}
            value={userInput}
            onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.voiceButton} onPress={() => fetchAIResponse(userInput)}>
            <Ionicons name="mic-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignSelf: "center",
        alignItems: 'center',
        backgroundColor: Colors.inputBackground,
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: '100%',
        marginBottom: 30,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 10,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 16,
        paddingVertical: 10,
    },
    voiceButton: {
        marginLeft: 15,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        padding: 12,
    },
});

export default InputSection;

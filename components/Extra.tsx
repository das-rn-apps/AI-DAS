import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

const Extra = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/png/discussion.png')}
                style={styles.suggestionsTitleImage}
            />
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                    router.push("/chat");
                }}
            >
                <Ionicons name="chatbox-ellipses" size={28} color={Colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

export default Extra;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    suggestionsTitleImage: {
        width: 30,
        height: 30,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

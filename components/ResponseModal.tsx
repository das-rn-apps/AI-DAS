import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    ScrollView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import FloatingLoader from './FloatingLoader';

interface ResponseModalProps {
    isVisible: boolean;
    onClose: () => void;
    responseMessage: string | null; // Response can be null initially
}

const ResponseModal: React.FC<ResponseModalProps> = ({
    isVisible,
    onClose,
    responseMessage,
}) => {
    const translateY = useRef(new Animated.Value(-Dimensions.get('window').height)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: -Dimensions.get('window').height,
                duration: 700,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <StatusBar backgroundColor='rgba(42, 9, 42, 0.98)' />

            <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
                    <TouchableOpacity style={styles.cancelIcon} onPress={onClose}>
                        <Ionicons name="close-circle" size={28} color={Colors.text} />
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Text style={styles.title}>AI Response</Text>
                        {responseMessage === "" ? (
                            <FloatingLoader />
                        ) : (
                            <Text style={styles.responseText}>{responseMessage}</Text>
                        )}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(50, 15, 50, 0.85)',
        width: "98%",
    },
    modalContent: {
        width: '98%',
        marginTop: -20,
        backgroundColor: Colors.background,
        borderRadius: 20,
        padding: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
        height: '95%',
        position: 'relative',
    },
    cancelIcon: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.gradientEnd,
        marginTop: 10,
    },
    responseText: {
        fontSize: 14,
        color: Colors.text,
        padding: 3,
    },
});

export default ResponseModal;

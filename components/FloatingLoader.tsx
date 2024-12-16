// FloatingLoader.tsx
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors'; // Update this path according to your project structure

const FloatingLoader: React.FC = () => {
    const scaleValue = useRef(new Animated.Value(1)).current; // For pulsating effect

    useEffect(() => {
        // Pulsating animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleValue]);

    return (
        <Animated.View style={[styles.loader, { transform: [{ scale: scaleValue }] }]}>
            <View style={styles.loaderDot} />
            <View style={styles.loaderDot} />
            <View style={styles.loaderDot} />
            <View style={styles.loaderDot} />
            <View style={styles.loaderDot} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: "row",
        gap: 5
    },
    loaderDot: {
        width: 15,
        height: 15,
        borderRadius: 8,
        backgroundColor: Colors.gradientStart,
    },
});

export default FloatingLoader;

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Footer = () => (
    <View style={styles.footer}>
        <Image source={require('@/assets/png/d.png')} style={styles.footerText} />
        <Image source={require('@/assets/png/a.png')} style={styles.footerText} />
        <Image source={require('@/assets/png/s.png')} style={styles.footerText} />
    </View>
);

const styles = StyleSheet.create({
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    footerText: {
        width: 10,
        height: 10,
    },
});

export default Footer;

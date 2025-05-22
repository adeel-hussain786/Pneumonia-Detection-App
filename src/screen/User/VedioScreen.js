import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const VedioScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <Text style={styles.headerTitle}>Understanding Pneumonia</Text>
          <Image
            source={require('C:\\Users\\Adeel Hussain\\Hussain\\src\\assests\\xray.png')}
            style={styles.icon}
          />
        </View>
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: 'https://www.youtube.com/embed/vp8FXgcunfE' }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  header: {
    marginTop: 33,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745',
    marginRight: 10,
    marginLeft:27,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  webview: {
    height: 220,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 4,
  },
});

export default VedioScreen;

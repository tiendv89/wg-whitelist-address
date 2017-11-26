import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRScanner from './app/containers/QRScanner';

export default class App extends React.Component {
  render() {
    return (
      <QRScanner/>
    );
  }
}

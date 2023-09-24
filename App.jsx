import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import UpperView from './Components/UpperView';
import LowerView from './Components/LowerView';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <View style={styles.container}>
      <UpperView />
      <LowerView />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});

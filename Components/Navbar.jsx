import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Navbar = () => {
  return (
    <View style={styles.navigation}>
      <Text style={styles.navtext}>Home Automation</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navigation: {
    width: '100%',
    elevation: 10,
    backgroundColor: 'white',
  },
  navtext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: 'black',
    textAlign: 'center',
  },
});

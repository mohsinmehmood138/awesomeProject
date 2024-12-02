import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ color = '#ccc', thickness = 2, marginVertical = 1 }) => {
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: color, height: thickness, marginVertical },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default Divider;

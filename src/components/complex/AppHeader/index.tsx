import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CrossIcon from 'react-native-vector-icons/Ionicons';

interface HeaderScript {
  title: string;
  name: string;
  onPress: () => void;
  backIcon: any;
}

const Header: React.FC<HeaderScript> = ({title, name, onPress, backIcon}) => {
  return (
    <View style={styles.header}>
      <CrossIcon
        name={backIcon}
        size={30}
        style={{marginLeft: 20}}
        onPress={onPress}
      />

      <Icon name={name} size={20} onPress={onPress} />

      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Roboto-Black',
  },
  backText: {
    fontSize: 24,
    color: 'black',
  },
});

export default Header;

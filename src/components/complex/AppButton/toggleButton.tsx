import React, { useState } from 'react';
import colors from '../../../shared/theme/colors';
import { FONT_FAMILY } from '../../../shared/theme/fonts';
import BellIcon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Switch } from 'react-native';

const NotificationToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(prevState => !prevState);
  };

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.iconTextContainer}>
        <BellIcon
          name="notifications"
          size={24}
          color={colors.primary}
          style={styles.icon}
        />
        <Text style={styles.notificationText}>Notifications</Text>
      </View>
      <Switch
        trackColor={{ false: '#767577', true: colors.backgroundColor }}
        thumbColor={isEnabled ? 'white' : 'black'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default NotificationToggle;

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: 'black',
  },
  notificationText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.MEDIUM,
    color: 'black',
  },
});

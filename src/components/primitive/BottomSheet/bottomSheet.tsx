import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import { View, Text, StyleSheet, ToastAndroid, Linking } from 'react-native';
import {
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
  WhatsAppIcon,
} from '../../../assets/icons/icons';

interface BottomSheetProps {
  refRBSheet: any;
  userProfileData: any;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  refRBSheet,
  userProfileData,
}) => {
  const WhatsAppLink = () => {
    const phoneNumber = '03049617020';
    const message = userProfileData?.phone;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed on your device.');
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(userProfileData?.phone);
    ToastAndroid.show(userProfileData?.phone, ToastAndroid.SHORT);
  };

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={{ marginLeft: 45 }}>
          <View style={styles.shareAppText}>
            <Text style={styles.bottomSheetText}>Share At Social Apps</Text>
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
              <GoogleIcon onPress={() => ''} />
              <FacebookIcon onPress={() => ''} />
              <TwitterIcon />
              <WhatsAppIcon onPress={WhatsAppLink} />
            </View>
          </View>

          <Text style={styles.bottomSheetText}>Copy Link</Text>
          <View style={styles.clipBoardContainer}>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.clipBoardText}>{userProfileData?.phone}</Text>
            </View>
            <View>
              <Icon
                name="clipboard"
                size={30}
                color="grey"
                style={{ marginRight: 10, marginTop: 0 }}
                onPress={copyToClipboard}
              />
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  shareAppText: {
    marginTop: 40,
  },
  bottomSheetText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clipBoardContainer: {
    width: 250,
    height: 40,
    marginTop: 20,
    backgroundColor: '#fff2eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  clipBoardText: {
    fontWeight: 'bold',
  },
});

export default BottomSheet;

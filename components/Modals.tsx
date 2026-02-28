import { ReactElement } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Modals({showModal, addheight, children}: {showModal: boolean, addheight?: any, children: ReactElement}) {

  const {top, bottom} = useSafeAreaInsets()

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => !showModal}
      onBackButtonPress={() => !showModal} // Android back button
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 20, paddingBottom: bottom }}>
        {children}
      </View>
    </Modal>
  )
}
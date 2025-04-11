import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {useTheme} from '../theme/ThemeContext.tsx';
import {ModalParams} from './modalTypes.ts';

type Props = ModalParams['confirm'] & {
  visible: boolean;
  onClose: () => void;
};

const ConfirmModal = ({visible, title, message, onConfirm, onCancel, onClose}: Props) => {
  const theme = useTheme();

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal isVisible={visible} onBackdropPress={handleCancel}>
      <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.title, {color: theme.colors.text}]}>{title}</Text>
        {!!message && <Text style={{color: theme.colors.text}}>{message}</Text>}

        <View style={styles.buttons}>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="OK" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ConfirmModal;

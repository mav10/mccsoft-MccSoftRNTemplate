import React, {createContext, useCallback, useContext, useState} from 'react';

import ConfirmModal from './ConfirmModal.tsx';
import {ModalKey, ModalParams} from './modalTypes';

type ActiveModal = {
  key: ModalKey;
  props: any;
};

type ModalContextType = {
  showModal: <T extends ModalKey>(key: T, props: ModalParams[T]) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const showModal = useCallback(<T extends ModalKey>(key: T, props: ModalParams[T]) => {
    setActiveModal({
      key,
      props,
    });
  }, []);

  const hideModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const renderModal = () => {
    if (!activeModal) return null;

    const {key, props} = activeModal;

    switch (key) {
      case 'confirm':
        return <ConfirmModal visible={true} {...props} onClose={hideModal} />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
      }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext must be used within ModalProvider');
  return context;
};

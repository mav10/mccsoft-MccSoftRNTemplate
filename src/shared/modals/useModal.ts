import {useModalContext} from './ModalProvider';
import {ModalKey, ModalParams} from './modalTypes';

export function useModal() {
  const {showModal, hideModal} = useModalContext();

  return {
    showModal: <T extends ModalKey>(key: T, props: ModalParams[T]) => {
      showModal(key, props);
    },
    hideModal,
  };
}

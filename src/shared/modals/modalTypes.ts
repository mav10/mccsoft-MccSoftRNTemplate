export type ModalKey = 'confirm';

export type ModalParams = {
  confirm: {
    title: string;
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  };
};

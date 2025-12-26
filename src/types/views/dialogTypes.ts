export type DialogProps = {
  isOpen: boolean;
  title: string;
  contentPopup: string;
  buttonLeft: string;
  buttonRight: string;
  onClickButtonLeft: () => void;
  onClickButtonRight: () => void;
};

// Define the DialogProps object
export const initialDialog: DialogProps = {
  isOpen: false,
  title: "Thông báo",
  contentPopup: "",
  buttonLeft: "Đóng",
  buttonRight: "Tiếp tục",
  onClickButtonLeft: () => {},
  onClickButtonRight: () => {},
};

export type ConfirmDialogPropsStoreRedux = {
  isOpen: boolean;
  title: string;
  contentPopup: string;
  buttonLeft: string;
  buttonRight: string;
  onClickButtonLeft?: () => void;
  onClickButtonRight?: () => void;
};

export interface DialogTypeExtra {
  title: string;
  message: string;
  open: boolean;
  buttonAgree?: string;
  buttonDisagree?: string;
  isExtra: boolean;
  onAgree?: () => void;
  onDisagree?: () => void;
  onDisExtra?: () => void;
}

export type PullUpAddressProps = Readonly<{
  open: boolean;
  data: any;
  title: string;
  dynamicKey: string;
  selected: any;
  dataOut: (data: any) => any;
  onClose: () => void;
}>;

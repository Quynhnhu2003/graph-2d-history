// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { CSSProperties, ReactNode } from 'react';

// ** Another Import
import toast from 'react-hot-toast';

type Position = 'top' | 'bottom';
type ToastType = 'success' | 'error' | 'blank';

type NotifyProps = {
  message: string;
  duration?: number;
  toastType: ToastType;
  toastPosition?: Position;
  toastStyle?: CSSProperties;
  hasButton: boolean;
  isFirstCall?: boolean;
};

type NotifyCustomProps = {
  message: string;
  icon: ReactNode;
  duration?: number;
  toastType: 'custom';
  toastPosition?: Position;
  toastStyle?: CSSProperties;
  hasButton: boolean;
  isFirstCall?: boolean;
};

type PropsType = NotifyProps | NotifyCustomProps;

const iconSuccess = (
  <svg
    width='25'
    height='24'
    viewBox='0 0 25 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12.2266 22C17.7266 22 22.2266 17.5 22.2266 12C22.2266 6.5 17.7266 2 12.2266 2C6.72656 2 2.22656 6.5 2.22656 12C2.22656 17.5 6.72656 22 12.2266 22Z'
      stroke='#55DB1E'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7.97656 11.9999L10.8066 14.8299L16.4766 9.16992'
      stroke='#55DB1E'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const iconError = (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
      stroke='#FF2156'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M9.16992 14.8299L14.8299 9.16992'
      stroke='#FF2156'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14.8299 14.8299L9.16992 9.16992'
      stroke='#FF2156'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// ** Function:
function isCustomToast(props: PropsType): props is NotifyCustomProps {
  // Feature: assign type to PropsType
  return props.toastType === 'custom';
}

function notify(props: PropsType, timeDuration?: number) {
  // hasButton prop is used to check display notify with button
  const {
    message,
    duration = timeDuration ? timeDuration : 3000,
    toastType,
    toastPosition = 'top',
    toastStyle = {},
    hasButton,
    isFirstCall,
  } = props;

  // Tính khoảng cách phù hợp
  const marginBottom = hasButton && isFirstCall ? '6rem' : '0';

  const selectedIcon = isCustomToast(props)
    ? props.icon
    : toastType === 'success'
    ? iconSuccess
    : toastType === 'error'
    ? iconError
    : null;

  toast.custom(
    (t) => (
      <div
        className={`${styles.toastifyContainer} ${
          t.visible ? styles['toastifyContainer--visible'] : ''
        }`}
        style={{ ...toastStyle, marginBottom }}
      >
        {selectedIcon}
        <p className={styles.toastifyContainer__content}>{message}</p>
      </div>
    ),
    {
      duration,
      position: toastPosition === 'top' ? 'top-center' : 'bottom-center',
    }
  );
}

export default notify;

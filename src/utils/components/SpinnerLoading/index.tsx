// ** Styles Imports
import styles from './index.module.scss';

// ** Third Party Imports
import Lottie from 'lottie-react';

// ** Another Imports
import loadingJson from '../../../assets/loading.json';

export const SpinnerLoading = () => {
  return (
    <div className={styles.spinnerLoading}>
      <Lottie
        className={styles.spinnerLoading__lottie}
        animationData={loadingJson}
        loop={true}
      />
    </div>
  );
};

export default SpinnerLoading;

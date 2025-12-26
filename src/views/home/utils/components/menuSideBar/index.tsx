// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import { Dialog } from '@mui/material';
import { Transition } from '../../../../../utils/components/Transition';
import { useAppSelector } from '../../../../../hooks/useReduxHook';
import { useDispatch } from 'react-redux';
import { handleShowMenubar } from '../../../store/headerStore';
import { useEffect } from 'react';

function MenuSidebar() {
    // ** Hook
    const dispatch = useDispatch();
    const {showMenubar} = useAppSelector((store) => store.home.header)

    // ** function
    const closeSideBar = () => {
        dispatch(handleShowMenubar(!showMenubar));
    }

    useEffect(() => {
        console.log('showMenubar', showMenubar)
    }, [showMenubar]);
    return (
        <Dialog
      fullScreen
      open={showMenubar}
      onClose={closeSideBar}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          position: "fixed",
          bottom: 0,
          margin: 0,
          width: "100%",
          maxHeight: "70%",
          borderRadius: "16px 16px 0 0",
          height: "auto",
          overflow: "hidden",
        },
      }}
      className={styles.modalAddress}
    >
      <button className={styles.handle} onClick={closeSideBar}></button>
      
    </Dialog>
    )
}

export default MenuSidebar
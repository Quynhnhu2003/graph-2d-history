// ** React Imports
import { RouteObject, useRoutes } from 'react-router-dom';

// ** Component Imports
import homeRoutes from '../views/home/routes/homeRoutes';

// ** Redux
import { resetDialogContent } from '../store/dialogStore';

// ** Tracking
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHook';
import ConfirmDialogCustom from '../utils/components/CustomConfirmDialog';

const listRouters = [
  ...homeRoutes,
];

const RouterComponent = () => {
  const dispatch = useAppDispatch();

  // ** Redux States
  const { dialogContent } = useAppSelector((store:any) => store.dialog);
  const listRoute: RouteObject[] = listRouters.map((item) => {
    return {
      path: item.path,
      element: item.element,
      children: item.children?.map((child) => ({
        path: child.path,
        element: child.element,
      })),
    };
  });

  // ** Routes and Tracking Hooks
  const routing = useRoutes(listRoute);

  // Dialog Handlers
  const closeDialog = () => {
    dispatch(resetDialogContent());
  };

  const clickDialogLeftButton = () => {
    closeDialog();
    dialogContent.onClickButtonLeft?.();
  };

  const clickDialogRightButton = () => {
    closeDialog();
    dialogContent.onClickButtonRight?.();
  };


  // Render app routes and dialog
  return (
    <>
      {routing}
      <ConfirmDialogCustom
        isOpen={dialogContent.isOpen}
        title={dialogContent.title}
        contentPopup={dialogContent.contentPopup}
        buttonLeft={dialogContent.buttonLeft}
        buttonRight={dialogContent.buttonRight}
        onClickButtonLeft={
          dialogContent.onClickButtonLeft ? clickDialogLeftButton : closeDialog
        }
        onClickButtonRight={
          dialogContent.onClickButtonRight
            ? clickDialogRightButton
            : closeDialog
        }
      />
    </>
  );
};

export default RouterComponent;

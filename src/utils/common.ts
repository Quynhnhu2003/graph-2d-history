
export const showDevtools = () => {
  // Feature: Check to show devtoolsq
  return true;
};

export const clickBackAtHeader = async () => {
  // Feature: Handle  Back Device Button (Android) and back at Header Back button
  // MiniAppOptimalHiFPTInstance.backToPreviousScreen();
  window.history.back();
};

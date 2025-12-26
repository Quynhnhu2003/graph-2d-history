import { useEffect } from "react";
import { clickBackAtHeader } from "../utils/common";

declare global {
  interface Window {
    resultBackDevice: (data: string) => void;
  }
}
export default function useBackDeviceAndroidHooks() {
  const resultBackDevice = () => {
    clickBackAtHeader();
  };

  useEffect(() => {
    window.resultBackDevice = resultBackDevice;
  }, []);
}

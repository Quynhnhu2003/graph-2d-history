// ** Another Import
import { Outlet } from "react-router-dom";

export default function LayoutHome() {
  return (
    <div style={{ height: "100vh" }}>
      <Outlet />
    </div>
  );
}

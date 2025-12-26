// ** React Imports
import { Provider } from "react-redux";

// ** Third Party Components
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ** Another Imports
import { store } from "./store";
import RouterComponent from "./routes";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { BrowserRouter } from "react-router-dom";
import ToastifyProvider from "./utils/components/Toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <ToastifyProvider />
          <RouterComponent />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};
export default Layout;

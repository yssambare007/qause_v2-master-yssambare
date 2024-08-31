import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient();

const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="275557623285-bh2goqt02drc5nr4mqchaktvsgf703fc.apps.googleusercontent.com">
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

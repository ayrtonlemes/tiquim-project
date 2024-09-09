import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";
import AuthProvider from "./states/AuthProvider";
import SnackbarStateProvider from "./states/SnackbarProvider";
import CustomSnackbar from "./components/CustomSnackbar";
import { Payment } from "@mui/icons-material";
import PaymentContext, { PaymentProvider } from "./states/PaymentProvider";

export const metadata: Metadata = {
  title: "Tiquim",
  description: "Plataforma de financiamento coletivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          <SnackbarStateProvider>
            <AuthProvider>
              <PaymentProvider>
                <Navbar />
                {children}
                <CustomSnackbar />
                <Footer />
              </PaymentProvider>
            </AuthProvider>
          </SnackbarStateProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

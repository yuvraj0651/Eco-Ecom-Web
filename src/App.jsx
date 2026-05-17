import { useState } from "react";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./components/context/Theme/ThemeProvider";
import Header from "./components/Layout/Header/Header";
import useDebounce from "./components/Hooks/useDebounce";
import Footer from "./components/Layout/Footer/Footer";
import ScrollTop from "./components/UI/ScrollTop/ScrollTop";
import AppRoutes from "./components/Routes/AppRoutes/AppRouutes";

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* Scroll To Top */}
        <ScrollTop />
        {/* Toast */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          containerStyle={{
            top: 20,
            right: 20,
          }}
          toastOptions={{
            duration: 3000,

            style: {
              background: "rgba(15,23,42,0.95)",
              color: "#fff",
              borderRadius: "16px",
              padding: "16px 18px",
              fontSize: "14px",
              fontWeight: "500",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.08)",
            },

            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <div className="font-poppins">
          {/* Header Section */}
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* Main Section */}
          <main className="main-section dark:bg-slate-600 pt-[3.9rem]">
            <AppRoutes debouncedSearch={debouncedSearch} />
          </main>
          {/* Footer Section */}
          <Footer />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

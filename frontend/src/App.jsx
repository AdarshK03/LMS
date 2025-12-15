import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import VerifyOtp from "./pages/VerifyOTP.jsx";
import ResetPassword from "./pages/ResetPassword";
import LibraryAssistant from "./components/LibraryAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<LoginPage />}/>
          {/*<Route path="/home" element = {<Index />}/> */}
          <Route path="/forgot-password" element ={<ForgotPassword />} />
          
          
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* Protected Route so users can not access home page without logging in */}
          <Route path="/home"element={<ProtectedRoute><Index /></ProtectedRoute>}/>
          <Route path="/verify-otp" element={<ProtectedRoute><VerifyOtp /></ProtectedRoute>} /> 
          <Route path="/reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
          <Route path="/assistant" element={<ProtectedRoute><LibraryAssistant /></ProtectedRoute>}/>
          
          {/* Add this new route for AI chatbot */}
          <Route path="/create-account" element={<CreateAccount />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

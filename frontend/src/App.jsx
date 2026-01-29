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
import IssueBook from "./pages/IssueBook.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import IssueBookFinal from "./pages/IssueBookFinal.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<LoginPage />}/>
          <Route path="/admin-page" element ={<AdminPage />} />
          <Route path="/forgot-password" element ={<ForgotPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/home"element={<Index />}/>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/verify-otp" element={<VerifyOtp />} /> 
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/assistant" element={<LibraryAssistant />}/>
          <Route path="/issue-book/:bookId" element={<IssueBook />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/issue-book/:bookId" element={<IssueBookFinal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

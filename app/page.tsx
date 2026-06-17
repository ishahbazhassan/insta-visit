"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import LoginPage from "../features/auth/components/LoginPage";
import SignUpPage from "../features/auth/components/SignUpPage";
import ForgotPasswordPage from "../features/auth/components/ForgotPasswordPage";
import OTPVerificationPage from "../features/auth/components/OTPVerificationPage";
import ResetPasswordPage from "../features/auth/components/ResetPasswordPage";
// import instaVisitLogo from "../../assets/icons/instaVisit.svg";

type AuthPage =
  | "login"
  | "signUp"
  | "forgotPassword"
  | "otpVerification"
  | "resetPassword";

const AuthModal = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<AuthPage>("login");
  const [userEmail, setUserEmail] = useState<string>("");

  const navigateTo = (page: AuthPage) => setCurrentPage(page);

  const handleForgotSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentPage("otpVerification");
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      <Toaster position="top-center" />
      {/* <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <img src={instaVisitLogo} alt="Logo" className="h-auto w-auto" />
      </div> */}

      <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
        <div className="w-full max-w-[550px] p-8 bg-white rounded-lg">
          {currentPage === "login" && (
            <LoginPage
              onNavigate={navigateTo}
              onLoginSuccess={() => router.push("/provider/dashboard")}
            />
          )}
          {currentPage === "signUp" && (
            <SignUpPage
              onNavigate={navigateTo}
              onSignUpSuccess={() => navigateTo("login")}
            />
          )}
          {currentPage === "forgotPassword" && (
            <ForgotPasswordPage
              onNavigate={navigateTo}
              onForgotSuccess={handleForgotSuccess}
            />
          )}
          {currentPage === "otpVerification" && (
            <OTPVerificationPage
              onNavigate={navigateTo}
              userEmail={userEmail}
            />
          )}
          {currentPage === "resetPassword" && (
            <ResetPasswordPage onNavigate={navigateTo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

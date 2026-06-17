"use client";

import { Toaster } from "react-hot-toast";

type AuthShellProps = {
  children: React.ReactNode;
};

const AuthShell = ({ children }: AuthShellProps) => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <Toaster position="top-center" />
      <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
        <div className="w-full max-w-[550px] rounded-lg bg-white p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthShell;

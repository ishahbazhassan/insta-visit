"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiExclamation } from "react-icons/hi";
import Button from "@/app/components/ui/button/Button";

type LogoutConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-2xl bg-white px-8 py-10 text-center shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBE5F1]">
          <div className="flex h-10 w-10 rotate-45 items-center justify-center rounded-md bg-[#705295]">
            <HiExclamation size={22} className="-rotate-45 text-white" />
          </div>
        </div>

        <p
          id="logout-modal-title"
          className="mb-8 text-lg font-medium text-[#0A1E25]"
        >
          Are You Sure you want to logout
        </p>

        <div className="flex gap-4">
          <Button
            type="button"
            label="Back"
            bgColor="bg-[#9CA3AF]"
            className="flex-1"
            onClick={onClose}
          />
          <Button
            type="button"
            label="Logout"
            bgColor="bg-[#F76D00]"
            className="flex-1"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default LogoutConfirmModal;

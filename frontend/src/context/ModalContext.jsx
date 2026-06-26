import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);

  const showModal = (modalTitle, modalContent) => {
    setTitle(modalTitle);
    setContent(modalContent);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const value = useMemo(() => ({ showModal, closeModal }), []);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>{content}</DialogContent>

      </Dialog>
    </ModalContext.Provider>
  );
};
import React, { FC } from "react";
import { createPortal } from "react-dom";

import { StyledModal } from "./styles";

interface Props {
  onClose?: () => void;
  open?: boolean;
}

const modalRoot = document.getElementById("modal-root");

const Modal: FC<Props> = ({ children, onClose }) => {
  if (modalRoot)
    return createPortal(<StyledModal>{children}</StyledModal>, modalRoot);
  return <div></div>;
};

export default Modal;

import React, { FC } from "react";
import { createPortal } from "react-dom";

import { StyledModal } from "./style";

interface Props {
  onClose?: () => void;
  open?: boolean;
}

const modalRoot = document.getElementById("modal-root");

const Modal: FC<Props> = ({ children, onClose, open }) => {
  if (modalRoot && open)
    return createPortal(<StyledModal>{children}</StyledModal>, modalRoot);
  return <div></div>;
};

export default Modal;

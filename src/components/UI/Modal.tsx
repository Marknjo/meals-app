import { createPortal } from 'react-dom';
import Card from './Card';

import styles from './Modal.module.css';

interface ModalProps {
  children?: React.ReactNode;
  onClickHandler: () => void;
  bgStyle?: string;
}

// Backdrop
const Backdrop = (props: ModalProps) => {
  return <div className={styles.backdrop} onClick={props.onClickHandler}></div>;
};

// Overlay
const ModalOverlay = (props: ModalProps) => {
  return (
    <Card
      bgStyle={props.bgStyle ? props.bgStyle : 'white'}
      pdStyle="pd-lg"
      customClasses={styles.modal}
    >
      <div className={styles.content} onClick={props.onClickHandler}>
        {props.children}
      </div>
    </Card>
  );
};

// Modal

const Modal = (props: ModalProps) => {
  const portalEl = document.getElementById('overlays')! as HTMLDivElement;

  return (
    <>
      {createPortal(
        <ModalOverlay onClickHandler={props.onClickHandler}>
          {props.children}
        </ModalOverlay>,
        portalEl
      )}
      {createPortal(
        <Backdrop onClickHandler={props.onClickHandler} />,
        portalEl
      )}
    </>
  );
};

export default Modal;

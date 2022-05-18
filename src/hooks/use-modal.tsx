import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  return {
    showModal,
    closeModalHandler,
    showModalHandler,
  };
};

export default useModal;

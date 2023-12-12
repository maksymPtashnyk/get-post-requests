import React, { useEffect } from 'react';
import styles from './Modal.module.scss'

function Modal({ children, closeModal }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 5000); 
    return () => clearTimeout(timer);
  }, [closeModal]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modalTitle" className={styles.modal} onClick={closeModal}>
      <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
        <button onClick={closeModal} className={styles.modal__close} aria-label="Close modal">X</button>   
        <h2 id="modalTitle" className={styles.modal__title}>Success</h2>
        <div className={styles.modal__body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
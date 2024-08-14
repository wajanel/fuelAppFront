import Modal from 'react-modal'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const ModalPrueba = () => {

    const onCloseModal = ()=>{
        console.log('Close');
    }


    const onSubmit = ()=>{
        console.log('Submit');
    }



  return (
    <Modal 
        isOpen={false}
        
    >
        <h1> Nuevo eventooo </h1>
<hr />

    </Modal>
  )
}

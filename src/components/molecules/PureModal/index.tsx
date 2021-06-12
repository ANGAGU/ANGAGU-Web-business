/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';

type PureModalProps = {
  buttonLabel: any;
  confirmButtonText: string;
  leftButtonText: string;
  className: any;
  title: string;
  name: any;
  content: React.ReactElement;
  file: any;
};

const PureModal: React.FC<PureModalProps> & {
  defaultProps: Partial<PureModalProps>;
} = props => {
  const { buttonLabel, className, title, name } = props;
  const [modal, setModal] = useState(false);
  // eslint-disable-next-line react/destructuring-assignment
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button outline color="secondary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{getContent(className)}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            변경
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const getContent = (id: string) => {
  let contents;
  console.log(id);
  return contents;
};

PureModal.defaultProps = {
  buttonLabel: 'Modal',
  confirmButtonText: 'Do Something',
  leftButtonText: '',
  className: 'modal',
  title: '',
  name: 'modal',
  content: <div />,
};
export default PureModal;

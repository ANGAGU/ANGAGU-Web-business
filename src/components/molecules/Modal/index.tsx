import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import './style.css';

type ModalMolProps = {
  buttonLabel: any;
  confirmButtonText: string;
  leftButtonText: string;
  className: any;
  title: string;
  name: any;
  content: React.ReactElement;
  file: any;
};

const ModalMol: React.FC<ModalMolProps> & {
  defaultProps: Partial<ModalMolProps>;
} = props => {
  const { buttonLabel, confirmButtonText, leftButtonText, className, title, name, content, file } = props;
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
        <ModalBody>{getContent(className, name)}</ModalBody>
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
const getContent = (id: string, value: string) => {
  let contents;
  console.log(id);
  return contents;
};

ModalMol.defaultProps = {
  buttonLabel: 'Modal',
  confirmButtonText: 'Do Something',
  leftButtonText: '',
  className: 'modal',
  title: '',
  name: 'modal',
  content: <div />,
};
export default ModalMol;

import React, { useState } from 'react';
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

type ModalMolProps = {
  buttonLabel: any;
  className: any;
  title: string;
  name: any;
};

const ModalMol: React.FC<ModalMolProps> = props => {
  const { buttonLabel, className, title, name } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // console.log(className);
  return (
    <div>
      <Button outline color="secondary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title} 설정</ModalHeader>
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
  if (id === 'password') {
    contents = (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{id}</InputGroupText>
          </InputGroupAddon>
          <Input placeholder={value} />
        </InputGroup>
      </div>
    );
  } else if (id === 'accountNumber') {
    contents = (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{id}</InputGroupText>
          </InputGroupAddon>
          <Input placeholder={value} />
        </InputGroup>
      </div>
    );
  } else if (id === 'email') {
    contents = (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{id}</InputGroupText>
          </InputGroupAddon>
          <Input placeholder={value} />
        </InputGroup>
      </div>
    );
  } else if (id === 'phoneNumber') {
    contents = (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{id}</InputGroupText>
          </InputGroupAddon>
          <Input placeholder={value} />
        </InputGroup>
      </div>
    );
  } else if (id === 'businessNumber') {
    contents = (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{id}</InputGroupText>
          </InputGroupAddon>
          <Input placeholder={value} />
        </InputGroup>
      </div>
    );
  } else if (id === '3dModelUrl') {
    contents = (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{id}</InputGroupText>
          </InputGroupAddon>
          <Input placeholder={value} />
        </InputGroup>
      </div>
    );
  }
  return contents;
};
export default ModalMol;

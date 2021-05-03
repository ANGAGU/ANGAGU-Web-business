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
import './style.css';

type ModalMolProps = {
  buttonLabel: any;
  confirmButtonText: string;
  leftButtonText: string;
  leftButtonAction: VoidFunction;
  className: any;
  title: string;
  name: any;
  content: React.ReactElement;
};

const ModalMol: React.FC<ModalMolProps> & {
  defaultProps: Partial<ModalMolProps>;
} = props => {
  const {
    buttonLabel,
    confirmButtonText,
    leftButtonText,
    leftButtonAction,
    className,
    title,
    name,
    content,
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // console.log(className);
  return (
    <div>
      <Button outline color="secondary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        {content.props.children ? (
          <ModalBody>{content}</ModalBody>
        ) : (
          <ModalBody>{getContent(className, name)}</ModalBody>
        )}
        <ModalFooter>
          {leftButtonText ? (
            <Button
              color="secondary"
              className="modal-btn--left"
              onClick={leftButtonAction}
            >
              {leftButtonText}
            </Button>
          ) : null}
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

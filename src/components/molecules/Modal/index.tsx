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
  buttonText: string;
  className: any;
  title: string;
  name: any;
  content: React.ReactElement;
};

const ModalMol: React.FC<ModalMolProps> & {
  defaultProps: Partial<ModalMolProps>;
} = props => {
  const { buttonLabel, buttonText, className, title, name, content } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // console.log(className);
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title} 설정</ModalHeader>
        {content.props.children ? (
          <ModalBody>{content}</ModalBody>
        ) : (
          <ModalBody>{getContent(className, name)}</ModalBody>
        )}
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {buttonText}
          </Button>
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
  }
  return contents;
};

ModalMol.defaultProps = {
  buttonLabel: 'Modal',
  buttonText: 'Do Something',
  className: 'modal',
  title: '',
  name: 'modal',
  content: <div />,
};
export default ModalMol;

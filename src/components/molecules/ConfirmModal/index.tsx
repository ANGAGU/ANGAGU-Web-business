/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import api from 'api';
import './style.css';

type ConfirmModalProps = {
  viewModal: boolean;
  phoneNumber: string;
  type: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  toggleModal: VoidFunction;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

const ConfirmModal: React.FC<ConfirmModalProps> & {
  defaultProps: Partial<ConfirmModalProps>;
} = ({ viewModal, phoneNumber, type, setAuthToken, toggleModal, setCode }) => {
  // const { viewModal, phoneNumber, setAuthToken } = props;
  const [verifyNumber, setVerifyNumber] = useState('' as string);

  const handleVerifyNumber = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    console.log(value);
    setVerifyNumber(value);
  };

  const checkAuthNumber = async () => {
    setCode(verifyNumber);
    let endpoint = '/company/signup/sms/verification';
    if (type === 'pw') endpoint = '/company/find/verification';
    if (type !== 'id') {
      const { status, data } = await api.post(endpoint, {
        phone_number: phoneNumber,
        code: verifyNumber,
      });
      if (status === 'success') {
        alert('OK!');
        setAuthToken(data.token);
      } else {
        console.log('fail for verify sms');
      }
    }
    toggleModal();
  };

  return (
    <Modal isOpen={viewModal} toggle={toggleModal} size="sm" centered>
      <ModalHeader toggle={toggleModal}>인증번호 입력</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          defaultValue={verifyNumber}
          laceholder="인증번호를 입력해주세요."
          onChange={handleVerifyNumber}
          autoComplete={'off'}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={checkAuthNumber}>
          인증번호확인
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  viewModal: false,
  phoneNumber: '01000000000',
};
export default ConfirmModal;

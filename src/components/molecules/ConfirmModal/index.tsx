/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import api from 'api';
import { notify } from 'App';
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
  const [minutes, setMinutes] = useState(5 as number);
  const [seconds, setSeconds] = useState(0 as number);

  useEffect(() => {
    setMinutes(5);
    setSeconds(0);
  }, [viewModal]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const handleVerifyNumber = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    console.log(value);
    setVerifyNumber(value);
  };

  const checkAuthNumber = async () => {
    if (type === 'id') setCode(verifyNumber);
    let endpoint = '/company/signup/sms/verification';
    if (type === 'pw') endpoint = '/company/find/verification';
    if (type !== 'id') {
      const { status, data } = await api.post(endpoint, {
        phone_number: phoneNumber,
        code: verifyNumber,
      });
      if (status === 'success') {
        notify('인증완료!');
        setAuthToken(data.token);
      } else {
        notify('인증에 실패하였습니다.', 'error');
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
        <span className="counter">
          {minutes}:{seconds}
        </span>
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

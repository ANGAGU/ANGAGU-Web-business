import React, { useState, useEffect, TdHTMLAttributes } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Jumbotron,
  Breadcrumb,
  BreadcrumbItem,
  Table,
} from 'reactstrap';
import {
  trStyle,
  JumboStyle,
  InputGroupAddonStyle,
  BreadcrumbItemStyle,
} from './style';

const InfoForm: React.FC = () => {
  const columns = [
    { title: '쇼핑몰명' },
    { title: '관리자명' },
    { title: '상점 아이디' },
    { title: '상점 등급' },
    { title: '대표 휴대전화' },
    { title: '대표 이메일' },
    { title: '기본제공 도메인' },
    { title: '상점대표 도메인' },
  ];
  const temp = (
    <Jumbotron style={JumboStyle}>
      <Breadcrumb style={BreadcrumbItemStyle}>
        <BreadcrumbItem active>기본정보 설정</BreadcrumbItem>
      </Breadcrumb>
      {columns.map((item: any) => {
        return (
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={InputGroupAddonStyle}>
                {item.title}
              </InputGroupText>
            </InputGroupAddon>
            <Input />
          </InputGroup>
        );
      })}
    </Jumbotron>
  );
  return (
    <Table bordered size="sm">
      <thead>
        <tr>
          <td colSpan={2}>기본 정보 설정</td>
        </tr>
      </thead>
      <tbody>
        <tr style={trStyle}>
          <th scope="row">쇼핑몰명</th>
          <td>
            <Input />
          </td>
        </tr>
        <tr>
          <th scope="row">관리자명</th>
          <td>
            <Input />
          </td>
        </tr>
        <tr>
          <th scope="row">상점 아이디</th>
          <td>test</td>
        </tr>
        <tr>
          <th scope="row">대표 휴대전화</th>
          <td>010-0000-0000</td>
        </tr>
        <tr>
          <th scope="row">대표 이메일</th>
          <td>test@test.com</td>
        </tr>
        <tr>
          <th scope="row">기본 제공 도메인</th>
          <td>test.angagu.com</td>
        </tr>
        <tr>
          <th scope="row">상점대표 도메인</th>
          <td>test</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default InfoForm;

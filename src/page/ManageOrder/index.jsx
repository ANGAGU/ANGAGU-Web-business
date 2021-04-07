import React, {useState, useEffect} from 'react';
import {OrderTable, Header, LeftNav} from '../../components';

const ManageOrder = () => {
    return (
        <>
            <Header></Header>
            <LeftNav></LeftNav>
            <OrderTable></OrderTable>
        </>
    )
}

export default ManageOrder;
/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
import api from '../../../api';

const ManageRegister = {
  registerProduct: async id => {
   
    try {
       api.setAxiosDefaultHeader();
      const result = await api.put(`/admin/products/${id}`);
      if (result.status === 'success') {
        // eslint-disable-next-line no-alert
        alert('로그인 성공');
      } else {
        console.log(result);
      }
    } catch {
      console.log('error');
      alert('승인에 실패했습니다.');
    }
  },
  getRegisterProduct: async () => {

    try {
      api.setAxiosDefaultHeader();
      const result = await api.get(`/admin/products`);
      if (result.status === 'success') {
        // eslint-disable-next-line no-alert
        alert('로그인 성공');
        return result.data;
      } else {
        return [];
      }
    } catch {
      console.log('error');
      alert('승인에 실패했습니다.');
      return [];
    }
  },
};

export default ManageRegister;

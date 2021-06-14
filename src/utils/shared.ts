export const isEmail = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(value);
};
export const isPassword = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return regExp.test(value);
};
export const isSame = (str1: string, str2: string): boolean => {
  return str1 === str2;
};

export const string2Date = (value: string) => {
  const year = parseInt(value.substr(0, 4), 10);
  const month = parseInt(value.substr(5, 2), 10);
  return new Date(year, month - 1);
};

export const date2String = (value: Date) => {
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  let result = '';
  if (month < 10) result = `${year}-0${month}`;
  else result = `${year}-${month}`;

  return result;
};
export const date2StringWithTime = (value: string) => {
  let result = '';
  if (value !== null) result = `${value.substr(0, 10)}-${value.substr(11, 5)}`;
  return result;
};

const companyFee = 3;
export const calculateFee = (value: number) => {
  return value * (companyFee / 100);
};

export const makeMoneyStr = (value: string) => {
  return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

export const drawLineGraph = (adjustList: any, isAdmin = false as boolean | null) => {
  const lineLabels = ['', '', '', '', '', ''];
  const lineData = [0, 0, 0, 0, 0, 0];
  let monthAgo = new Date();
  monthAgo = new Date(monthAgo.getFullYear(), monthAgo.getMonth(), 1);

  for (let i = 1; i <= 6; i += 1) {
    monthAgo = new Date(monthAgo.getFullYear(), monthAgo.getMonth() - 1, 1);
    lineLabels[6 - i] = date2String(monthAgo);
  }

  adjustList.map((ad: any) => {
    const date = ad.date.substr(0, 7);
    const idx = lineLabels.findIndex(el => date === el);
    if (idx !== -1) lineData[idx] = isAdmin ? Number(ad.total_price) : ad.price;
    return 0;
  });
  const graphData = {
    labels: lineLabels,
    datasets: [
      {
        label: '월별 수익',
        data: lineData,
        fill: false,
        backgroundColor: 'rgb(97, 157, 160)',
        borderColor: 'rgba(97, 157, 160, 0.5)',
      },
    ],
  };
  return graphData;
};

export const drawDoughnutGraph = (
  profitList: any,
  totalProfit: number,
  isAdmin = false as boolean | null,
) => {
  const doughnutLabels = [] as Array<string>;
  const doughnutData = [] as Array<number>;

  if (profitList.length === 0) {
    doughnutLabels.push(isAdmin ? '조회된 기업이 없습니다' : '판매된 상품이 없습니다');
    doughnutData.push(100);
  }
  const isMany = profitList.length > 6;
  let total = 0;
  const tempList = profitList.sort((a: any, b: any) => Number(b.total_price) - Number(a.total_price));
  tempList.some((el: any, idx: any) => {
    if (idx === 6) return true;
    if (idx === 5 && isMany) {
      doughnutData.push(100 - total);
      doughnutLabels.push('기타');
    }
    let price = 0;
    if (totalProfit !== 0) price = (Number(el.total_price) / totalProfit) * 100;
    total += price;
    doughnutData.push(price);
    doughnutLabels.push(el.name);

    return false;
  });
  const graphData = {
    labels: doughnutLabels,
    datasets: [
      {
        label: '상품 수익률',
        data: doughnutData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return graphData;
};

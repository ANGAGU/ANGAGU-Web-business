import Chance from 'chance';

const Dummy = {
  makeProducts: num => {
    const chance = new Chance();

    const tempArr = [];
    for (let i = 0; i < num; i += 1) {
      tempArr.push({
        id: chance.integer({ min: 0, max: 100 }),
        img: '../../assets/product_test.jpeg',
        name: chance.word(),
        price: chance.dollar(),
        stock: chance.integer({ min: 0, max: 100 }),
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        createDt: chance.date().toDateString(),
      });
    }

    return tempArr;
  },
  makeAdjusts: num => {
    const chance = new Chance();

    const tempArr = [];
    for (let i = 0; i < num; i += 1) {
      tempArr.push({
        profit: chance.dollar(),
        state: '정산완료',
        term: `${chance.date().toDateString()}~${chance.date().toDateString()}`,
        adjustDate: chance.date().toDateString(),
      });
    }

    return tempArr;
  },
};

export default Dummy;

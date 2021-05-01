import Chance from 'chance';

const Dummy = {
  makeProducts: (num: number) => {
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
        create_time: chance.date().toDateString(),
      });
    }

    return tempArr;
  },
};

export default Dummy;

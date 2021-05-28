import Chance from 'chance';
// import testImg from '../assets/product_test.jpeg';

const Dummy = {
  makeProducts: (num: number) => {
    const chance = new Chance();

    const tempArr = [];
    for (let i = 0; i < num; i += 1) {
      tempArr.push({
        id: chance.integer({ min: 0, max: 100 }),
        img: {},
        name: chance.word(),
        price: chance.dollar(),
        stock: chance.integer({ min: 0, max: 100 }),
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        create_time: chance.date().toDateString(),
      });
    }

    return tempArr;
  },
  makeAdjusts: (num: number) => {
    const chance = new Chance();

    const tempArr = [];
    for (let i = 0; i < num; i += 1) {
      tempArr.push({
        id: chance.integer({ min: 0, max: 100 }),
        company: chance.word(),
        term: `${chance.date().toDateString()}~${chance.date().toDateString()}`,
        profit: chance.dollar(),
        revenue: chance.dollar(),
        commission: chance.dollar(),
      });
    }

    return tempArr;
  },
  makeProductProfits: (num: number) => {
    const chance = new Chance();

    const tempArr = [];
    for (let i = 0; i < num; i += 1) {
      tempArr.push({
        id: chance.integer({ min: 0, max: 100 }),
        name: chance.word(),
        price: chance.dollar(),
        sellCount: chance.integer({ min: 0, max: 100 }),
        profit: chance.dollar(),
        revenue: chance.dollar(),
        commission: chance.dollar(),
      });
    }

    return tempArr;
  },

  makeOrder: (num: number) => {
    const chance = new Chance();
    const tempArr = [];
    for (let i = 0; i < num; i += 1) {
      tempArr.push({
        id: chance.integer({ min: 0, max: 100 }),
        name: chance.name(),
        customerId: chance.word(),
        img: {},
        count: chance.integer({ min: 0, max: 100 }),
        price: chance.dollar(),
        deliveryStatus: chance.character({ pool: 'TF' }),
        deliveryNumber: chance.ssn(),
        confirmTime: chance.date().toDateString(),
      });
    }
    return tempArr;
  },

  makeRegister: (num: number) => {
    const chance = new Chance();
    const tempArr = [];
    for (let i = 0; i < num; i += 1) {
      tempArr.push({
        id: chance.integer({ min: 0, max: 100 }),
        company: chance.name(),
        name: chance.name(),
        img: {},
        url_3d: chance.ip(),
        count: chance.integer({ min: 0, max: 100 }),
        price: chance.dollar(),
        confirmTime: chance.date().toDateString(),
      });
    }
    return tempArr;
  },
  chartData: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        // #619c9f
        backgroundColor: 'rgb(97, 157, 160)',
        borderColor: 'rgba(97, 157, 160, 0.5)',
      },
    ],
  },

  chartOptions: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

export default Dummy;

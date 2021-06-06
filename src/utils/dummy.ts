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
        name: chance.word(),
        price: chance.dollar(),
        total_count: chance.integer({ min: 0, max: 100 }),
        total_price: chance.dollar(),
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
        deliveryNumber: '',
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
  doughnutChartData: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3].sort((a, b) => b - a),
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
  },
};

export default Dummy;

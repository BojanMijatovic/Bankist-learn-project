'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



//  display new movements
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
           <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//  create user name
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  })
}

createUserNames(accounts);

//  update UI
const updateUI = function (acc) {
  //  display movements
  displayMovements(acc.movements);
  //  calc balance
  calcDisplayBalance(acc);
  //  display summary
  calcDisplaySummary(acc.movements);
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//  for each
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(function (move, i) {
//   move > 0 ? console.log(`${i + 1} add money ${move}`) : console.log(`${i + 1} withdraw money ${move}`);
// })

// currencies.forEach(function (value, key) {
//   return console.log(`${key} value is ${value}`);
// })

/////////////////////////////////////////////////

//   slice
const arr = ['a', 'b', 'c', 'd', 'e'];
const a = arr.slice(0, 1);
// console.log(a);
const b = [...arr];
// console.log(b);

//  splice
const last = arr.splice(arr.length - 1, 1);
// console.log(last);

//  reverse
const reverse = arr.reverse();
// console.log(reverse);

// const juliaPets = [12, 32, 3, 25, 6, 7, 1, 2];
// const emyPets = [10, 33, 1, 2, 34];

// const juliaDogs = juliaPets.splice(0, juliaPets.length - 2);
// const emyDogs = emyPets.splice(0, emyPets.length - 2);

// console.log(juliaDogs);
// console.log(emyDogs);

// const pets = [...juliaDogs, ...emyDogs];
// console.log(pets);

// pets.forEach(function (pet, i) {
//   let dog = '';
//   pet > 5 ? dog = 'dog' : dog = 'puppy';
//   console.log(`${i + 1}  ${dog} ${pet} years old`);
// })

// movements.map((value, i) => value > 0 ? console.log(`${i + 1} ${value += value * 0.1} is now in $`) : false)


const deposits = movements.filter(deposit => deposit > 0);
const withdraws = movements.filter(withdraw => withdraw < 0);


//  ---------------display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((prevVal, currVal) => prevVal + currVal);
  labelBalance.textContent = `${acc.balance} EUR`;
}


//  ---------------display summary

const calcDisplaySummary = function (movements) {
  //  incomes
  const incomes = movements.filter(income => income > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}EUR`;
  // outcomes
  const out = movements.filter(income => income < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}EUR`;
  // interest of bank
  const interest = movements.filter(income => income > 0).map(deposit => deposit * 1.2 / 100).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}EUR`;
}


// const data1 = [2, 35, 5, 6, 8];
// const data2 = [4, 5, 7, 9, 12, 3];

// const data = [...data1, ...data2];

// const age = data.map(calc => {
//   if (calc < 6) {
//     return calc * 2;
//   } else {
//     return 16 + calc * 3;
//   }
// });

// console.log(age);

// const test = age.filter(humanAge => humanAge > 30);

// console.log(test);

// const average = test.reduce((acc, current) => acc + current / test.length);

// console.log(average);

// const findAcc = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(findAcc);

// for (const acc of accounts) {
//   acc.owner === 'Jessica Davis' ? console.log(acc) : 'user not found'
// }


// ----------------- show account
let currentAcc;
btnLogin.addEventListener('click', function (e) {
  //  prevent Default behavior
  e.preventDefault();

  currentAcc = accounts.find(acc => acc.userName === inputLoginUsername.value);
  console.log(currentAcc);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome ${currentAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = ' ';
    inputLoginPin.blur();

    updateUI(currentAcc);
  }
})


//  --------transfer amount

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.userName === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAccount && currentAcc.balance >= amount && receiverAccount?.userName !== currentAcc.userName) {
    currentAcc.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // update ui
    updateUI(currentAcc);
  }
})


//  -----------  remove account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAcc.userName && Number(inputClosePin.value) === currentAcc.pin) {
    const index = accounts.findIndex(acc => acc.userName === currentAcc.userName && acc.pin === currentAcc.pin);
    //  remove account splice
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});


//  ------- flat method
// const arrFlat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// console.log(arrFlat);
// const test = arrFlat.flat()
// console.log(test);

const sort = [3, 312, 31231, 1, 32, 211, 321, 12, -12, 0, 334, 43];

const sortNums = sort.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
})

console.log(sortNums);
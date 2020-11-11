const numberInputArr = document.querySelectorAll('.number-input');
const formEl = document.getElementById('form');
const amountEl = document.getElementById('amount');
const interestEl = document.getElementById('interest');
const durationEl = document.getElementById('duration');
const monthlyEl = document.getElementById('monthly-payment');
const totalPayEl = document.getElementById('total-payment');
const totalIntEl = document.getElementById('total-interest');
const submitBtnEl = document.querySelector('button[type=submit]');

function showError() {
  const cardEl = document.querySelector('.card');
  const alertEl = document.createElement('p');
  alertEl.innerText = 'Invalid input';
  alertEl.className = 'alert';
  cardEl.insertBefore(alertEl, formEl);
  setTimeout(() => {
    alertEl.style.animation = 'moveLeft 0.5s ease-in forwards';
    setTimeout(() => {
      alertEl.style.display = 'none';
    }, 500);
  }, 3000);
}

function calculateAndUpdate() {
  const base = parseInt(amountEl.value) || 0;
  const interest = parseInt(interestEl.value) / 100 || 0;
  const numberOfMonths = parseInt(durationEl.value) || 0;
  if (base < 100 || interest < 0.01 || interest > 99 || numberOfMonths < 1) {
    showError();
  } else {
    const totalPay = base + (numberOfMonths * interest * base);
    const totalInt = totalPay - base;
    const monthly = totalPay / numberOfMonths;
    monthlyEl.value = monthly.toFixed(2);
    totalPayEl.value = totalPay.toFixed(2);
    totalIntEl.value = totalInt.toFixed(2);  
  }
}

submitBtnEl.addEventListener('click', e => {
  e.preventDefault();
  calculateAndUpdate();
});

numberInputArr.forEach(input => {
  input.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('number-plus')) {
      input.querySelector('input').value = (parseInt(input.querySelector('input').value) || 0) + 1;
    }
    if (e.target.classList.contains('number-minus')) {
      if (parseInt(input.querySelector('input').value) > 0) {
        input.querySelector('input').value = (parseInt(input.querySelector('input').value) || 0) - 1;
      }
    }
  });
});
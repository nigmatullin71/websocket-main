const socket = new WebSocket('ws://localhost:8080');

const form = document.getElementById('form');
const x0 = document.getElementById('x0');
const q = document.getElementById('q');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
const x0Value = x0.value;
const qValue = q.value;

const digitOnlyRegex = /^[\d.]+$/;

  if (!(digitOnlyRegex.test(x0Value) && digitOnlyRegex.test(qValue))) {
    alert('Invalid input');
    return;
  }

const payload = JSON.stringify({ type: 'fishery', value: { x0: x0Value, q: qValue } });

socket.send(payload);
});

socket.onmessage = function (event) {
  const response = JSON.parse(event.data);
  if (response.error) {
    alert('Invalid input');
    return;
  }
  
  const solution = response.value;

  setup(solution);
};

const setup = (solution) => {
  const points = [];

  for (let k = 0; k < 2; k++) {
    points[k] = [];

    for (let j = 0; j < 2; j++) {
      points[k][j] = [];

      for (let i = 0; i < solution[k][j][1].length; i++) {
        points[k][j][i] = [solution[k][j][1][i], solution[k][j][0][i]];
      }
    }
  }

  const mytable = document.getElementById("table");
  mytable.style.display = 'table';
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = '';
  points[0][0].forEach(todo => {
      let newRow = document.createElement("tr");
      Object.values(todo).forEach((value) => {
          let cell = document.createElement("td");
          cell.innerText = value;
          newRow.appendChild(cell);
      })
      tableBody.appendChild(newRow);
  });
};

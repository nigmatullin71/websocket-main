const socket = new WebSocket('ws://localhost:8080');

const form = document.getElementById('form');
const r = document.getElementById('r');
const m = document.getElementById('m');
const a = document.getElementById('a');
const b = document.getElementById('b');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const rValue = r.value;
  const mValue = m.value;
  const aValue = a.value;
  const bValue = b.value;

  const digitOnlyRegex = /^[\d.]+$/;

  if (
    !(
      digitOnlyRegex.test(rValue) &&
      digitOnlyRegex.test(mValue) &&
      digitOnlyRegex.test(aValue) &&
      digitOnlyRegex.test(bValue)
    )
  ) {
    alert('Invalid input');
    return;
  }

  const payload = JSON.stringify({
    type: 'predator_prey',
    value: { r: rValue, m: mValue, a: aValue, b: bValue },
  });

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
  const pointsx = [];
  const pointsy = [];

  for (i = 0; i < solution[1].length; i++) {
    pointsx[i] = [solution[1][i], solution[0][i][0]];
    pointsy[i] = [solution[1][i], solution[0][i][1]];
  }

  const mytable = document.getElementById("table");
  mytable.style.display = 'table';
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = '';
  pointsx.forEach(todo => {
      let newRow = document.createElement("tr");
      Object.values(todo).forEach((value) => {
          let cell = document.createElement("td");
          cell.innerText = value;
          newRow.appendChild(cell);
      })
      tableBody.appendChild(newRow);
  });

};


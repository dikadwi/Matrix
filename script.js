let rows = 2, cols = 2;

function generateMatrixInputs() {
  rows = parseInt(document.getElementById("rows").value);
  cols = parseInt(document.getElementById("cols").value);

  const container = document.getElementById("matrix-inputs");
  container.innerHTML = "";

  ["A", "B"].forEach(label => {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `<h5 class='text-center'>Matriks ${label}</h5><table class='matrix-table'>${generateMatrixTable(label)}</table>`;
    container.appendChild(col);
  });

  document.getElementById("operations").style.display = "block";
  document.getElementById("step-container").innerHTML = "";
  document.getElementById("result").innerHTML = "";
}

function generateMatrixTable(prefix) {
  let html = "";
  for (let i = 0; i < rows; i++) {
    html += "<tr>";
    for (let j = 0; j < cols; j++) {
      html += `<td><input type='number' id='${prefix}_${i}_${j}' class='form-control' value='0'></td>`;
    }
    html += "</tr>";
  }
  return html;
}

function getMatrix(prefix) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const val = parseFloat(document.getElementById(`${prefix}_${i}_${j}`).value) || 0;
      row.push(val);
    }
    matrix.push(row);
  }
  return matrix;
}

function showResultMatrix(matrix) {
  let html = `<table class='table table-bordered w-auto mx-auto text-center'>`;
  matrix.forEach(row => {
    html += "<tr>" + row.map(val => `<td><strong>${val.toFixed(2)}</strong></td>`).join("") + "</tr>";
  });
  html += "</table>";
  document.getElementById("result").innerHTML = html;
}

function addMatrices() {
  const A = getMatrix("A");
  const B = getMatrix("B");
  const result = [];
  const steps = [];

  for (let i = 0; i < rows; i++) {
    const row = [], stepRow = [];
    for (let j = 0; j < cols; j++) {
      row.push(A[i][j] + B[i][j]);
      stepRow.push(`${A[i][j]} + ${B[i][j]}`);
    }
    result.push(row);
    steps.push(stepRow);
  }

  displaySteps(steps, "Langkah Penjumlahan:");
  showResultMatrix(result);
}

function multiplyMatrices() {
  const A = getMatrix("A");
  const B = getMatrix("B");
  if (A[0].length !== B.length) {
    alert("Perkalian tidak valid: kolom A harus sama dengan baris B.");
    return;
  }

  const result = [], steps = [];
  for (let i = 0; i < A.length; i++) {
    const row = [], stepRow = [];
    for (let j = 0; j < B[0].length; j++) {
      let sum = 0, step = [];
      for (let k = 0; k < A[0].length; k++) {
        sum += A[i][k] * B[k][j];
        step.push(`${A[i][k]}×${B[k][j]}`);
      }
      row.push(sum);
      stepRow.push(step.join(" + "));
    }
    result.push(row);
    steps.push(stepRow);
  }

  displaySteps(steps, "Langkah Perkalian:");
  showResultMatrix(result);
}

function determinant(matrixLabel) {
  const M = getMatrix(matrixLabel);
  if (M.length !== M[0].length) {
    alert("Determinan hanya untuk matriks persegi.");
    return;
  }

  let det = 0, step = "";
  if (M.length === 2) {
    det = M[0][0]*M[1][1] - M[0][1]*M[1][0];
    step = `(${M[0][0]}×${M[1][1]}) - (${M[0][1]}×${M[1][0]}) = ${det}`;
  } else if (M.length === 3) {
    const [a,b,c] = M[0], [d,e,f] = M[1], [g,h,i] = M[2];
    det = a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g);
    step = `${a}×(${e}×${i} - ${f}×${h}) - ${b}×(${d}×${i} - ${f}×${g}) + ${c}×(${d}×${h} - ${e}×${g}) = ${det}`;
  } else {
    alert("Ordo terlalu besar, determinan dihitung otomatis.");
    det = math.det(M);
    step = `Determinan dihitung otomatis: ${det}`;
  }

  displaySteps([[step]], `Langkah Determinan Matriks ${matrixLabel}:`);
  showResultMatrix([[det]]);
}

function displaySteps(steps, title) {
  let html = `<h6 class='mb-2 text-muted'>${title}</h6><table class='table table-borderless text-center w-auto mx-auto'>`;
  steps.forEach(row => {
    html += "<tr>" + row.map(val => `<td><code>${val}</code></td>`).join("") + "</tr>";
  });
  html += "</table>";
  document.getElementById("step-container").innerHTML = html;
}
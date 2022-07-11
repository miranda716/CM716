var selectRow = null;
var employees = [];
console.log(employees);

updateAfterPaageRefresh();

function onSubmitFrom() {
  if (validarFormulario()) {
    var formData = readForm();
    if (selectRow == null) {
      insertNewRecord(formData);
    } else {
      updateRecord(formData);
    }
    resetForm();
  }
}

function readForm() {
  var formData = {};
  formData["nombre"] = document.getElementById("nombre").value;
  formData["tipo_proyecto"] = document.getElementById("tipo_proyecto").value;
  formData["fecha_ini"] = document.getElementById("fecha_ini").value;
  formData["fecha_fin"] = document.getElementById("fecha_fin").value;
  formData["responsable"] = document.getElementById("responsable").value;
  formData["presupuesto"] = document.getElementById("presupuesto").value;
  formData["tipo_persona"] = document.getElementById("tipo_persona").value;
  formData["tipo_profesor"] = document.getElementById("tipo_profesor").value;
  formData["semestreEstudiante"] =
    document.getElementById("semestreEstudiante").value;
  return formData;
}
let tiempo = 0;
var tiempo_inicio = document.getElementById("fecha_ini");
var tiempo_fin = document.getElementById("fecha_fin");

var diferente = Math.abs(tiempo_fin - tiempo_inicio);
let days = diferente / (1000 * 3600 * 24);

console.log(days);

function insertNewRecord(formData) {
  var table = document
    .getElementById("tableProyectos")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow();
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = formData.nombre;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = formData.responsable;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = formData.fecha_ini;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = formData.fecha_fin;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = days;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<button class="bg-green-600 text-green-200 text-sm p-1 border border-green-800" onclick="editForm(this)">Edit</button> <button class="bg-red-600 text-red-200 text-sm p-1 border border-red-800" onclick="deleteRecord(this)">Delete</button> <button class="bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800" onclick="onVista(this)">Vista Rapida</button>`;
  employees.push(formData);
  localStorage.setItem("employees", JSON.stringify(employees));
  
}

function resetForm() {
  document.getElementById("nombre").value = "";
  document.getElementById("tipo_proyecto").value = "";
  document.getElementById("fecha_ini").value = "";
  document.getElementById("fecha_fin").value = "";
  document.getElementById("responsable").value = "";
  document.getElementById("presupuesto").value = "";
  document.getElementById("tipo_persona").value = "";
  document.getElementById("tipo_profesor").value = "";
  document.getElementById("semestreEstudiante").value = "";
  selectRow = null;
}

function deleteRecord(a) {
  var row = a.parentElement.parentElement;
  if (confirm("Estas seguro que quieres eliminar este proyecto?")) {
    document.getElementById("tableProyectos").deleteRow(row.rowIndex);
    employees.splice(row.rowIndex - 1, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
  }
}


function editForm(a) {
    selectRow = a.parentElement.parentElement;
    document.getElementById("nombre").value = selectRow.cells[0].innerHTML;
    document.getElementById("tipo_proyecto").value = selectRow.cells[1].innerHTML;
    document.getElementById("fecha_ini").value = selectRow.cells[2].innerHTML;
    document.getElementById("fecha_fin").value = selectRow.cells[3].innerHTML;
    document.getElementById("responsable").value = selectRow.cells[4].innerHTML;
    document.getElementById("presupuesto").value = selectRow.cells[5].innerHTML;
    document.getElementById("tipo_persona").value = selectRow.cells[6].innerHTML;
    document.getElementById("tipo_profesor").value = selectRow.cells[7].innerHTML;
    document.getElementById("semestreEstudiante").value = selectRow.cells[8].innerHTML;
}

function updateRecord(formData){
    selectRow.cells[0].innerHTML = formData.nombre;
    selectRow.cells[1].innerHTML = formData.tipo_proyecto;
    selectRow.cells[2].innerHTML = formData.fecha_ini;
    selectRow.cells[3].innerHTML = formData.fecha_fin;
    selectRow.cells[4].innerHTML = formData.responsable;
    selectRow.cells[5].innerHTML = formData.presupuesto;
    selectRow.cells[6].innerHTML = formData.tipo_persona;
    selectRow.cells[7].innerHTML = formData.tipo_profesor;
    selectRow.cells[8].innerHTML = formData.semestreEstudiante;
    employees.splice(selectRow.rowIndex - 1, 1, {nombre: formData.nombre, tipo_proyecto: formData.tipo_proyecto, fecha_ini: formData.fecha_ini, fecha_fin: formData.fecha_fin, responsable: formData.responsable, presupuesto: formData.presupuesto, tipo_persona: formData.tipo_persona, tipo_profesor: formData.tipo_profesor, semestreEstudiante: formData.semestreEstudiante});
    localStorage.setItem("employees", JSON.stringify(employees));
}

function updateAfterPaageRefresh() {
  if (localStorage.getItem("employees") == null) {
    console.log("no hay nada en el almacenamiento");
  } else {
    employees = JSON.parse(localStorage.getItem("employees"));
    for (let index = 0; index < employees.length; index++) {
      let nombre = employees[index].nombre;
      let tipo_proyecto = employees[index].tipo_proyecto;
      let fecha_ini = employees[index].fecha_ini;
      let fecha_fin = employees[index].fecha_fin;
      let responsable = employees[index].responsable;
      let presupuesto = employees[index].presupuesto;
      let tipo_persona = employees[index].tipo_persona;
      let tipo_profesor = employees[index].tipo_profesor;
      let semestreEstudiante = employees[index].semestreEstudiante;

      document.getElementById("tbody").innerHTML += `<tr>
            <td>${nombre}</td>
            <td>${responsable}</td>
            <td>${fecha_ini}</td>
            <td>${fecha_fin}</td>
            <td>${days}</td>
            <td><button class="bg-green-600 text-green-200 text-sm p-1 border border-green-800" onclick="editForm(this)">Edit</button> <button class="bg-red-600 text-red-200 text-sm p-1 border border-red-800" onclick="deleteRecord(this)">Delete</button> <button class="bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800" onclick="onVista(this)">Vista Rapida</button></td>
            </tr>`
    }
  }
}

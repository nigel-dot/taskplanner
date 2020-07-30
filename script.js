console.log("hello");
const taskContainer = document.querySelector("#tasks");

const taskModalSaveButton = document.querySelector("#createTaskBtn");
console.log(taskContainer, taskModalSaveButton);
const tableBody = document.querySelector("#tableBody");
console.log(tableBody);
taskModalSaveButton.addEventListener("click", saveButtonClicked);

function saveButtonClicked() {
	const name = document.querySelector("#taskName").value;
	const date = document.querySelector("#taskDate").value;
	const time = document.querySelector("#taskTime").value;
	const assigned = document.querySelector("#taskAssigned").value;
	const description = document.querySelector("#taskDescription").value;
	console.log(name, date, time, assigned, description);
	addTask(name, date, time, assigned, description);
}

function addTask(name, date, time, assigned, description) {
	const html = `
	         <tr>
			      <td></td>
	              <td>${name}</td>
	              <td>${description}</td>
	              <td>${assigned}</td>
				  <td>${date}</td>
				  <td>${time}</td>
	              <td></td>
	          </tr>
	`;

	const taskElement = document.createRange().createContextualFragment(html);
	console.log(taskElement);
	tableBody.append(taskElement);
}

// addTask("name", "date", "time", "assigned", "description");
// var rowLast = tableBody.insertRow(-1);
// var cell1 = rowLast.insertCell(0);
// var cell2 = rowLast.insertCell(1);
// var cell3 = rowLast.insertCell(2);
// var cell4 = rowLast.insertCell(3);
// var cell5 = rowLast.insertCell(4);
// var cell6 = rowLast.insertCell(5);
// cell1.innerHTML = "<tr> ${";
// cell2.innerHTML = "${name}";
// cell3.innerHTML = "${name}";
// cell4.innerHTML = "${name}";
// cell5.innerHTML = "${name}";
// cell5.innerHTML = "${name}";
// tableBody.append(taskElement);

class TaskManager {
	constructor() {
		this.tasks = [];
		this.currentId = 1;
	}
	// addTask(status, name, date, assigned, description) {
	// 	const task = new Task(
	// 		this.currentId++,
	// 		status,
	// 		name,
	// 		date,
	// 		assigned,
	// 		description
	// 	);

	// 	this.tasks.push(task);
	// }
	// getAllTasks() {
	//let tasks = JSON.parse(this.taskList || "[]");
	// 		return this.taskList;
	// 	}

	// 	getTasksByStatus() {}
	// 	addTask(task) {}
	// 	deleteTask(id) {}
	// 	updateTask(id) {}
	// 	assignTaskId(id, assgined) {}
}
class Task {
	constructor(id, status, name, date, assigned, description) {
		this.id = id;
		this.status = status;
		this.name = name;
		this.date = date;
		this.assigned = assigned;
		this.description = description;
	}
}

const taskContainer = document.querySelector("#tasks");

const taskModalSaveButton = document.querySelector("#createTaskBtn");

const tableBody = document.querySelector("#tableBody");

taskModalSaveButton.addEventListener("click", saveButtonClicked);

function saveButtonClicked() {
	const status = document.getElementById("taskStatus").value;

	const name = document.querySelector("#taskName").value;

	const date = document.querySelector("#taskDate").value;
	const assigned = document.querySelector("#taskAssigned").value;
	const description = document.querySelector("#taskDescription").value;

	addTask(status, name, date, assigned, description);
}
// Validation code for disabling form submissions if there are invalid fields
(function () {
	"use strict";
	window.addEventListener(
		"load",
		function () {
			let createTaskBtn = document.querySelector("#createTaskBtn");
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.getElementsByClassName("needs-validation");
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function (form) {
				createTaskBtn.addEventListener(
					"click",
					function (event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}

						form.classList.add("was-validated");
					},
					false
				);
			});
		},
		false
	);
})();

// Create task Table

function addTask(status, name, date, assigned, description) {
	let html = `
		<tr>
			<td>
			<div class="dropright">
                      <button
                        class="btn dropdown-toggle btn-outline-info"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                      ${status}
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                      <a class="dropdown-item" href="#">To Do</a>
                      <a class="dropdown-item" href="#">In Progress</a>
                      <a class="dropdown-item" href="#">Review</a>
                      <a class="dropdown-item" href="#">Done</a>
                      </div>
                    </div>
			</td>
			<td>${name}</td>
			<td>${description}</td>
			<td>${assigned}</td>
			<td>${date}</td>
			<td><button
			type="button"
			class="btn btn-outline-warning .btn-sm"
		  >
			Edit
		  </button>
		  <button
			type="button"
			class="btn btn-outline-danger .btn-sm"
			data-toggle="modal" data-target="#confirmdelete"
		  >
			Delete
		  </button>
		  <div class="modal fade" id="confirmdelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Confirm</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			  </div>
			  <div class="modal-body">
			   Do you want to delete task
			  </div>
			  <div class="modal-footer">
			  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
			  <button type="button" id="deleteBtn" class="btn btn-outline-danger">Delete</button>
		  </td>
		</tr>
	`;
	const table = document.createElement(`table`);
	const tbody = document.createElement(`tbody`);
	table.appendChild(tbody);
	const range = document.createRange();
	range.selectNodeContents(tbody);
	const taskElement = range.createContextualFragment(html);
	tableBody.append(taskElement);
	const task = new Task(
		this.currentId++,
		status,
		name,
		date,
		assigned,
		description
	);

	this.tasks.push(task);
}

// EventTarget.addEventListener("click"){
// 	console.log("delete performed")
// };
// Generate some sample tasks

addTask(
	"To Do",
	"Task abcd",
	"2020-09-20",
	"Nigel Bartholomeusz",
	"Description of task abcd"
);

// addTask(
// 	"Review",
// 	"Task cdef",
// 	"2020-09-20",
// 	"Nigel Bartholomeusz",
// 	"Description of task cdef"
// );

// addTask(
// 	"Pending",
// 	"Task ghij",
// 	"2020-09-20",
// 	"Nigel Bartholomeusz",
// 	"Description of task ghij"
// );

// addTask(
// 	"Done",
// 	"Task klmn",
// 	"2020-08-20",
// 	"Nigel Bartholomeusz",
// 	"Description of task klmn"
// );

// addTask(
// 	"To Do",
// 	"Task opqr",
// 	"2020-10-21",
// 	"Nigel Bartholomeusz",
// 	"Description of task opqr"
// );

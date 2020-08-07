const taskContainer = document.querySelector("#tasks");
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
			<td>${status}</td>
			<td>${name}</td>
			<td>${description}</td>
			<td>${assigned}</td>
			<td>${date}</td>
			<td><button
			type="button" id="editTaskBtn"
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
			  <button type="button" id="deleteTaskBtn" class="btn btn-outline-danger" data-dismiss="modal">Delete</button>
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
	// delete function
	deleteTaskBtn.addEventListener("click", function (event) {
		console.log("delete performed");
	});

	// edit function
	editTaskBtn.addEventListener("click", function (event) {
		console.log("edit performed");
	});

	// taskTitle.addEventListener("input", function (event) {
	// 	validation(event.target, notEmptyandLongerThan(event.target.value, 8));
	// });

	// this.tasks.push(task);
}
// Store items to local storage

// localStorage.setItem('id',
// 'status',
// 'name',
// 'date',
// 'assigned',
// 'description')

// Get items from local storage

// localStorage.getItem('id',
// 'status',
// 'name',
// 'date',
// 'assigned',
// 'description')

// Remove items from local storage
// localStorage.removeItem('id')

// Clears items from local storage
// localStorage.clear()

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

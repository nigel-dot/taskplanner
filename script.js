let tasksDB = [];
let currentid = 1;

const taskContainer = document.querySelector("#tasks");

const taskModalSaveButton = document.querySelector("#createTaskBtn");

const tableBody = document.querySelector("#tableBody");

taskModalSaveButton.addEventListener("click", saveButtonClicked);

function saveButtonClicked() {
	let status = document.getElementById("taskStatus");

	const name = document.querySelector("#taskName").value;
	const date = document.querySelector("#taskDate").value;
	const time = document.querySelector("#taskTime").value;
	const assigned = document.querySelector("#taskAssigned").value;
	const description = document.querySelector("#taskDescription").value;

	// Checkbox ticked function - to see which option is ticked
	function checkBoxTicked() {
		var i;
		for (i = 0; i < taskStatus.length; i++) {
			if (taskStatus[i].checked) {
				status = taskStatus[i].value;
			}
		}
	}
	// Run Checkbox ticked function
	checkBoxTicked();

	console.log(status, name, date, time, assigned, description);

	addTask(status, name, date, time, assigned, description);
}
// Validation code for disabling form submissions if there are invalid fields
(function () {
	"use strict";
	window.addEventListener(
		"load",
		function () {
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.getElementsByClassName("needs-validation");
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function (form) {
				form.addEventListener(
					"submit",
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

function addTask(status, name, date, time, assigned, description) {
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
			<td>${time}</td>
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
			  <button type="button" class="btn btn-outline-danger">Delete</button>
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
}

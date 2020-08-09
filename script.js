const tasksArray = [];

class Task {
	constructor(id, status, name, description, assignedTo, dueDate) {
		this.id = id;
		this.status = status;
		this.name = name;
		this.description = description;
		this.assignedTo = assignedTo;
		this.dueDate = dueDate;
	}
}

class TaskManager {
	constructor() {
		this.currentId = tasksArray.length || 1;
	}

	getAllTasks() {
		//let tasks = JSON.parse(this.taskList || "[]");
		let html = "";
		if (tasksArray.length) {
			const renderList = tasksArray.map(function (task) {
				html += `
	<tr>
		<td>${task.status}</td>
		<td>${task.name}</td>
		<td>${task.description}</td>
		<td>${task.assignedTo}</td>
		<td>${task.dueDate}</td>
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
	  <div class="modal fade" id="confirmdelete" tabindex="-1" role="dialog" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title">Confirm</h5>
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
				const tableBody = document.querySelector("#tableBody");
				const table = document.createElement(`table`);
				const tbody = document.createElement(`tbody`);
				table.appendChild(tbody);
				const range = document.createRange();
				range.selectNodeContents(tbody);
				const taskElement = range.createContextualFragment(html);
				tableBody.append(taskElement);
			});
		} else {
			html = "";
		}
		return html;
	}

	addTask(status, name, description, assignedTo, dueDate) {
		const task = new Task(
			`task${this.currentId++}`,
			status,
			name,
			description,
			assignedTo,
			dueDate
		);
		// push new task onto the tasks array
		tasksArray.push(task);
		console.log(tasksArray);
	}

	// Delete task Method
	deleteTask(id) {
		// ** find the array index which contains that id then remove from array **
		//  ** use array.splice method here to delete then do the same as addtask to rendertasks **
		console.log(id);
	}

	// Update task Method
	upadateTask(id) {}

	// Assign task Method
	assignTask(task) {}

	// Gettask by status Method

	getTaskByStatus() {}
}

// Begin DOM manipulation block
document.addEventListener("DOMContentLoaded", function () {
	const taskManager = new TaskManager();
	renderTasks();
	function renderTasks() {
		//clear any exsisting HTML
		const itemsContainer = document.getElementById("tableBody");
		const taskList = taskManager.getAllTasks();
		//itemsContainer.innerHTML = "";
		itemsContainer.innerHTML = taskList;
		// get all <i> elements within the task list and attach click event listener

		let deleteTask = document.querySelectorAll("#deleteTaskBtn");

		// loop over deletions and attach click event listener
		const eventSetup = Array.prototype.filter.call(deleteTask, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					console.log("Delete Task Confirm Button Clicked");
					// ** might not be .task was .card for Michael - might need to be put in table as hidden to find id**
					let taskElement = event.target.closest(".task");

					TaskManager.deleteTask(taskElement.id);
					console.log(taskElement.id);
					renderTasks();
				},
				false
			);
		});
	}

	// Validation code for disabling form submissions if there are invalid fields
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.getElementsByClassName("needs-validation");
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function (form) {
		form.addEventListener(
			"submit",
			function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (form.checkValidity() === false) {
					form.classList.add("was-validated");
				} else {
					// define vars for each form input value
					let status = form.taskStatus.value;
					let name = form.taskName.value;
					let description = form.taskDescription.value;
					let assignedTo = form.taskAssignedTo.value;
					let dueDate = form.taskDueDate.value;

					taskManager.addTask(status, name, description, assignedTo, dueDate);
					renderTasks();
				}
			},
			false
		);
	});
});

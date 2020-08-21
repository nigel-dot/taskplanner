// Task Class

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
// Task Manager Class

class TaskManager {
	constructor() {
		this.tasks = [];
		this.currentId = 1;
		// this.currentId = parseInt(localStorage.getItem("currentId")) || 1;
		// localStorage.setItem("currentId", this.currentId);
	}

	// Build HTML and add to table Method

	getAllTasks() {
		console.log(this.tasks);
		// get tasks from local storage
		//let myNewTasks = JSON.parse(window.localStorage.getItem("mytasks"));
		// if (myNewTasks) {
		// 	for (let i = 0; i < myNewTasks.length; i++) {
		let html = "";
		if (this.tasks.length) {
			this.tasks.forEach(function (task) {
				html = `
				<div class="task">
				<tr>
					<td>
						<div class="btn-group dropright">
							<button
								class="btn dropright dropdown-toggle btn-outline-info"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								${task.status}
							</button>
							<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a class="dropdown-item" href="#">To Do</a>
								<a class="dropdown-item" href="#">In Progress</a>
								<a class="dropdown-item" href="#">Review</a>
								<a class="dropdown-item" href="#">Done</a>
							</div>
						</div>
					</td>
					<td>${task.name}</td>
					<td>${task.description}</td>
					<td>${task.assignedTo}</td>
					<td>${task.dueDate}</td>
					<td>
						<button
							type="button"
							class="btn btn-outline-warning .btn-sm"
							id="updateTaskBtn"
							data-toggle="modal"
							data-target="#updateTaskModal"
						>
							Update
						</button>
					</td>
					<td>
						<button
							type="button"
							value="${task.id}"
							class="deleteTaskBtn btn btn-outline-danger .btn-sm"
							data-toggle="modal"
							data-target="#confirmdelete"
						>
							Delete
						</button>
					</td>
				   </tr>
			     </div>			
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
	}

	// Add task Method

	addTask(status, name, description, assignedTo, dueDate) {
		const task = new Task(
			`task` + this.currentId++,
			status,
			name,
			description,
			assignedTo,
			dueDate
		);

		console.log("this.currentId:", this.currentId);
		// push new task onto the tasks array
		this.tasks.push(task);

		//add to local storage
		localStorage.setItem("currentId", this.currentId);
		let myNewTasks = JSON.parse(localStorage.getItem("mytasks")) || [];
		myNewTasks.push(task);
		localStorage.setItem("mytasks", JSON.stringify(myNewTasks));
	}

	// Delete task Method

	// find the array index which contains that id then remove from array
	//  use array.splice method here to delete then do the same as addtask to rendertasks **
	deleteTask(id) {
		for (let i = 0; i < this.tasks.length; i++) {
			// delete from array
			if (this.tasks[i].id === id) {
				this.tasks.splice(i, 1);

				// delete from local storage

				let myNewTasks = JSON.parse(localStorage.getItem("mytasks"));
				console.log("myNewTasks:", myNewTasks);
				myNewTasks.splice(i, 1);
				localStorage.setItem("mytasks", JSON.stringify(myNewTasks));

				break;
			}
		}

		// tasksArray = tasksArray.filter((Task) => Task.id !== id);
		console.log("Made it to Delete Task method");
		console.log("task id:", id);

		//task = task.filter((task) => task.id !== id);
	}

	// Update task Method

	updateTask(id, status, name, description, assignedTo, dueDate) {
		let updated_id = "";
		console.log("made it to update task method");
		console.log("vars", id, status, name, description, assignedTo, dueDate);

		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].id === id) {
				// update the array
				this.tasks[i].status = status;
				this.tasks[i].name = name;
				this.tasks[i].description = description;
				this.tasks[i].assignedTo = assignedTo;
				this.tasks[i].dueDate = dueDate;
				updated_id = id;

				//update local storage

				// let myNewTasks = JSON.parse(localStorage.getItem("myTasks"));
				// myNewTasks[i].status = status;
				// myNewTasks[i].name = name;
				// myNewTasks[i].description = description;
				// myNewTasks[i].assignedTo = assignedTo;
				// myNewTasks[i].dueDate = dueDate;
				// localStorage.setItem("mytasks", JSON.stringify(myNewTasks));
				break;
			}
		}
		return updated_id;
	}

	// Filter task Method

	filterTask() {}

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
		console.log("taskmanger:", taskManager, "Task:", Task);

		// Look for Delete button being clicked

		let deleteBtns = document.querySelectorAll("#deleteTaskBtn");

		// loop over deletions and attach click event listener
		const deleteSetup = Array.prototype.filter.call(deleteBtns, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					let deleteId = event.target.value;
					console.log(event.target.value);

					taskManager.deleteTask(deleteId);

					renderTasks();
				},
				false
			);
		});

		// Look for Update button being clicked

		//let updateTask = document.querySelectorAll("#modalUpdateTaskBtn");
		let updateTask = document.querySelectorAll("#modalUpdateTaskBtn");
		console.log(updateTask);

		// loop over updates and attach click event listener
		const updateSetup = Array.prototype.filter.call(updateTask, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					let editId = event.target.closest("#modalUpdateTaskBtn").value;
					//let editName = event.target.closest("#updateTaskForm").value;
					let editName = "taskname";
					//let editName = ${ task.name };
					//let editName = task.name;
					console.log(
						"Update Task Button Clicked",
						"id:",
						editId,
						"name:",
						editName
					);

					taskManager.updateTask(
						editId,
						"Review",
						editName,
						"task description",
						"assignedto",
						"2020-08-13"
					);

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

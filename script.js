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
		// get tasks form local storage or set to empty array
		this.tasks = JSON.parse(localStorage.getItem("mytasks")) || [];
		// get current id form local storage or set to 1
		this.currentId = parseInt(localStorage.getItem("currentId")) || 1;
		localStorage.setItem("currentId", this.currentId);
	}

	// Build HTML and add to table Method

	getAllTasks() {
		let html = "";

		if (this.tasks.length) {
			this.tasks.forEach(function (task) {
				html += `
				<div class="task">
				<tr>
					<td>${task.status}</td>
					<td>${task.name}</td>
					<td>${task.description}</td>
					<td>${task.assignedTo}</td>
					<td>${task.dueDate}</td>
					<td>
						<button
							type="button"
							class="updateTaskBtn btn btn-outline-warning .btn-sm"
							value="${task.id}"
							data-toggle="modal"
							data-target="#createTaskModal"
						>
							Update
						</button>
						<button
							type="button"
							value="${task.id}"
							class="deleteTaskBtn btn btn-outline-danger .btn-sm"
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
		return html;
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

		// push new task onto the tasks array
		this.tasks.push(task);

		//add to local storage
		localStorage.setItem("currentId", this.currentId);
		let lsTasks = JSON.parse(localStorage.getItem("mytasks")) || [];
		lsTasks.push(task);
		localStorage.setItem("mytasks", JSON.stringify(lsTasks));
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

				let lsTasks = JSON.parse(localStorage.getItem("mytasks"));
				console.log("lsTasks:", lsTasks);
				lsTasks.splice(i, 1);
				localStorage.setItem("mytasks", JSON.stringify(lsTasks));

				break;
			}
		}
	}

	// Update task Method

	updateTask(id, status, name, description, assignedTo, dueDate) {
		let updated_id = "";

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

				let lsTasks = JSON.parse(localStorage.getItem("mytasks"));
				lsTasks[i].status = status;
				lsTasks[i].name = name;
				lsTasks[i].description = description;
				lsTasks[i].assignedTo = assignedTo;
				lsTasks[i].dueDate = dueDate;
				localStorage.setItem("mytasks", JSON.stringify(lsTasks));
				break;
			}
		}
		return updated_id;
	}
}

// Begin DOM manipulation block
document.addEventListener("DOMContentLoaded", function () {
	const taskManager = new TaskManager();
	renderTasks();

	function renderTasks() {
		//clear any exsisting HTML
		const itemsContainer = document.getElementById("tableBody");
		const taskList = taskManager.getAllTasks();

		itemsContainer.innerHTML = taskList;

		// Look for New Task button being clicked

		let createBtn = document.querySelector(".createNewTaskBtn");

		// loop over deletions and attach click event listener
		createBtn.addEventListener(
			"click",
			function (event) {
				// change createTaskBtn button to be called Create new task

				createTaskBtn.innerText = "Create new task";

				let editId = document.querySelector(".taskId");
				let editName = document.querySelector(".taskName");
				let editStatus = document.querySelector(".taskStatus");
				let editDescription = document.querySelector(".taskDescription");
				let editAssignedTo = document.querySelector(".taskAssignedTo");
				let editDueDate = document.querySelector(".taskDueDate");
				editId.value = "";
				editName.value = "";
				editStatus.value = "";
				editDescription.value = "";
				editAssignedTo.value = "";
				editDueDate.value = "";
			},
			false
		);

		// Look for Delete button being clicked

		let deleteBtns = document.querySelectorAll(".deleteTaskBtn");

		// loop over deletions and attach click event listener
		const deleteSetup = Array.prototype.filter.call(deleteBtns, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					let deleteId = event.target.value;

					taskManager.deleteTask(deleteId);

					renderTasks();
				},
				false
			);
		});

		// Look for Update button being clicked

		let updateTask = document.querySelectorAll(".updateTaskBtn");
		console.log(updateTask);

		// loop over updates and attach click event listener
		const updateSetup = Array.prototype.filter.call(updateTask, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					// change createTaskBtn button to be called update task

					createTaskBtn.innerText = "Update task";

					let targetId = event.target.value;

					let editId = document.querySelector(".taskId");
					let editName = document.querySelector(".taskName");
					let editStatus = document.querySelector(".taskStatus");
					let editDescription = document.querySelector(".taskDescription");
					let editAssignedTo = document.querySelector(".taskAssignedTo");
					let editDueDate = document.querySelector(".taskDueDate");

					// get task from array and set values

					const task = taskManager.tasks.find((t) => t.id === targetId);
					console.log("task:", task);

					editId.value = task.id;
					editName.value = task.name;
					editStatus.value = task.status;
					editDescription.value = task.description;
					editAssignedTo.value = task.assignedTo;
					editDueDate.value = task.dueDate;

					renderTasks();
				},
				false
			);
		});
	}
	// Validation code for disabling form submissions if there are invalid fields

	// Fetch all the forms we want to apply custom Bootstrap validation styles to

	const forms = document.getElementsByClassName("needs-validation");

	// Loop over them and prevent submission if not valid input
	var validation = Array.prototype.filter.call(forms, function (form) {
		form.addEventListener(
			"submit",
			function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (form.checkValidity() === false) {
					form.classList.add("was-validated");
				} else {
					let status = form.taskStatus.value;
					let name = form.taskName.value;
					let description = form.taskDescription.value;
					let assignedTo = form.taskAssignedTo.value;
					let dueDate = form.taskDueDate.value;

					// Look for taskId if there it is an update of the task

					if (form.taskId.value) {
						taskManager.updateTask(
							form.taskId.value,
							status,
							name,
							description,
							assignedTo,
							dueDate
						);

						renderTasks();
					} else {
						// Look for taskId if not there it is an add task

						taskManager.addTask(status, name, description, assignedTo, dueDate);
						renderTasks();
					}
				}
			},
			false
		);
	});
});

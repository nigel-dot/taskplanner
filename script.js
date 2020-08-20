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
		this.currentId = parseInt(localStorage.getItem("currentId")) || 1;
		localStorage.setItem("currentId", this.currentId);
	}

	// Build HTML and add to table Method

	getAllTasks() {
		// get tasks from local storage
		//let myNewTasks = JSON.parse(window.localStorage.getItem("mytasks"));
		// if (myNewTasks) {
		// 	for (let i = 0; i < myNewTasks.length; i++) {
		let html = "";
		if (this.tasks.length) {
			const renderList = this.tasks.map(function (task) {
				html += `
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
		<td><button
		type="button" 
		class="btn btn-outline-warning .btn-sm"
		id="updateTaskBtn"
		data-toggle="modal" data-target="#updateTaskModal"
	  >
		Update
	  </button>
	  <!-- Start of modal-->
	  <div class="modal fade" id="updateTaskModal">
		  <div class="modal-dialog" role="document">
			  <div class="modal-content">
				  <div class="modal-header">
					  <h5 class="modal-title">Update Task: ${task.id}</h5>
					  <button
					 
						  type="button"
						  class="close"
						  data-dismiss="modal"
						  aria-label="Close"
					  >
						  <span aria-hidden="true">&times;</span>
					  </button>
				  </div>
				  <div class="modal-body" id="updTask-modal">
					  <!-- Start of Form-->
	  
			
	  
					  <form class="needs-validation" id="updateTaskForm" novalidate>
						  <div class="form-group row" id="updateTaskFormName">
							  <label class="col-3 col-form-label">Task:</label>
							  <div class="col-12">
								  <input
									  class="form-control"
									  type="text"
									  value="${task.name}"
									  id="taskName"
									  pattern="[A-Za-z]{8,}"
									  placeholder="Task name"
									  required
								  />
								  <div class="invalid-feedback">
									  Task name required - greater than 8 characters
								  </div>
								  <div class="valid-feedback">
									  Looks Good!
								  </div>
							  </div>
						  </div>
						  <div class="form-group row">
							  <label class="col-3 col-form-label">Date:</label>
							  <div class="col-12">
								  <input
									  class="form-control"
									  type="date"
									  value="${task.dueDate}"
									  id="taskDueDate"
									  required
								  />
								  <div class="invalid-feedback">
									  Date required
								  </div>
							  </div>
						  </div>
	  
						  <div class="form-group row">
							  <label class="col-3 col-form-label">Assigned:</label>
							  <div class="col-12">
								  <input
									  class="form-control"
									  type="text"
									  value="${task.assignedTo}"
									  id="taskAssignedTo"
									  pattern="[A-Za-z]{8,}"
									  placeholder="Assigned to"
									  required
								  />
								  <div class="invalid-feedback">
									  Assignee required - greater than 8 characters
								  </div>
								  <div class="valid-feedback">
									  Looks Good!
								  </div>
							  </div>
						  </div>
	  
						  <div class="form-group row">
							  <label class="col-3 col-form-label">Description:</label>
							  <div class="col-12">
								  <input
									  class="form-control"
									  type="text"
									  value="${task.description}"
									  id="taskDescription"
									  pattern="[A-Za-z]{15,}"
									  placeholder="Description of task"
									  rows="3"
									  required
								  />
	  
								  <div class="invalid-feedback">
									  Description required - greater than 15 characters
								  </div>
								  <div class="valid-feedback">
									  Looks Good!
								  </div>
							  </div>
						  </div>
	  
						  <!-- End of Form-->
	  
						  <!-- start of dropdown -->
	  
						  <div class="form-group">
							  <label>Status</label>
							  <select class="form-control" id="taskStatus" required>
								  <option value="To Do">To Do</option>
								  <option value="Review">Review</option>
								  <option value="Pending">Pending</option>
								  <option value="Done">Done</option>
							  </select>
						  </div>
						  <!-- end of dropdown -->
						  <div>
							  <button
								  type="submit"
								  class="btn btn-outline-success .btn-sm"
								  data-dismiss="modal"
								  value="${task.id}"
								  id="modalUpdateTaskBtn"
							  >
								  Update task
							  </button>
						  </div>
					  </form>
				  </div>
	  
				  <div class="modal-footer">
					  <button
						  type="button"
						  class="btn btn-outline-secondary"
						  data-dismiss="modal"
					  >
						  Close
					  </button>
				  </div>
			  </div>
		  </div>
	  </div>
	  
	  <!-- End of modal-->
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
		  <div class="modal-body id=deleteModal">
		   Do you want to delete task : ${task.id}
		  </div>
		  <div class="modal-footer">
		  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
		  <button type="button" id="deleteTaskBtn" value="${task.id}" class="btn btn-outline-danger" data-dismiss="modal">Delete</button>
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
				//console.log(myNewTasks);
				let myNewTasks = JSON.parse(localStorage.getItem("mytasks"));
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
				// break;
			}
		}
		return updated_id;
	}

	// Display all tasks from local Storage

	displayAllTasksFromStorage() {
		let myNewTasks = JSON.parse(window.localStorage.getItem("mytasks"));
		let html = "";
		if (myNewTasks) {
			for (let i = 0; i < myNewTasks.length; i++) {
				html = `
				<div class="task" id="${myNewTasks[i].id}">
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
												${myNewTasks[i].status}
												</button>
												<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
													<a class="dropdown-item" href="#">To Do</a>
													<a class="dropdown-item" href="#">In Progress</a>
													<a class="dropdown-item" href="#">Review</a>
													<a class="dropdown-item" href="#">Done</a>
												</div>
							</div>
						</td>
						<td>${myNewTasks[i].name}</td>
						<td>${myNewTasks[i].description}</td>
						<td>${myNewTasks[i].assignedTo}</td>
						<td>${myNewTasks[i].dueDate}</td>
						<td><button
						type="button" id="updateTaskBtn"
						class="btn btn-outline-warning .btn-sm"
						data-toggle="modal" data-target="#updateTaskModal"
					  >
						Update
					  </button>
					  <!-- Start of modal-->
					  <div class="modal fade" id="updateTaskModal">
						  <div class="modal-dialog" role="document">
							  <div class="modal-content">
								  <div class="modal-header">
									  <h5 class="modal-title">Update Task</h5>
									  <button
										  type="button"
										  class="close"
										  data-dismiss="modal"
										  aria-label="Close"
									  >
										  <span aria-hidden="true">&times;</span>
									  </button>
								  </div>
								  <div class="modal-body" id="updTask-modal">
									  <!-- Start of Form-->
					  
							
					  
									  <form class="needs-validation" novalidate>
										  <div class="form-group row">
											  <label class="col-3 col-form-label">Task:</label>
											  <div class="col-12">
												  <input
													  class="form-control"
													  type="text"
													  value=""
													  id="taskName"
													  pattern="[A-Za-z]{8,}"
													  placeholder="Task name"
													  required
												  />
												  <div class="invalid-feedback">
													  Task name required - greater than 8 characters
												  </div>
												  <div class="valid-feedback">
													  Looks Good!
												  </div>
											  </div>
										  </div>
										  <div class="form-group row">
											  <label class="col-3 col-form-label">Date:</label>
											  <div class="col-12">
												  <input
													  class="form-control"
													  type="date"
													  value=""
													  id="taskDueDate"
													  required
												  />
												  <div class="invalid-feedback">
													  Date required
												  </div>
											  </div>
										  </div>
					  
										  <div class="form-group row">
											  <label class="col-3 col-form-label">Assigned:</label>
											  <div class="col-12">
												  <input
													  class="form-control"
													  type="text"
													  value=""
													  id="taskAssignedTo"
													  pattern="[A-Za-z]{8,}"
													  placeholder="Assigned to"
													  required
												  />
												  <div class="invalid-feedback">
													  Assignee required - greater than 8 characters
												  </div>
												  <div class="valid-feedback">
													  Looks Good!
												  </div>
											  </div>
										  </div>
					  
										  <div class="form-group row">
											  <label class="col-3 col-form-label">Description:</label>
											  <div class="col-12">
												  <input
													  class="form-control"
													  type="text"
													  value=""
													  id="taskDescription"
													  pattern="[A-Za-z]{15,}"
													  placeholder="Description of task"
													  rows="3"
													  required
												  />
					  
												  <div class="invalid-feedback">
													  Description required - greater than 15 characters
												  </div>
												  <div class="valid-feedback">
													  Looks Good!
												  </div>
											  </div>
										  </div>
					  
										  <!-- End of Form-->
					  
										  <!-- start of dropdown -->
					  
										  <div class="form-group">
											  <label>Status</label>
											  <select class="form-control" id="taskStatus" required>
												  <option value="To Do">To Do</option>
												  <option value="Review">Review</option>
												  <option value="Pending">Pending</option>
												  <option value="Done">Done</option>
											  </select>
										  </div>
										  <!-- end of dropdown -->
										  <div>
											  <button
												  type="submit"
												  class="btn btn-outline-success .btn-sm"
												  data-dismiss="modal"
												  id="updateTaskBtn"
											  >
												  Update task
											  </button>
										  </div>
									  </form>
								  </div>
					  
								  <div class="modal-footer">
									  <button
										  type="button"
										  class="btn btn-outline-secondary"
										  data-dismiss="modal"
									  >
										  Close
									  </button>
								  </div>
							  </div>
						  </div>
					  </div>
					  
					  <!-- End of modal-->
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
						  <div class="modal-body id=deleteModal">
						   Do you want to delete task : ${myNewTasks[i].id}
						  </div>
						  <div class="modal-footer">
						  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
						  <button type="button" id="deleteTaskBtn" value="${myNewTasks[i].id}" class="btn btn-outline-danger" data-dismiss="modal">Delete</button>
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
			}
		} else {
			html = "";
		}
		return html;
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
		//const taskList = taskManager.displayAllTasksFromStorage();
		//itemsContainer.innerHTML = "";
		itemsContainer.innerHTML = taskList;
		// console.log(
		// 	"taskmaanger:",
		// 	taskManager,
		// 	"tasklist:",
		// 	taskList,
		// 	"itemscontainer:",
		// 	itemsContainer
		// );

		// Look for Delete button being clicked

		let deleteTask = document.querySelectorAll("#deleteTaskBtn");

		// loop over deletions and attach click event listener
		const deleteSetup = Array.prototype.filter.call(deleteTask, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					let deleteId = event.target.closest("#deleteTaskBtn").value;
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

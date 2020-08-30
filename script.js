// import javaScript modules to be used
import Task from "./task.js";
import TaskManager from "./task-manager.js";

// begin DOM manipulation block
 document.addEventListener("DOMContentLoaded", function () {
	 const taskManager = new TaskManager();
	renderTasks();

	 function renderTasks() {
		//clear any exsisting HTML
	 const itemsContainer = document.getElementById("tableBody");
		const taskList = taskManager.getAllTasks();

		itemsContainer.innerHTML = taskList;

		// look for new task button being clicked

		let createBtn = document.querySelector(".createNewTaskBtn");

		// loop over deletions and attach click event listener
		createBtn.addEventListener(
			"click",
			function (event) {
				// change createTaskBtn button and modal title to be called Create new task

				createTaskBtn.innerText = "Create new task";
				modalTitle.innerText = "Create new task";

				// get fields from form

				let editId = document.querySelector(".taskId");
				let editName = document.querySelector(".taskName");
				let editStatus = document.querySelector(".taskStatus");
				let editDescription = document.querySelector(".taskDescription");
				let editAssignedTo = document.querySelector(".taskAssignedTo");
				let editDueDate = document.querySelector(".taskDueDate");

				// clear out form fields

				editId.value = "";
				editName.value = "";
				editStatus.value = "";
				editDescription.value = "";
				editAssignedTo.value = "";
				editDueDate.value = "";
			},
			false
		);

		// look for delete button being clicked

		let deleteBtns = document.querySelectorAll(".deleteTaskBtn");

		// loop over deletions and attach click event listener
		const deleteSetup = Array.prototype.filter.call(deleteBtns, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					// get task id to be passed to delete task method
					let deleteId = event.target.value;

					// run delete task method

					taskManager.deleteTask(deleteId);

					renderTasks();
				},
				false
			);
		});

		// look for update button being clicked

		let updateTask = document.querySelectorAll(".updateTaskBtn");

		// loop over updates and attach click event listener
		const updateSetup = Array.prototype.filter.call(updateTask, function (el) {
			el.addEventListener(
				"click",
				function (event) {
					// change createTaskBtn button and modal title to be called update task

					createTaskBtn.innerText = "Update task";
					modalTitle.innerText = "Update task";

					// set update variables into form

					let editId = document.querySelector(".taskId");
					let editName = document.querySelector(".taskName");
					let editStatus = document.querySelector(".taskStatus");
					let editDescription = document.querySelector(".taskDescription");
					let editAssignedTo = document.querySelector(".taskAssignedTo");
					let editDueDate = document.querySelector(".taskDueDate");

					// setup task id variable to be interigated

					let targetId = event.target.value;

					// get task from array and set values

					const task = taskManager.tasks.find((t) => t.id === targetId);

					// set update variables to be passed to update task method

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
	// validation code for disabling form submissions if there are invalid fields passed to bootstrap classes

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

					// Look for taskId if there it is an update of the task then run update task method

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
						// Look for taskId if not then run add task method

						taskManager.addTask(status, name, description, assignedTo, dueDate);
						renderTasks();
					}
				}
			},
			false
		);
	});
});

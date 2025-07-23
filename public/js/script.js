const todoInputTitle = document.getElementById("todo-input-title");
const todoInputDesc = document.getElementById("todo-input-desc");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

let isEditing = false;

async function startingUpdate(element) {
  const data = {};
  const actualId = Number(element.id.slice(2));
  isEditing = !isEditing;

  if (isEditing) {
    document.querySelectorAll(`.todo-info-${actualId}`).forEach((info) => {
      info.contentEditable = true;
      info.classList.add("border", "border-dark");
    });

    element.innerText = "Save";
  } else {
    document.querySelectorAll(`.todo-info-${actualId}`).forEach((info) => {
      info.contentEditable = false;
      info.classList.remove("border", "border-dark");
      data[info.dataset.id] = info.innerText;
    });
    const checkboxSts = document.getElementById(`c-${actualId}`).checked;
    await updateTodo(actualId, { isCompleted: checkboxSts, ...data });
    element.innerText = "Edit";
    isEditing = false;
  }

}

async function deleteTodo(id) {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (json.status === 500 || json.status === 404)
      throw new Error(json.operationStatus.message);

    return true;
  } catch (error) {
    alert(error.message);
    return false;
  }
}

async function updateTodo(id, data) {
  console.log(data);
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.status === 500 || json.status === 404)
      throw new Error(json.operationStatus.message);

    console.log(json);
  } catch (error) {
    alert(error.message);
  }
}

function appendToDom({ id, title, description, isCompleted }) {
  const htmlContent = `<li class="row gap-2 col-12 justify-content-center" id="h-${id}">
                 <input type="checkbox" class="col-1" id="c-${id}" ${
    isCompleted === "Y" ? "checked" : ""
  } > 
                 <div class="col-6">
                   <div class="mb-1 todo-info-${id}" data-id="title">${title}</div>
                   <div class="todo-info-${id}" data-id="description">${description}</div>
                 </div>
                 <button class="btn btn-primary col-2" id="e-${id}" >Edit</button>
                 <button class="btn btn-danger col-2" id="d-${id}">Delete</button>
                </li>`;

  const range = document.createRange();
  const fragment = range.createContextualFragment(htmlContent);

  todoList.appendChild(fragment);

  document.getElementById(`d-${id}`).addEventListener("click", async (eve) => {
    const id = Number(eve.target.id.slice(2));
    const res = await deleteTodo(id);
    if (res) {
      document.getElementById(`h-${id}`).remove();
    }
  });

  document.getElementById(`c-${id}`).addEventListener("change", async (eve) => {
    const id = Number(eve.target.id.slice(2));
    await updateTodo(id, {
      title,
      description,
      isCompleted: eve.target.checked,
    });
  });

  document.getElementById(`e-${id}`).addEventListener("click", async (eve) => {
    await startingUpdate(eve.target);
  });
}

async function fetchAllTodos() {
  try {
    const res = await fetch(`/api/todos`);

    const json = await res.json();

    if (json.status === 500 || json.status === 404)
      throw new Error(json.operationStatus.message);

    todoList.innerHTML = "";

    console.log(json.operationStatus.data);

    json.operationStatus.data.forEach((data) => {
      appendToDom(data);
    });
  } catch (error) {
    alert(error.message);
  }
}

async function fetchTodoByID(id) {
  try {
    const res = await fetch(`/api/todos/${id}`);

    const json = await res.json();

    if (json.status === 500 || json.status === 404)
      throw new Error(json.operationStatus.message);

    appendToDom(json.operationStatus.data);
  } catch (error) {
    alert(error.message);
  }
}

async function sendTodoDataToBackend(todoData) {
  try {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    const json = await res.json();

    if (json.status === 500 || json.status === 404)
      throw new Error(json.operationStatus.message);

    await fetchTodoByID(json.operationStatus.data);
  } catch (error) {
    alert(error.message);
  }
}

todoForm.addEventListener("submit", async (eve) => {
  eve.preventDefault();

  const formdata = new FormData(eve.target);
  const todoData = {
    title: formdata.get(todoInputTitle.name).trim(),
    description: formdata.get(todoInputDesc.name).trim(),
  };

  await sendTodoDataToBackend(todoData);
});

fetchAllTodos();

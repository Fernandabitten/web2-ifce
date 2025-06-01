export const Tasks = (() => {
  // Seletores
  const taskList = document.getElementById("taskList");
  const errorMessage = document.getElementById("error-message");

  function taskExists(taskText) {
    const tasks = Array.from(taskList.getElementsByTagName("span")).map(
      (span) => span.textContent.toLowerCase()
    );
    return tasks.includes(taskText.toLowerCase());
  }

  // Criar a tarefa
  function addTask(taskText, completed = false) {
    const li = document.createElement("li");

    if (completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = taskText;

    // Clicar no texto para editar
    span.addEventListener("click", () => {
      editTask(span);
    });

    const div = document.createElement("div");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";
    completeBtn.addEventListener("click", () => {
      toggleComplete(li);
      saveTasksToLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      deleteTask(li);
      saveTasksToLocalStorage();
    });

    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(div);

    taskList.appendChild(li);

    saveTasksToLocalStorage();
  }

  // Editar
  function editTask(span) {
    const currentText = span.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.size = Math.max(currentText.length, 5);

    // Salvar ao apertar Enter
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit(input, span);
      }
    });

    // Salvar ao sair do foco
    input.addEventListener("blur", () => {
      saveEdit(input, span);
    });

    span.replaceWith(input);
    input.focus();
  }

  // Salva a edição
  function saveEdit(input, span) {
    const newText = input.value.trim() || "Tarefa sem nome";
    span.textContent = newText;

    // Recoloca o listener de editar
    span.addEventListener("click", () => editTask(span));

    input.replaceWith(span);
    saveTasksToLocalStorage();
  }

  // Marcar como concluída
  function toggleComplete(li) {
    li.classList.toggle("completed");
    saveTasksToLocalStorage();
  }

  function completeTaskByName(taskName) {
    const spans = document.querySelectorAll("#taskList span");
    const span = Array.from(spans).find(
      (s) => s.textContent.toLowerCase() === taskName.toLowerCase()
    );

    if (span) {
      const li = span.closest("li");
      li.classList.add("completed"); // Garante que está marcado
      saveTasksToLocalStorage();
      return true;
    }

    return false;
  }

  function uncompleteTaskByName(taskName) {
    const spans = document.querySelectorAll("#taskList span");
    const span = Array.from(spans).find(
      (s) => s.textContent.toLowerCase() === taskName.toLowerCase()
    );

    if (span) {
      const li = span.closest("li");
      li.classList.remove("completed"); // Garante que está desmarcado
      saveTasksToLocalStorage();
      return true;
    }

    return false;
  }
  // Deletar tarefa
  function deleteTask(li) {
    li.remove();
    saveTasksToLocalStorage();
  }

  function deleteTaskByName(taskName) {
    const spans = document.querySelectorAll("#taskList span");
    const span = Array.from(spans).find(
      (s) => s.textContent.toLowerCase() === taskName.toLowerCase()
    );

    if (span) {
      const li = span.closest("li");
      li.remove();
      saveTasksToLocalStorage();
      return true;
    }

    return false;
  }

  function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map((li) => {
      const span = li.querySelector("span");
      return {
        text: span.textContent,
        completed: li.classList.contains("completed"),
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTask(task.text, task.completed);
    });
  }

  // ============================
  // Úteis
  // ============================

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Mostrar mensagem de erro
  function showErrorMessage(message) {
    errorMessage.textContent = message;
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 3000);
  }

  function readTasks() {
    const spans = taskList.querySelectorAll("span");
    if (spans.length === 0) {
      return "Você não tem nenhuma tarefa";
    }
    const tarefas = Array.from(spans).map((span) => span.textContent);
    return "Suas tarefas são: " + tarefas.join(", ");
  }

  function clearTasks() {
    taskList.innerHTML = "";
    saveTasksToLocalStorage();
  }
  // Carrega tarefas ao abrir
  loadTasksFromLocalStorage();

  return {
    addTask,
    taskExists,
    showErrorMessage,
    readTasks,
    clearTasks,
    capitalizeFirstLetter,
    completeTaskByName,
    uncompleteTaskByName,
    deleteTaskByName,
  };
})();

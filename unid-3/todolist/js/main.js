import { VoiceAssistant } from "./voiceAssistant.js";
import { Tasks } from "./tasks.js";

// =======================
// Variáveis de estado
// =======================
let waitingForTaskName = false;

// ============================
// Seletores
// ============================
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const readTasks = document.getElementById("readTasks");
const toggleThemeBtn = document.getElementById("toggleTheme");
// Abrir e fechar modal
const helpModal = document.getElementById("helpModal");
const helpBtn = document.getElementById("helpBtn");
const closeBtn = document.querySelector(".close");

// ============================
// Eventos Botões
// ============================
taskInput.addEventListener("keydown", (e) => {
  const taskText = Tasks.capitalizeFirstLetter(taskInput.value.trim());
  if (e.key === "Enter") {
    Tasks.addTask(taskText);
  }
});

addTaskBtn.addEventListener("click", () => {
  const taskText = Tasks.capitalizeFirstLetter(taskInput.value.trim());
  if (!taskText) return;
  if (Tasks.taskExists(taskText)) {
    Tasks.showErrorMessage(
      `A tarefa "${taskText}" já existe na sua lista de tarefas`
    );
    taskInput.value = "";
    return;
  }
  Tasks.addTask(taskText);
  taskInput.value = "";
});

readTasks.addEventListener("click", () => {
  const texto = Tasks.readTasks();
  VoiceAssistant.speak(texto);
});

helpBtn.addEventListener("click", () => {
  helpModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  helpModal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == helpModal) {
    helpModal.style.display = "none";
  }
};

// ============================
// Tema claro/escuro
// ============================
// Inicializa no modo escuro
document.body.classList.add("dark");

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/// =======================
// Processamento de voz
// =======================
VoiceAssistant.onCommand((command) => {
  console.log("Comando:", command);
  if (waitingForTaskName) {
    const taskText = Tasks.capitalizeFirstLetter(command.trim());
    if (Tasks.taskExists(taskText)) {
      showErrorMessage(
        `A tarefa "${taskText}" já existe na sua lista de tarefas`
      );
      VoiceAssistant.speak(`A tarefa ${taskText} já existe na sua lista`);
    } else {
      Tasks.addTask(taskText);
      VoiceAssistant.speak(`Tarefa ${taskText} adicionada`);
    }
    waitingForTaskName = false;
    return;
  }

  if (command.includes("adicionar")) {
    VoiceAssistant.speak("Fale o nome da tarefa");
    waitingForTaskName = true;
  } else if (command.includes("ler tarefas")) {
    const spans = taskList.querySelectorAll("span");
    if (spans.length === 0) {
      VoiceAssistant.speak("Você não tem nenhuma tarefa");
    } else {
      const tarefas = Array.from(spans).map((span) => span.textContent);
      const texto = "Suas tarefas são: " + tarefas.join(", ");
      VoiceAssistant.speak(texto);
    }
  } else if (command.includes("modo claro")) {
    document.body.classList.remove("dark");
    VoiceAssistant.speak("Modo claro ativado");
  } else if (command.includes("modo escuro")) {
    document.body.classList.add("dark");
    VoiceAssistant.speak("Modo escuro ativado");
  } else if (command.includes("limpar tarefas")) {
    taskList.innerHTML = "";
    VoiceAssistant.speak("Todas as tarefas foram removidas");
  }

  if (command.includes("concluir")) {
    const taskName = command.replace("concluir", "").trim();
    const success = Tasks.completeTaskByName(taskName);
    if (success) {
      VoiceAssistant.speak(`Tarefa ${taskName} concluída`);
    } else {
      VoiceAssistant.speak(`Não encontrei a tarefa ${taskName}`);
    }
  } else if (command.includes("desmarcar")) {
    const taskName = command.replace("desmarcar", "").trim();
    const success = Tasks.uncompleteTaskByName(taskName);
    if (success) {
      VoiceAssistant.speak(`Tarefa ${taskName} desmarcada`);
    } else {
      VoiceAssistant.speak(`Não encontrei a tarefa ${taskName}`);
    }
  }

  if (command.includes("excluir")) {
    const taskName = command.replace("excluir", "").trim();
    const success = Tasks.deleteTaskByName(taskName);
    if (success) {
      VoiceAssistant.speak(`Tarefa ${taskName} excluída`);
    } else {
      VoiceAssistant.speak(`Não encontrei a tarefa ${taskName}`);
    }
  }

  if (command.includes("ajuda") || command.includes("quais são os comandos")) {
    VoiceAssistant.speak(
      "Você pode dizer: adicionar, concluir, desmarcar, excluir, ler tarefas, modo claro ou modo escuro."
    );
  }
});

function checkSpeechSupport() {
  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!speechRecognition) {
    alert(
      "⚠️ Seu navegador não suporta reconhecimento de voz. Use Google Chrome ou Microsoft Edge."
    );
  }
}

checkSpeechSupport();

VoiceAssistant.start();

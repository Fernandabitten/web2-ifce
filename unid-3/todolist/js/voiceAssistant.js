export const VoiceAssistant = (() => {
  // Inicializa o reconhecimento de voz, usando o objeto padrão do navegador
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "pt-BR";
  recognition.continuous = true; // Continua ouvindo mesmo após reconhecer uma fala
  recognition.interimResults = false; // Desativa resultados parciais (só retorna quando tem certeza)

  let commandCallback = () => {};

  // Evento disparado quando há um resultado de fala reconhecida
  recognition.onresult = (event) => {
    // Pega o texto da última fala reconhecida
    const transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();
    // Chama a função de callback com esse texto
    commandCallback(transcript);
  };

  // Evento disparado quando a fala é finalizada (natural ou por timeout)
  recognition.onend = () => {
    // Reinicia automaticamente a escuta
    recognition.start();
  };

  // Inicia o reconhecimento de voz
  function start() {
    recognition.start();
  }

  // Para o reconhecimento de voz
  function stop() {
    recognition.stop();
  }

  // Define a função que será chamada toda vez que uma fala for reconhecida
  function onCommand(callback) {
    commandCallback = callback;
  }

  // Faz o navegador falar um texto usando síntese de voz
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text); // Cria uma "fala"
    utterance.lang = "pt-BR"; // Cria uma "fala"
    window.speechSynthesis.speak(utterance); // Fala o texto
  }

  return {
    start,
    stop,
    onCommand,
    speak,
  };
})();

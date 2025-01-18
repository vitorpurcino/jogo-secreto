//chamando a tag HTML para realizar a inserção de conteúdo via Javascript
//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo do número secreto";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "informe seu número de 1 a 10";
let listaNumerosSorteados = [];
let limiteNumero = 10;
let numeroAleatorio;
let tentativas;

novoJogo();

function novoJogo() {
  numeroAleatorio = gerarNumeroAleatorio();
  tentativas = 1;

  inserirTexto("h1", "Jogo do número secreto");
  inserirTexto("p", `informe seu número de 1 a ${limiteNumero}`);
  limparCampo();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
function verificarChute() {
  let chute = document.querySelector("input").value;
  let mensagem = tentativas > 1 ? "tentativas" : "tentativa";

  if (chute == numeroAleatorio) {
    inserirTexto("h1", "Acertou!");
    inserirTexto(
      "p",
      `Descobriu o número secreto com ${tentativas} ${mensagem}`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroAleatorio) {
      inserirTexto("p", "o número secreto é menor");
    } else {
      inserirTexto("p", "o número secreto é maior");
    }
    limparCampo();
  }
  tentativas++;
}
function inserirTexto(tag, texto) {
  let tagHtml = document.querySelector(tag);
  tagHtml.innerHTML = texto;

  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}
function gerarNumeroAleatorio() {
  let numeroSorteado = parseInt(Math.random() * limiteNumero + 1);

  if (listaNumerosSorteados.length == limiteNumero) {
    listaNumerosSorteados = [];
    return gerarNumeroAleatorio();
  } else if (listaNumerosSorteados.includes(numeroSorteado)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroSorteado);
    console.log(listaNumerosSorteados);
    return numeroSorteado;
  }
}
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

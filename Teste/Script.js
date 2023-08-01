const palavrasPorCategoria = {
  animais: ["cachorro", "gato", "macaco", "leao", "girafa"],
  frutas: ["banana", "maça", "laranja", "uva", "morango"],
  profissoes: ["desenvolvedor", "farmaceutica", "professor", "administraçao", "faxineira"],
};

let categoriaEscolhida = "";
let palavraEscolhida = "";
let letrasCorretas = new Set();
let letrasErradas = new Set();
let tentativas = 0;
const maxTentativas = 6;

const palavraDiv = document.getElementById("words");
const tentativasDiv = document.getElementById("attempts");
const forcaImg = document.getElementById("forca-img");
const letrasErradasDiv = document.getElementById("wrong");
const teclado = document.getElementById("teclado");

function escolherCategoriaAleatoria() {
  const categorias = Object.keys(palavrasPorCategoria);
  const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
  return categoriaAleatoria;
}

function escolherPalavraAleatoria(categoria) {
  const palavrasDaCategoria = palavrasPorCategoria[categoria];
  const palavraAleatoria = palavrasDaCategoria[Math.floor(Math.random() * palavrasDaCategoria.length)];
  return palavraAleatoria;
}

function exibirPalavra() {
  let exibicao = "";
  for (const letra of palavraEscolhida) {
    if (letrasCorretas.has(letra)) {
      exibicao += letra;
    } else {
      exibicao += "_";
    }
    exibicao += " ";
  }
  palavraDiv.textContent = exibicao;
}

function exibirCategoria() {
  const categoryElement = document.getElementById("category");
  categoryElement.textContent = "Categoria: " + categoriaEscolhida;
}

function exibirLetrasErradas() {
  if (letrasErradas.size > 0) {
    const letrasErradasStr = Array.from(letrasErradas).join(", ");
    letrasErradasDiv.textContent = "Letras erradas: " + letrasErradasStr;
  } else {
    letrasErradasDiv.textContent = "Letras erradas:";
  }
}

function selecionarLetra(letra) {
  verificarLetra(letra);
}

function verificarLetra(letra) {
  letra = letra.toLowerCase();
  if (!letra.match(/[a-z]/)) {
    alert("Digite apenas uma letra válida.");
    return;
  }

  if (letrasCorretas.has(letra) || letrasErradas.has(letra)) {
    alert("Você já tentou essa letra antes.");
    return;
  }

  if (palavraEscolhida.includes(letra)) {
    letrasCorretas.add(letra);
  } else {
    letrasErradas.add(letra);
    tentativas++;
    forcaImg.style.background = `url('Imagem/forca-${tentativas}.png')`;
  }

  tentativasDiv.textContent = `Tentativas restantes: ${maxTentativas - tentativas}`;

  exibirPalavra();
  exibirLetrasErradas();
  atualizarJogo();
}

function atualizarJogo() {
  if (letrasErradas.size >= maxTentativas) {
    alert("Você perdeu! A palavra era: " + palavraEscolhida);
    forcaImg.style.background = `url('Imagem/forca-${maxTentativas}.png')`;
    desabilitarTeclado();
  } else if (!palavraDiv.textContent.includes("_")) {
    alert("Parabéns! Você acertou a palavra: " + palavraEscolhida);
    desabilitarTeclado();
  }
}

function desabilitarTeclado() {
  teclado.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
}

function reiniciarJogo() {
  categoriaEscolhida = escolherCategoriaAleatoria();
  palavraEscolhida = escolherPalavraAleatoria(categoriaEscolhida);

  letrasCorretas.clear();
  letrasErradas.clear();
  tentativas = 0;
  forcaImg.style.background = "url('Imagem/Forca.png')";
  teclado.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });

  exibirPalavra();
  exibirLetrasErradas();
  tentativasDiv.textContent = `Tentativas restantes: ${maxTentativas}`;
  exibirCategoria();
  letraInput.value = "";
}

exibirCategoria();
exibirPalavra();
exibirLetrasErradas();
reiniciarJogo();
tentativasDiv.textContent = `Tentativas restantes: ${maxTentativas}`;





const palavrasPorCategoria = {
  Animais: ["cachorro", "gato", "macaco", "leao", "girafa"],
  Frutas: ["banana", "maça", "laranja", "uva", "morango"],
  Profissões: ["desenvolvedor", "farmaceutica", "professor", "administraçao", "faxineira"],
};

let categoriaEscolhida = "";
let palavraEscolhida = "";
let letrasCorretas = new Set();
let letrasErradas = new Set();
let tentativas = 0;
const maxTentativas = 6;

const palavraDiv = document.getElementById("words");
const tentativasDiv = document.getElementById("attempts");
const letraInput = document.getElementById("letter");
const forcaImg = document.getElementById("forca-img");
const letrasErradasDiv = document.getElementById("wrong");

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

function exibirTentativasRestantes() {
  const tentativasRestantes = maxTentativas - tentativas;
  tentativasDiv.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

function verificarLetra() {
  const letra = letraInput.value.toLowerCase();
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

  exibirPalavra();
  exibirLetrasErradas();
  exibirTentativasRestantes(); 
  letraInput.value = "";

  if (tentativas === maxTentativas) {
    alert("Você perdeu! A palavra era: " + palavraEscolhida);
    forcaImg.style.background = `url('Imagem/forca-${maxTentativas}.png')`;
    letraInput.disabled = true;
  } else if (!palavraDiv.textContent.includes("_")) {
    alert("Parabéns! Você acertou a palavra: " + palavraEscolhida);
    letraInput.disabled = true; 
  }
}

function reiniciarJogo() {
  categoriaEscolhida = escolherCategoriaAleatoria();
  palavraEscolhida = escolherPalavraAleatoria(categoriaEscolhida);

  letrasCorretas.clear();
  letrasErradas.clear();
  tentativas = 0;
  forcaImg.style.background = "url('Imagem/Forca.png')";
  letraInput.disabled = false;

  exibirPalavra();
  exibirLetrasErradas();
  tentativasDiv.textContent = `Tentativas restantes: ${maxTentativas}`;
  exibirCategoria();
  exibirTentativasRestantes();
  letraInput.value = "";
}

exibirCategoria();
exibirPalavra();
exibirLetrasErradas();
exibirTentativasRestantes();
reiniciarJogo();
tentativasDiv.textContent = `Tentativas restantes: ${maxTentativas}`;





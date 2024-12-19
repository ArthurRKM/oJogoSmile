// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true; // variável jogar volta a ser verdadeira
  let divis = document.getElementsByTagName("div");
  
  // Percorremos todas as divs armazenadas
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id >= 0 && divis[i].id <= 6) { // Verificamos se são as divs válidas
      divis[i].className = "inicial";
      
      // Remove todas as imagens dentro das cartas
      while (divis[i].firstChild) {
        divis[i].removeChild(divis[i].firstChild);
      }
    }
  }

  // Remove a imagem do Smile, se existir
  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.className = "imagem-acerto";
  img.src = "https://media.istockphoto.com/id/497602815/vector/emoticon-with-dollars.jpg?s=612x612&w=0&k=20&c=h0C9oMcyEjL7ayRNuHQBLL81R8opeD2sqZlqFisKXAc=";
  obj.appendChild(img);
}

// Links das imagens que serão mostradas nas cartas erradas
const imagensErradas = [
  "https://cdn.pixabay.com/photo/2020/02/08/00/40/emoji-4828792_960_720.png",
  "https://i.pinimg.com/736x/37/e9/49/37e9491d6cc4924d5c5817f6c224f56b.jpg",
  "https://w7.pngwing.com/pngs/866/54/png-transparent-emoji-sadness-emoticon-smiley-sad-emoji-crying-imoji-face-sticker-desktop-wallpaper-thumbnail.png",
  "https://i.pinimg.com/474x/59/26/1a/59261a8d4dfc313fbdf7a5f5c1d9b7ad.jpg",
  "https://i.pinimg.com/550x/7a/6a/6b/7a6a6bc6a06aa76609f7d23ed905507c.jpg",
  "https://st3.depositphotos.com/1001911/32574/v/1600/depositphotos_325741980-stock-illustration-sad-crying-emoticon.jpg"
];

// Função que exibe as cartas erradas
function mostrarErros(sorteado, clicado) {
  const divis = document.getElementsByClassName("inicial");
  const cartasErradas = [];
  

  // Coletando cartas erradas
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id != sorteado && divis[i] != clicado) {
      cartasErradas.push(divis[i]);
    }
  }

  // Exibir as imagens erradas
  for (let i = 0; i < cartasErradas.length; i++) {
    const img = new Image(100, 150); // Largura e altura da imagem
    img.src = imagensErradas[i]; // Use uma imagem diferente para cada carta errada
    img.className = "imagem-erro"; // Classe para aplicar estilo se necessário
    cartasErradas[i].appendChild(img);
    cartasErradas[i].className = "errou"; // Atualiza a classe para indicar erro
  }
}

// Função que verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 10) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 7);
    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
      mostrarErros(sorteado, obj); // Chama a função para mostrar as cartas erradas
    }
    
    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
  // Adicionando a imagem de erro na carta errada
  const imgErro = new Image(100, 150);
  imgErro.src = "https://i.pinimg.com/736x/e6/9a/ca/e69acae1176c249d95dcea23f85381c9.jpg";
  imgErro.alt = "Carta Errada";
  obj.appendChild(imgErro); // Adiciona a imagem dentro da carta errada
}



// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

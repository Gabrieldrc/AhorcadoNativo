let palabraSecreta;
let letras_jugadas = [];
let vidas;

function guardarPalabra() {
  let palabraInput = document.getElementById("palabra_secreta").value;
  console.log(palabraInput);
  if (palabraInput.length >= 2) {
    palabraSecreta = palabraInput;
    mostrarZonaDeJuego();
    return;
  }
  mostrarAdvertencia();
  return;
}

function mostrarAdvertencia() {
  console.log("Advertencia");
}

function mostrarZonaDeJuego() {
  let sections = document.getElementsByTagName("section");
  sections[0].style.display = "none";
  sections[1].style.display = "flex";
  vidas = 3;
  mostrarPalabraGuionada();
  mostrarVidas();
  mostrarTeclado();
}

function mostrarTeclado() {
  const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let teclado = document.getElementById("teclado");
  teclado.innerHTML = "";
  abc.forEach(letra => {
      teclado.innerHTML += '<div class="tecla" id="tecla_'+ letra +'" onclick="jugar(\''+ letra +'\')">'+ letra +'</div>';
  });
}

function mostrarPalabraGuionada() {
  let habraGanado = true;
  let containerPalabraGuionada = document.getElementById("palabra_guionada");
  containerPalabraGuionada.innerHTML = "";
  for (let i = 0; i < palabraSecreta.length; i++) {
    if (letras_jugadas.find(letra_jugada => letra_jugada === palabraSecreta[i])) {
      containerPalabraGuionada.innerHTML += '<div class="letra">'+ palabraSecreta[i] +'</div>';
    } else {
      habraGanado = false;
      containerPalabraGuionada.innerHTML += '<div class="letra">_</div>';
    }
  }
  if (habraGanado) {
    mostrarFinDeJuego();
    mostrarGano()
  }
}

function jugar(letra) {
  console.log("se jugo la letra", letra);
  document.getElementById("tecla_"+ letra).style = "background-color: white; color: #ff6347;";
  console.log(!letras_jugadas.find(letra_jugada => letra_jugada === letra));
  if (!letras_jugadas.find(letra_jugada => letra_jugada === letra)) {
    letras_jugadas.push(letra);
    if (palabraSecreta.search(letra) === -1) {
      vidas -= 1;
      mostrarVidas();
      return;
    }
    mostrarPalabraGuionada();
    return;
  }
}

function mostrarVidas() {
  let vidasContainer = document.getElementById("vidas");
  vidasContainer.innerHTML = "";
  if (vidas <= 0) {
    mostrarFinDeJuego();
    mostrarPerdio()
    return;
  }
  for (let i = 0; i < vidas; i++) {
    vidasContainer.innerHTML += "<div class=\"vidas_icono\"></div>";
  }
}

function mostrarFinDeJuego() {
  let sections = document.getElementsByTagName("section");
  sections[1].style.display = "none";
  sections[2].style.display = "flex";
}

function mostrarPerdio() {
  document.getElementById("perdio").style = "display: flex;";
  document.getElementById("gano").style = "display: none;";
}

function mostrarGano() {
  document.getElementById("gano").style = "display: flex;";
  document.getElementById("perdio").style = "display: none;";
}

function jugarDeNuevo() {
  let sections = document.getElementsByTagName("section");
  palabraSecreta = "";
  letras_jugadas = [];
  sections[0].style.display = "flex";
  sections[2].style.display = "none";
}
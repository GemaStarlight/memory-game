// Objetos de cada personaje
// Images powered by Gema!!!

const arrayPersonajes = [
    {
        nombre: "Anna",
        ruta: "img/Anna.png"
    },
    {
        nombre: "Campanilla",
        ruta: "img/Campanilla.png"
    },
    {
        nombre: "Cenicienta",
        ruta: "img/Cenicienta.png"
    },
    {
        nombre: "Elsa",
        ruta: "img/Elsa.png"
    },
    {
        nombre: "Flynn",
        ruta: "img/Flynn.png"
    },
    {
        nombre: "Genio",
        ruta: "img/Genio.png"
    },
    {
        nombre: "HadaMadrina",
        ruta: "img/HadaMadrina.png"
    },
    {
        nombre: "Mushu",
        ruta: "img/Mushu.png"
    },
    {
        nombre: "Pascal",
        ruta: "img/Pascal.png"
    },
    {
        nombre: "Pepito",
        ruta: "img/Pepito.png"
    },
    {
        nombre: "Primavera",
        ruta: "img/Primavera.png"
    },
    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel.png"
    }
]

const game = document.getElementById("game");

const rejilla = document.createElement("section"); // Para crear un elemento que no existe (en este caso, la rejilla)

const winner = document.getElementById("winner");


rejilla.setAttribute("class","rejilla"); // Otra forma de añadirle una clase a un elemento


// Creamos una constante a partir del id de un elemento de html
const song = document.getElementById("song");
const clic = document.getElementById("clic");
const bounce = document.getElementById("bounce");
const win = document.getElementById("win");
const fail = document.getElementById("fail");



var contador = 0;
var primerSel = "";
var segundoSel = "";
var selPrevio = null;
var eliminados = 0;

var start = document.getElementById("start");
var reloj = document.getElementById("reloj");
var gameover = document.getElementById("game-over");

var quedan = document.getElementById("quedan");
var llevas = document.getElementById("llevas");
var cabecera = document.getElementById("cabecera");

var faltan = 24;
var tienes = 0;

var segundos = 45;


// Función barajar los div con cada personaje

function baraja() {
    const personajesDoble = arrayPersonajes.concat(arrayPersonajes).sort(() => 0.5 - Math.random()); // Para almacenar en personajesDoble el arrayPersonajes concatenado con sí mismo (como si se duplicara)
    // sort() -> método que ordena los array
    // random() -> método que devuelve un número aleatorio entre el cero y el uno

    game.appendChild(rejilla);

    personajesDoble.forEach(personaje => { // Código que quiero ejecutar para cada personaje
        const { nombre, ruta } = personaje;
        const tarjeta = document.createElement("div"); // Para cada personaje, me crea una tarjeta -> un div 
        tarjeta.classList.add("tarjeta"); // A cada div de las tarjetas, le otorga la clase tarjeta
        tarjeta.dataset.name = nombre; // Le añade el nombre de cada personaje al objeto tarjeta que se cree

        const anverso = document.createElement("div"); // creo una constante "anverso"
        anverso.classList.add("anverso"); // Al div "anverso" le otorga la clase "anverso"
        
        const reverso = document.createElement("div"); // Creo una constante "reverso"
        reverso.classList.add("reverso"); // Al div "reverso" le otorga la clase "reverso"

        reverso.style.backgroundImage = `url(${ruta})`; // A cada objeto, le voy a crear un fondo que será cada una de las imágenes de cada personaje

        rejilla.appendChild(tarjeta);
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);
    });
    gameover.style.opacity = "0"; // Quito el gameover
    winner.classList.remove("open"); // Quito a winner la clase open, para que no aparezcan las letras
    rejilla.classList.remove("out"); // Quito a rejilla la clase out
    rejilla.classList.add("start"); // Añado a rejilla la clase start
    start.style.display = "none"; // Quito el botón
    reloj.style.display = "initial"; // Añado el reloj
    quedan.style.display = "initial";
    llevas.style.display = "initial";
    song.play(); // Hace que comience la canción song
    eliminados = 0; // Devuelve el valor cero a eliminados
    reloj.style.color = "#4b0082";
    cabecera.classList.remove("centrada");
    // reloj.classList.remove("fogonazo");

    document.getElementById("quedan").innerHTML = "Quedan: " + faltan;
    document.getElementById("llevas").innerHTML = "Llevas: " + tienes;
}


// Función de inicio del juego y reloj cuenta atrás

function startGame() {
    // reloj.style.display = "initial";
    // rejilla.classList.add("start"); // Le añade la clase start
    // gameover.style.display = "none"; // Para que el game over vuelva a desaparecer
    // start.style.display = "none"; // Para que empiece sin mostrar ese estilo
    // song.play(); // Para que empiece a sonar la música al empezar la función

    // reloj.classList.remove("fogonazo");

    var s = parseInt(segundos % 60); // El valor de la variable s será la parte entera de la división
    var ss = ("0" + s).slice(-2); 
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;

    if (eliminados === 24) {
        return;
    }

    // El método setTimeout() ejecuta una función cuando pase una determinada cantidad de tiempo
    // setTimeout(función, tiempo) ((El tiempo en JavaScript siempre va en milisegundos))
    if (segundos > 0) {
        var t = setTimeout(function(){
            startGame();
        }, 1000);
    } else {
        gameOver(); // Invoca la función gameOver
    }
    
    segundos--;

    if (segundos < 10) {

        var fogo1 = setTimeout(function(){
            reloj.style.color = "#ff0000";
            reloj.style.fontSize = "55px";
            reloj.style.transition = "color 200ms";
        }, 001)
        
        var fogo2 = setTimeout(function(){
            reloj.style.color = "#4b0082";
            reloj.style.fontSize = "40px";
            reloj.style.transition = "color 200ms, font-size 750ms";
        }, 250)
        
        // reloj.classList.add("fogonazo");
    }
}



// Función para ejecutar la lógica de partida perdida

function gameOver() { // Declarando la función gameOver
    segundos = 45;
    song.pause(); // Para parar la música
    song.currenTime = 0;
    fail.play();
    rejilla.classList.add("out"); // Añade a la rejilla la clase out
    gameover.style.opacity = "1"; // Le da a la variable gameover el estilo inicial
    start.style.display = "initial"; 
    reloj.style.display = "none";
    quedan.style.display = "none";
    llevas.style.display = "none";
    cabecera.classList.add("centrada");
    setTimeout(function() {
        while(rejilla.firstChild) { // Mientras se de la condición que esté en los paréntesis, ejecuto el algo entre llaves (En este caso, mientras exista un primer hijo)
            rejilla.removeChild(rejilla.firstChild); // Elimina el primer hijo
        }
    },1000); // Con setTimeout, hacemos que el while tarde en ejecutarse 1 segundo (1000 ms). De esa forma, las tarjetas suben para desaparecer por la parte superior de la pantalla (que hemos hecho antes), y luego se ejecuta el while, borrando las tarjetas
    
}



// Evento clic para seleccionar cada personaje

rejilla.addEventListener("click", function(evento){
    clic.currenTime=0;
    clic.play();

    var seleccionado = evento.target
    if (seleccionado.nodeName === "SECTION" || seleccionado.parentNode === selPrevio || seleccionado.parentNode.classList.contains("eliminado")) {
        return;
    } // Si el elemento seleccionado tiene un nodo de nombre SECTION, no devuelve nada, pero impide que se ejecute la clase seleccionado
    if (contador < 2) { // Si la variable contador es menor de cero, impide seleccionar una nueva imagen (de esta forma, sólo se podrán seleccionar dos imágenes a cada "turno")
        contador++;
        if (contador === 1) {
            primerSel = seleccionado.parentNode.dataset.name; // el primer seleccionado adopta el nombre de la imagen
            seleccionado.parentNode.classList.add("seleccionado");
            selPrevio = seleccionado.parentNode;
        } else { 
            segundoSel = seleccionado.parentNode.dataset.name; // el primer segundo adopta el nombre de la imagen
            seleccionado.parentNode.classList.add("seleccionado");
        }
        if (primerSel != "" && segundoSel != "") { // Si el primer y el segundo seleccionado son distintos de vacío
            if(primerSel === segundoSel) { // Si el primer seleccionado es igual al segundo seleccionado
                bounce.currenTime=0;
                bounce.play();
                setTimeout(eliminar,600); // Llama a la función eliminar una vez que pasen 600 milisegundos
                setTimeout(resetSel,600); // Llama a la función resetear seleccionado
                contEliminados(); // LLama al a función contar eliminados
            } else { // Si no (si el primer seleccionando no es igual al segundo seleccionado)
                setTimeout(resetSel,600); // Resetear
                selPrevio = null;
            }
        }
        // selPrevio = seleccionado.parentNode;
    }
});
// addEventListener("evento", function(){}) 
// target -> propiedad que dice el elemento que has pulsado


// Función para eliminar los elementos coincidentes

var eliminar = function() { // Definiendo la función eliminar
    var seleccionados = document.querySelectorAll(".seleccionado"); // 
    seleccionados.forEach(elemento => { // Para cada elemento seleccionado
        elemento.classList.add("eliminado"); // Añade la clase "eliminado"
    });
}


// Función para resetear los seleccionados después de 2 intentos

var resetSel = function() {
    contador = 0;
    primerSel = "";
    segundoSel = "";

    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(elemento => { // Por cada elemeneto seleccionado
        elemento.classList.remove("seleccionado"); // Le quito la clase seleccionado
    });
}


// Función para contar los eliminados y cuando lleguen a 24, ejecutar la lógica de partida ganada

var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length + 2; // Creo una variable eliminados que cuenta los elementos con la clase eliminados
    // console.log(eliminados);
    if (eliminados === 24) { // Si la variable eliminados tiene valor 24 (es decir, si se han eliminado todas las imágenes)
        winner.classList.add("open"); // Le añado a winner la clase open, para que aparezcan las letras
        win.currenTime = 0; 
        win.play(); // Inicio la musiquita de winner
        segundos = 45; // Vuelve a poner el contador a 10
        song.pause(); // Para parar la música de juego
        song.currenTime = 0; 
        rejilla.classList.add("out");
        start.style.display = "initial";
        reloj.style.display = "none";
        quedan.style.display = "none";
        llevas.style.display = "none";
        cabecera.classList.add("centrada");
        setTimeout(function() {
            while(rejilla.firstChild) { // Mientras se de la condición que esté en los paréntesis, ejecuto el algo entre llaves (En este caso, mientras exista un primer hijo)
                rejilla.removeChild(rejilla.firstChild); // Elimina el primer hijo
            }
        },1000); // Con setTimeout, hacemos que el while tarde en ejecutarse 1 segundo (1000 ms). De esa forma, las tarjetas suben para desaparecer por la parte superior de la pantalla (que hemos hecho antes), y luego se ejecuta el while, borrando las tarjetas
    }

    var faltan = 24 - eliminados;
    document.getElementById("quedan").innerHTML = "Quedan: " + faltan;
    var tienes = 0 + eliminados;
    document.getElementById("llevas").innerHTML = "Llevas: " + tienes;

}

// song.play();
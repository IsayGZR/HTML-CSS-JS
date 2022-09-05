//Definimos la varaibles a utilizar 
let order = []
let playerOrder = []
let flash
let turn
let good
let compTurn
let intervalId
let strict = false
let noise = true
let on = false
let win 

const turnCounter = document.querySelector("#turn")
const topLeft = document.querySelector("#topleft")
const topRight = document.querySelector("#topright")
const bottomLeft = document.querySelector("#bottomleft")
const bottomRight = document.querySelector("#bottomright")
const strictButton = document.querySelector("#strict")
const onButton = document.querySelector("#on")
const startButton = document.querySelector("#start")

//Creamos el primer evento para el boton strict (Modo de juego estricto solo se tiena una sola vida por juego)
strictButton.addEventListener('change', (event) => {
    //Si el boton es presionado entonces el modo estrict pasa a true
    if(strictButton.checked == true){
        strict = true
    }else{
        strict = false
    }
})

//Creamos el segundo evento para el boton on (Boton para encerder el juego)
onButton.addEventListener('click', (event) =>{
    //Si el boton es presionado el boton del juego pasa a hacer true para encendr el juego
    if(onButton.checked == true){
        on = true
        //Cuando el boton se presiono se le agregar un "-" al contador 
        turnCounter.innerHTML = "-"
    } else{
        //Si el boton no se presiono no se le agrega nada al contador debido a que el juego no ha iniciado, el boton on se mantinen en false
        on = false
        turnCounter.innerHTML = ""
        //Se crean 2 funciones para dar como terminado el juego
        // cleanColor() -> limpia la pantalla, cuando se apague el juego
        clearColor()
        // cleanInterval() -> limpia la pantalla del contador una ves que se alla dando al apagado del juego
        clearInterval(intervalId)
    }
})

//Creamos el tercer evento para el boton start (Boton para dar inicio al juego)
startButton.addEventListener('click', (event) =>{
    //si on o win son true se da inicio al juego atraves de la funcion play() 
    if(on || win){
        play()
    }
})

//Se crea la funcion play()-funcion que le da el inicio al juego
function play(){
    //Establecemos los valores de las varialbes prevviamente definidas
    win = false
    order = []
    playerOrder = []
    flash = 0
    turn = 1
    //Esta linea del codigo sirve para mostrar el pantalla del contador 1 
    turnCounter.innerHTML = 1
    good = true
    //Se inicializa un ciclo for para aignar los valores que van a ir tomando en el tablero (valores del 1 - 4)
    for (var i = 0; i<20; i++){
        //Se establecen aleatoriamente los valores con la funcion Math.flor para redondear hacia abajo y se le suma 1 para empezar desde 1.
        //Con el metodo Math.random se le asigna que se tomaran 4 valores en este caso del 1 al 4
        order.push(Math.floor(Math.random() * 4) + 1)
    }
    compTurn = true

    //Establece el intervalo que ejecutara la funcion gameTurn cada 800 ms, para encender la luz del tablero
    intervalId = setInterval(gameTurn, 800)
}


//Definimos la funcion gameTurn declara en el intervalId 
function gameTurn(){
    /*on es igual a false el jugador no puede hacer clic en ninguno de estos botones, por lo que mientras la computadora muestra
     los colores, no queremos que el jugador pueda hacer clic en cualquiera de los botones entonces es por eso que on está configurado 
     como falso*/
    on = false

    //Si la cantidad de veces que las luces parpadearon es igual al turno en el que estamos, el turno se muestra aquí
    if(flash == turn){
        /*eso significa que el turno de la computadora terminó.
        Entonces se borrara el intervalo y mostrará lo que sucede si el turno de la computadora no ha terminado, 
        pero si han terminado de parpadear todas la luces, vamos a borrar intervalo de igual manera*/
        clearInterval(intervalId)
        //compTurn va a ser igual  a falso
        compTurn = false
        //borraremos si algun color esta encendido
        clearColor()
        //on será igual a true eso significa que el jugador ahora puede comenzar a presionar los botones
        on = true
    }
    //Si es el turno de la computadora entonces haremos estas cosas
    if(compTurn){
        //Borrar el color de la última vez que encendió la computadora
        clearColor()
        /*Se establece un tiempo de espera, por lo que el intervalo establecido seguirá repitiendo esto una y otra vez,
        esto va a ejecutar esta función después de una cierta cantidad de milisegundos*/
        setTimeout(() =>{
            /*Order es un array por lo tanto, el flash es la cantidad de veces que hemos mostrado un color y el flash comienza en cero,
            por lo que cero es el primer elemento de la matriz, si el primer elemento de la matriz es uno,
            recordando que esta matriz es una matriz de números aleatorios uno dos tres cuatro, por lo que si el primer elemento es uno, 
            ejecutaremos la función one*/
            if(order[flash] == 1) one()
            if(order[flash] == 2) two()
            if(order[flash] == 3) three()
            if(order[flash] == 4) four()
            //Incrementamos la variable flash 
            flash++
        }, 200)
    }
}

function one(){
    //Si hay un ruido ejecutamos lo siguiente *Sonidos definidos previemente en el HTML
    if(noise){
        let audio = document.getElementById("clip1")
        audio.play()
    }
    noise = true
    //Cambiamos el estilo css cambiando el color de fondo, cambinado un poco la tonalidad del color verde
    topLeft.style.backgroundColor = "lightgreen"
}

function two(){
    //Si hay un ruido ejecutamos lo siguiente *Sonidos definidos previemente en el HTML
    if(noise){
        let audio = document.getElementById("clip2")
        audio.play()
    }
    noise = true
    //Cambiamos el estilo css cambiando el color de fondo, cambinado un poco la tonalidad del color verde
    topRight.style.backgroundColor = "tomato"
}

function three(){
    //Si hay un ruido ejecutamos lo siguiente *Sonidos definidos previemente en el HTML
    if(noise){
        let audio = document.getElementById("clip3")
        audio.play()
    }
    noise = true
    //Cambiamos el estilo css cambiando el color de fondo, cambinado un poco la tonalidad del color verde
    bottomLeft.style.backgroundColor = "yellow"
}

function four(){
    //Si hay un ruido ejecutamos lo siguiente *Sonidos definidos previemente en el HTML
    if(noise){
        let audio = document.getElementById("clip4")
        audio.play()
    }
    noise = true
    //Cambiamos el estilo css cambiando el color de fondo, cambinado un poco la tonalidad del color verde
    bottomRight.style.backgroundColor = "lightskyblue"
}

function clearColor(){
    topLeft.style.backgroundColor = "darkgreen"
    topRight.style.backgroundColor = "darkred"
    bottomLeft.style.backgroundColor = "goldenrod"
    bottomRight.style.backgroundColor = "darkblue"
}

function flashColor(){
    topLeft.style.backgroundColor = "lightgreen"
    topRight.style.backgroundColor = "tomato"
    bottomLeft.style.backgroundColor = "yellow"
    bottomRight.style.backgroundColor = "lightskyblue"
}

//Agregamos mas event listeners a los botones topLeft-topRight-buttomLeft-buttoMRight
topLeft.addEventListener('click', (event) => {
    if(on){
        /*El jugador al hacer click pone 1 aquí, entonces se empuja 1 en la matriz de orden del jugador,
        luego vamos a verificar si el jugador estaba en lo cierto*/
        playerOrder.push(1)
        //Verificamos si el jugador estaba en lo correcot con la siguiente funcion
        check()
        //Si el juegador se equivoco o no llamamos a la funcion one 
        one(); 
        //si el jugador no ha ganado, vamos a establecer el tiempo de espera y vamos a borrar el color
        if(!win){
            //Vamos a resetear el color despues de 300ms
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

topRight.addEventListener('click', (event) => {
    if(on){
        /*El jugador al hacer click pone 2 aquí, entonces se empuja 1 en la matriz de orden del jugador,
        luego vamos a verificar si el jugador estaba en lo cierto*/
        playerOrder.push(2)
        //Verificamos si el jugador estaba en lo correcot con la siguiente funcion
        check()
        //Si el juegador se equivoco o no llamamos a la funcion one 
        two(); 
        //si el jugador no ha ganado, vamos a establecer el tiempo de espera y vamos a borrar el color
        if(!win){
            //Vamos a resetear el color despues de 300ms
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

bottomLeft.addEventListener('click', (event) => {
    if(on){
        /*El jugador al hacer click pone 3 aquí, entonces se empuja 1 en la matriz de orden del jugador,
        luego vamos a verificar si el jugador estaba en lo cierto*/
        playerOrder.push(3)
        //Verificamos si el jugador estaba en lo correcot con la siguiente funcion
        check()
        //Si el juegador se equivoco o no llamamos a la funcion one 
        three(); 
        //si el jugador no ha ganado, vamos a establecer el tiempo de espera y vamos a borrar el color
        if(!win){
            //Vamos a resetear el color despues de 300ms
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

bottomRight.addEventListener('click', (event) => {
    if(on){
        /*El jugador al hacer click pone 4 aquí, entonces se empuja 1 en la matriz de orden del jugador,
        luego vamos a verificar si el jugador estaba en lo cierto*/
        playerOrder.push(4)
        //Verificamos si el jugador estaba en lo correcot con la siguiente funcion
        check()
        //Si el juegador se equivoco o no llamamos a la funcion one 
        four(); 
        //si el jugador no ha ganado, vamos a establecer el tiempo de espera y vamos a borrar el color
        if(!win){
            //Vamos a resetear el color despues de 300ms
            setTimeout(() => {
                clearColor()
            }, 300)
        }
    }
})

function check(){
    /*vamos a verificar si es correcto, así que pone la longitud del orden jugador menos uno,
    que significa lo último en lo que el jugador hizo clic si el orden del jugador no es igual al orden real en el orden del jugador.
    Entonces 'good' es falso*/
    if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) 
    good = false

    //Si ha acertado a todas y 'good' es igual a true, llamamos a la funcion winGame()
    if(playerOrder.length == 20 && good){
        winGame()
    }

    //si 'good' es igual a false, eso significa que el jugador se equivocó en algo
    if(good == false){
        //Se mostrara el color con la siguiente funcion
        flashColor()
        //Se muetra por la pantalla count la palabra NOO
        turnCounter.innerHTML = "NOO"
        //Vamos a establecer un setTimeout de 800ms se comtrara por la patalla el turn y se resetearan los colores
        setTimeout(() => {
            turnCounter.innerHTML = turn
            clearColor()
            //Modo de juego estricto
            if(strict){
                play()
            } else{
                //Se resetean los valores
                compTurn = true
                flash = 0
                playerOrder = []
                good = true
                intervalId = setInterval(gameTurn, 800)
            }
        }, 800)

        noise = false
    }

    if(turn == playerOrder.length && good && !win){
        turn++
        playerOrder = []
        compTurn = true
        flash = 0
        turnCounter.innerHTML = turn
        intervalId = setInterval(gameTurn, 800)
    }
}

function winGame(){
    flashColor()
    turnCounter.innerHTML = "WIN"
    on = false
    win = true
}
//inicializacion variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let tiempoRegresivoId = null;
let juegosGanados = 0;
const timerInicial = timer;

//apuntando a documento html
const buttons = document.querySelectorAll('.card');
const buttonStart = document.getElementById('start');
let mostrarMovimientos =  document.getElementById('movimientos');
let mostrarAcierto=  document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo-restante');
let mostrarJuegosGanados = document.getElementById('winGames');
buttonStart.disabled = true;
//let mostrarMovimientos =  document.getElementById('movimientos');

//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {return Math.random()-0.5});

//funcion tiempo
function contarTiempo()
    {
        //marco el intervalo de tiempo que  lleva el juego
        tiempoRegresivoId = setInterval(()=>
            {
                timer--;
                mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
                if(timer === 0)
                    {
                        clearInterval(tiempoRegresivoId);

                        //cuando se termine el tiempo se bloquean las tarjetas
                        bloquearTarjetas();
                    }
            }, 1000);
    }



function bloquearTarjetas()
    {
        buttons.forEach((button)=> {
            button.innerHTML = numeros[button.id];
            button.disabled = true;
        });
    }

//funcion principal
function destapar(id)
    {
        buttonStart.disabled = false;
        if(temporizador === false)
            {
                contarTiempo();
                temporizador = true;
            }

        tarjetasDestapadas++;
        console.log(tarjetasDestapadas);

        if(tarjetasDestapadas == 1)
       
            {
                 //Mostrar primer numero
                tarjeta1 = document.getElementById(id);
                primerResultado = numeros[id];
                tarjeta1.innerHTML = primerResultado;

                //desahibilitar primer boton
                tarjeta1.disabled = true;

            }
        else if(tarjetasDestapadas === 2){

            tarjeta2 = document.getElementById(id);
            segundoResultado = numeros[id];
            tarjeta2.innerHTML = segundoResultado;

            //deshabilitar segundo boton
            tarjeta2.disabled = true;

            //incrementar movimientos
            movimientos++;
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

            if(primerResultado === segundoResultado)
            {
                //reinicio del contador
                tarjetasDestapadas = 0;

                //aumentar aciertos
                aciertos++;
                mostrarAcierto.innerHTML = `Aciertos: ${aciertos}`;

                if(aciertos === 8)
                    {
                        clearInterval(tiempoRegresivoId);
                        juegosGanados++;
                        mostrarAcierto.innerHTML = `Aciertos: ${aciertos}🏆🏅`;
                        mostrarTiempo.innerHTML = `Genial! tardaste ${timerInicial - timer} segundos`
                        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}😎`;
                        mostrarJuegosGanados.innerHTML = `Juegos ganados: ${juegosGanados}😎`;
                        buttonStart.disabled = false;
                    }
            }
            else
            {
                //mostrar las cartas durante un momento(durante este momento no se pueden realizar mas moviemientos)
                setTimeout(()=>{
                    tarjeta1.innerHTML = ' ';
                    tarjeta2.innerHTML = ' ';
                    tarjeta1.disabled = false;
                    tarjeta2.disabled = false;
                    tarjetasDestapadas = 0;
                },800);
            }
            
        }
    }

function tapar()
    {
        clearInterval(tiempoRegresivoId);
        numeros = numeros.sort(() => {return Math.random()-0.5});
        temporizador = false;
        buttons.forEach((button)=> {
            button.innerHTML = '';
            button.disabled = false;
        });
        timer = 60;
        movimientos = 0;
        aciertos = 0;
        mostrarAcierto.innerHTML = `Aciertos: ${aciertos}`;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    }


buttonStart.addEventListener("click", () => {tapar();});


buttons.forEach((button)=> {
    button.addEventListener("click", () => {destapar(button.id)});
});
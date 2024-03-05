const listaDeTeclas = document.querySelectorAll('.tecla');
var historicoLista = document.querySelectorAll('.lista_h');
const valorNoDisplay = document.getElementById('display');
const historico = document.getElementById('historico');
var numero1 = 0;
var numero2 = 0;
var operador = 0;
var resultado;
var histCortado_Num1;

function criaHistorico(num1, num2, operador, resultado){
    var inner_h = `${num1}${operador}${num2}=${resultado}`;
    h = document.createElement("button");
    h.className = "lista_h";
    h.innerHTML = inner_h;
    historico.appendChild(h);
};
function calcular(num1, num2, operador, i){
    if(operador == "+"){
        resultado = parseFloat(num1) + parseFloat(num2);
    }
    else if(operador == "-"){
        resultado = parseFloat(num1) - parseFloat(num2);
    }
    else if(operador == "*"){
        resultado = parseFloat(num1) * parseFloat(num2);
    }
    else if(operador == "/"){
        resultado = (parseFloat(num1) / parseFloat(num2)).toFixed(2); // resultado com 2 algarismos decimais
    }
    // cria historico apenas na primeira vez que calcular() é chamada
    if(i==1){criaHistorico(numero1, numero2, operador, resultado)}
    return resultado;
};

for (let i = 0; i < listaDeTeclas.length; i++) { // itera por todas as teclas
    const tecla = listaDeTeclas[i];
    tecla.onclick = () => { // tecla clicada
        if(tecla.id != "C" && tecla.id != "="){ // se a tecla não for "clear" ou "igual"
            const valor = tecla.id;
            valorNoDisplay.innerHTML += valor; // o valor da tecla será exibido no display
            if(valor!="+" && valor!="-" && valor!="*" && valor!="/" && operador == 0){
                numero1 += valor;
            } else
            if(valor!="+" && valor!="-" && valor!="*" && valor!="/" && operador != 0){
                numero2 += valor;
            }

            if(tecla.id=="+" || tecla.id=="-" || tecla.id=="*" || tecla.id=="/"  && operador==0 && numero1!=0){
                // se tecla for operador
                operador = tecla.id;
            };
        }
        // final da operação
        else if(tecla.id == "=" && operador != 0){
            valorNoDisplay.innerHTML = calcular(numero1, numero2, operador, 1);
            numero1 = calcular(numero1, numero2, operador, 0);
            numero2 = 0;
            operador = 0;
        }
        // reset
        else if(tecla.id == "C"){
            valorNoDisplay.innerHTML = "";
            numero1 = 0; numero2 = 0; operador = 0;
        }
    };
};

historico.addEventListener('click', (event) => {
    const elementoClicado = event.target;
    if(elementoClicado.classList.contains('lista_h')){
        histCortado_Resultado = elementoClicado.innerHTML.split('=');
        
        valorNoDisplay.innerHTML = histCortado_Resultado[1];
        numero1 = histCortado_Resultado[1];
        numero2 = 0;
    }
})
let edad = 15
mensaje = (edad >= 18) ? "Mayor de edad" : "Menor de edad"; //Operador ternario

let codigo = "M";
/* console.log(mensaje); */
//Areglo de objetos
const listaA = [
    {codigo : "M", turno: "Mañana"},
    {codigo : "T", turno: "Tarde"},
    {codigo : "N", turno: "Noche"}
]
console.log(listaA[0].turno);


//Objeto
const listaB = {
    "M": "Mañana",
    "T": "Tarde",
    "N": "Noche"
}
/* console.log(listaA[0].turno); */
console.log(listaB[codigo]);

const listaC = {
    "01" : {nombre : "Teclado"},
    "02" : {nombre : "Mouse"},
    "03" : {nombre : "Monitor"},
    "04" : {nombre : "Teclado Mecánico"}
}
console.log(listaC["04"].nombre);
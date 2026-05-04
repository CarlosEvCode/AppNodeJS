const paises = ["Argentina", "Brasil", "Chile", "Colombia", "Ecuador"];

//foreach
/* paises.forEach(pais => {
    console.log(pais);
}) */
//map

const personas = [
    { apellidos: "García", nombres: "Juan", edad: 30 },
    { apellidos: "Pérez", nombres: "María", edad: 25 },
    { apellidos: "López", nombres: "Carlos", edad: 35 },
    { apellidos: "Sánchez", nombres: "Ana", edad: 28 },
    { apellidos: "Gómez", nombres: "Luis", edad: 40 }
]

/* paises.map((pais, index) => {
    console.log(`${index + 1}. ${pais}`);
}); */

personas.map((persona, indice) => {
    console.log(persona.nombres, indice);

});
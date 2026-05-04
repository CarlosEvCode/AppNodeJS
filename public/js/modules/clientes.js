"use strict";

const ClientesModule = {
  async init() {
    this._bindEvents();
    await this.load();
  },

  async load() {
    const lienzo = document.getElementById("lienzo").getContext("2d");

    const coloresFondo = [
      "rgba(142, 68, 173,0.7)",
      "rgba(241, 196, 15,0.7)",
      "rgba(231, 76, 60,0.7)",
      "rgba(46, 204, 113,0.7)",
      "rgba(52, 152, 219,0.7)",
      "rgba(155, 89, 182,0.7)",
    ];

    const coloresContorno = [
      "rgba(142, 68, 173,1.7)",
      "rgba(241, 196, 15,1.7)",
      "rgba(231, 76, 60,1.7)",
      "rgba(46, 204, 113,1.7)",
      "rgba(52, 152, 219,1.7)",
      "rgba(155, 89, 182,1.7)",
    ];

    const configuracion = {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 25,
          ticks: {
            stepSize: 5,
          },
        },
      },
    };

    const grafico = new Chart(lienzo, {
      type: "bar",
      data: {
        labels: ["PHP", "JavaScript", "Python", "Java", "C#", "C++"],
        datasets: [
          {
            label: "2025",
            data: [15, 20, 5, 8, 4, 5],
            borderWidth: 3,
            backgroundColor: coloresFondo,
            borderColor: coloresContorno,
          },
          {
            label: "2024",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 3,
            backgroundColor: "white",
            borderColor: coloresContorno,
          },
        ],
      },
      options: configuracion,
    });

    //Referenciar el grafico a nivel de modulo
    this.grafico = grafico;
  },

  _render(lista) {},

  _filter() {},

  /* ── Modal ───────────────────────────── */
  _openModal(mode, template = null) {},

  openEdit(id) {},

  confirmDel(id, name) {},

  async _save() {},

  /* ── Gráfico ───────────────────────────── */
  _renderGrafico() {
    //console.log(this.grafico.data.datasets);
    //Asignando un valor a la vez para cada barra del gráfico
    //Primero 0 = 2024, Segundo 0 = PHP
    this.grafico.data.datasets[0].data[0] = 5;
    this.grafico.data.datasets[0].data[1] = 7;
    this.grafico.data.datasets[0].data[2] = 9;
    this.grafico.data.datasets[0].data[3] = 12;
    this.grafico.data.datasets[0].data[4] = 20;
    this.grafico.data.datasets[0].data[5] = 15;

    //Actualizar el gráfico para que se reflejen los cambios
    this.grafico.update();

    //Tenemos los datos en un objeto ITERABLE (origen => API)
    const datos = [
      { lenguaje: "PHP", valor: 5 },
      { lenguaje: "JavaScript", valor: 7 },
      { lenguaje: "Python", valor: 9 },
      { lenguaje: "Java", valor: 12 },
      { lenguaje: "C#", valor: 20 },
      { lenguaje: "C++", valor: 15 },
    ];
    console.log(datos);

    //Asignando los valores desde el objeto iterable (datos)
    let i = 0;

    this.grafico.data.datasets[1].data = datos.map((d) => d.valor);

    this.grafico.update();
  },

  _bindEvents() {
    document.getElementById("cambiarDatos")?.addEventListener("click", () => {
      this._renderGrafico();
    });
  },
};

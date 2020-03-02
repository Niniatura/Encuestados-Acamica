/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.emisionVoto = new Evento(this);

  var preguntasRecuperadas = JSON.parse(localStorage.getItem('preguntas'));
  if (preguntasRecuperadas) {
    this.preguntas = preguntasRecuperadas;
  };
};


Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    if (this.preguntas.length > 0) {
      return this.preguntas[this.preguntas.length - 1].id; // asi se obtiene la última pregunta
    } else {
      return 0;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    var json = JSON.stringify(this.preguntas);
    localStorage.setItem('preguntas', json);

  },

  
  eliminarPregunta: function (id) {
    var preguntasFiltradas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.preguntas = preguntasFiltradas;
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  
  borrarTodo: function () {
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

 
  editarPregunta: function (nombre, respuestas, id) {
    var preguntaEditada = this.preguntas.find(pregunta => pregunta.id == id);
    console.log(nombre)
    preguntaEditada.textoPregunta = nombre;
    preguntaEditada.cantidadPorRespuesta = respuestas;
    this.guardar();
    this.preguntaEditada.notificar();
  },

 
  agregarVoto: function (id, respuestaSeleccionada) {
    var preguntaVotada = this.preguntas.find(pregunta => pregunta.id == id);
    var respuestaVotada = preguntaVotada.cantidadPorRespuesta.find(respuesta => respuesta.textoRespuesta == respuestaSeleccionada);
    respuestaVotada.cantidad++;
    this.guardar();
    this.emisionVoto.notificar();
  }
};



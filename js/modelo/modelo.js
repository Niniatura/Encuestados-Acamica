/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  this.preguntasRecuperadas = localStorage.getItem('preguntas');
  this.preguntas = ('preguntasRecuperadas', JSON.parse(this.preguntasRecuperadas));

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento (this);
  this.preguntasBorradas = new Evento (this);

  this.guardar();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if(this.preguntas.length > 0){
      return this.preguntas[this.preguntas.length - 1].id;
    }else{
      return 0;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  borrarPregunta: function (id) {
    this.preguntas = this.preguntas.filter(function(i) {
      return i.id !==id;
    });
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  borrarPreguntas: function(){
    this.preguntas = this.preguntas=[];
      this.guardar();
      this.preguntasBorradas.notificar();
    }
};


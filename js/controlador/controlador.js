/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function (pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  eliminarPregunta: function (id) {
    this.modelo.eliminarPregunta(id);
  },
  borrarTodo: function () {
    this.modelo.borrarTodo();
  },
  editarPregunta: function (nombre, respuestas, id) {
    this.modelo.editarPregunta(nombre, respuestas, id);
  },
  agregarVoto: function (id, respuestaSeleccionada) {
    this.modelo.agregarVoto(id, respuestaSeleccionada);
  }

};

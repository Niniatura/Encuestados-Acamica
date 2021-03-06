/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {

  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  this.preguntaAEditar = null;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });
  
  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  });
  
  this.modelo.preguntasBorradas.suscribir(function () {
    contexto.reconstruirLista();
  });
  
  this.modelo.preguntaEditada.suscribir(function () {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    this.reconstruirLista();
    this.configuracionDeBotones();
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
  },

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", 
    
    var nuevoItem = $('<li>', {
      class: 'list-group-item',
      id: pregunta.id,
      text: pregunta.textoPregunta
    });

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function () {
        var respuesta = {
          textoRespuesta: $(this).val(),
          cantidad: 0
        }
        respuestas.push(respuesta);
        
      })
      contexto.limpiarFormulario();

      if (contexto.preguntaAEditar) {
        contexto.controlador.editarPregunta(value, respuestas, contexto.preguntaAEditar);
        e.botonAgregarPregunta.html('Crear Pregunta');
        contexto.preguntaAEditar = null;
      } else {
        contexto.controlador.agregarPregunta(value, respuestas);
      }
    });

    //asociar el resto de los botones a eventos
    e.botonEditarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.preguntaAEditar = id;
      e.botonAgregarPregunta.html('Editar Pregunta');
    })

    e.botonBorrarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.eliminarPregunta(id);
    })

    e.borrarTodo.click(function () {
      contexto.controlador.borrarTodo();
    })

  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};

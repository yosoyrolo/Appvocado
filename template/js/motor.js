/*

Este es un archivo en donde estan todos las funciones de cambio de pagina,
y funvionamiento de la app


*/

//Leer archivos

//abrir una pagina html
function abrirPagina(pagina) {
  ajax.get(
    pagina,
    {},
    function(info) {
      myNavigator.innerHTML = info;
    },
    false
  );
}

//agregar una pagina html
function abrirPagina(pagina) {
  ajax.get(
    pagina,
    {},
    function(info) {
      myNavigator.innerHTML += info;
    },
    false
  );
}

//abrir un archivo JS
function abrirJS(script) {
  ajax.get(
    script,
    {},
    function(js) {
      eval(js);
    },
    false
  );
}

function botonListaSprites() {
  if (
    document.querySelector("#boton-sprites-menu").classList.contains("active")
  ) {
    document.querySelector("#boton-sprites-menu").classList.remove("active");

    toggleSpriteList(false);
  } else {
    document.querySelector("#boton-objetos-menu").classList.remove("active");
    document.querySelector("#boton-rooms-menu").classList.remove("active");
    document.querySelector("#boton-sprites-menu").classList.add("active");

    //Abrir la lista

    toggleSpriteList(true);
    toggleObjectList(false);
    toggleRoomList(false);
  }
}

function botonListaObjetos() {
  if (
    document.querySelector("#boton-objetos-menu").classList.contains("active")
  ) {
    document.querySelector("#boton-objetos-menu").classList.remove("active");
    toggleObjectList(false);
  } else {
    document.querySelector("#boton-sprites-menu").classList.remove("active");
    document.querySelector("#boton-rooms-menu").classList.remove("active");
    document.querySelector("#boton-objetos-menu").classList.add("active");
    toggleSpriteList(false);
    toggleObjectList(true);
    toggleRoomList(false);
  }
}

function botonListaRooms() {
  if (
    document.querySelector("#boton-rooms-menu").classList.contains("active")
  ) {
    document.querySelector("#boton-rooms-menu").classList.remove("active");
    toggleRoomList(false);
  } else {
    document.querySelector("#boton-objetos-menu").classList.remove("active");
    document.querySelector("#boton-sprites-menu").classList.remove("active");
    document.querySelector("#boton-rooms-menu").classList.add("active");
    toggleSpriteList(false);
    toggleObjectList(false);
    toggleRoomList(true);
  }
}

function toggleSpriteList(open) {
  if (open) {
    document.querySelector("#spriteList").classList.remove("closed");
  } else {
    document.querySelector("#spriteList").classList.add("closed");
  }
}

function toggleObjectList(open) {
  if (open) {
    document.querySelector("#objectList").classList.remove("closed");
  } else {
    document.querySelector("#objectList").classList.add("closed");
  }
}

function toggleRoomList(open) {
  if (open) {
    document.querySelector("#roomList").classList.remove("closed");
  } else {
    document.querySelector("#roomList").classList.add("closed");
  }
}

function addSprite() {
  swal("¿Añadir Sprite?", "crear sprite");
}

function addObject() {
  swal({
    text: "Nombre para el Objeto",
    content: "input",
    button: {
      text: "Agregar"
    }
  }).then(name => {
    crearObjeto(name);
    addObjectToList(name);
  });
}

function addRoom() {
  swal({
    text: "Nombre para el Room",
    content: "input",
    button: {
      text: "Agregar"
    }
  }).then(name => {
    crearRoom(name);
    addRoomToList(name);
  });
}

function addObjectToList(name) {
  var newObject = document.createElement("a");
  newObject.className = "nav-group-item";
  newObject.span = document.createElement("span");
  newObject.span.className = "icon icon-dot";
  newObject.innerText = name;
  newObject.appendChild(newObject.span);
  document.querySelector("#objectList-items").appendChild(newObject);
}

function clearObjectList() {
  document.querySelector("#objectList-items").innerHTML = "";
}

function addRoomToList(name) {
  var newObject = document.createElement("a");
  newObject.className = "nav-group-item";
  newObject.span = document.createElement("span");
  newObject.span.className = "icon icon-dot";
  newObject.innerText = name;
  newObject.name = name;
  newObject.appendChild(newObject.span);
  newObject.onclick = function() {
    swal("Edit room");
  };
  document.querySelector("#roomList-items").appendChild(newObject);
}

function clearRoomList() {
  document.querySelector("#roomList-items").innerHTML = "";
}

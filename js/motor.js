let motor = {};
/*



---------------------------------------------------------------------------------------------------------------------- Data


*/

motor.url = "";
motor.titulo = "";
motor.objects = [];
motor.rooms = [];
motor.sprites = [];

/*

---------------------------------------------------------------------------------------------------------------------- New


*/

motor.new = function() {
  // Si se cancela la operacion

  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log("You didn't save the file");
      return;
    }

    // Se crean los directorios para los archivos del juego

    fs.mkdir(fileName, false, function() {
      fs.mkdir(fileName + "/assets", false, function() {
        // Despues de crear la carpeta Objetos
      });
      fs.mkdir(fileName + "/event", false, function() {
        // Despues de crear la carpeta recursos
        fs.copyFile(
          __dirname + "/template/event/draw.js",
          fileName + "/event/draw.js",
          err => {
            if (err) throw err;
            console.log("source.txt was copied to destination.txt");
          }
        );
      });
      fs.mkdir(fileName + "/objects", false, function() {
        // Despues de crear la carpeta escenas
      });
      fs.mkdir(fileName + "/rooms", false, function() {
        // Despues de crear la carpeta escenas
      });
      fs.mkdir(fileName + "/sprites", false, function() {
        // Despues de crear la carpeta escenas
      });
      fs.mkdir(fileName + "/js", false, function() {
        // Despues de crear la carpeta js
        fs.copyFile(
          __dirname + "/template/js/GLTFLoader.js",
          fileName + "/js/GLTFLoader.js",
          err => {
            if (err) throw err;
            console.log("source.txt was copied to destination.txt");
          }
        );
        fs.copyFile(
          __dirname + "/template/js/three.min.js",
          fileName + "/js/three.min.js",
          err => {
            if (err) throw err;
            console.log("source.txt was copied to destination.txt");
          }
        );
        fs.copyFile(
          __dirname + "/template/js/pixi.js",
          fileName + "/js/pixi.js",
          err => {
            if (err) throw err;
            console.log("source.txt was copied to destination.txt");
          }
        );
        fs.copyFile(
          __dirname + "/template/js/motor.js",
          fileName + "/js/motor.js",
          err => {
            if (err) throw err;
            console.log("source.txt was copied to destination.txt");
          }
        );

        fs.writeFile(fileName + "/index.html", fileSource.export(), err => {
          if (err) {
            swal("An error ocurred creating the file ", "err.message", "error");
          }

          swal("Exitoso", "Se pudo crear el propyecto exitosamente", "success");
        });

        motor.titulo = "";
        motor.objects = [];
        motor.rooms = [];
        motor.sprites = [];

        fs.writeFile(
          fileName + "/abrir.esto",
          JSON.stringify({
            objects: motor.objects,
            rooms: motor.rooms,
            sprites: motor.sprites
          }),
          err => {
            if (err) {
              swal(
                "An error ocurred creating the file ",
                "err.message",
                "error"
              );
            }

            clearObjectList();

            swal(
              "Exitoso",
              "Se pudo crear el propyecto exitosamente",
              "success"
            );
          }
        );
      });
    });
  });
};

/*



---------------------------------------------------------------------------------------------------------------------- Save


*/

motor.save = function() {
  // Se crean los directorios para los archivos del juego

  fs.writeFile(
    motor.url + "/abrir.esto",
    JSON.stringify({
      objects: motor.objects,
      rooms: motor.rooms,
      sprites: motor.sprites
    }),
    err => {
      if (err) {
        swal("An error ocurred creating the file ", "err.message", "error");
      }

      fs.writeFile(motor.url + "/index.html", fileSource.export(), err => {
        if (err) {
          swal("No se pudo guardar el proyecto ", err.message, "error");
        }

        swal("Exitoso", "Se pudo guardar el propyecto exitosamente", "success");
      });
    }
  );
};

/*



---------------------------------------------------------------------------------------------------------------------- Open



*/

motor.open = function() {
  dialog.showOpenDialog(fileNames => {
    // Abre una ventana que hace posible escoger el archivo con el que vamos a trabajar
    if (fileNames === undefined) {
      console.log("No file selected");
      return;
    }

    var FileData = fs.readFile(fileNames[0], "utf-8", (err, data) => {
      if (err) {
        swal("An error ocurred reading the file :", err.message, "error");
        return;
      }

      console.log(JSON.parse(data));

      var fileMotor = JSON.parse(data);

      motor.objects = fileMotor.objects;
      motor.sprites = fileMotor.sprites;
      motor.rooms = fileMotor.rooms;

      console.log(motor, "🌅");
      clearObjectList();
      clearRoomList();

      //Llenar lista de objetos
      for (let i = 0; i < motor.objects.length; i++) {
        addObjectToList(motor.objects[i].nombre);
      }

      //Llenar lista de objetos
      for (let i = 0; i < motor.rooms.length; i++) {
        addRoomToList(motor.rooms[i].nombre);
      }

      //Este codigo sirve para sacar el URL del archivo y ver si es 'abrir.esto'

      var arrayCarpetas = fileNames[0].split("/");
      var url = "";
      for (let index = 0; index < arrayCarpetas.length - 1; index++) {
        url += arrayCarpetas[index] + "/";
      }

      if (fileNames[0].split(".")[1] == "esto") {
        motor.url = url;
        swal("Se pudo abrir el proyecto", motor.url, "success");
      } else {
        swal(
          "No se pudo abrir el archivo por que no es 'abrir.esto'",
          motor.url,
          "error"
        );
      }
      //-----------------------------------------------------------------------
    });
  });
};

/*



---------------------------------------------------------------------------------------------------------------------- Export



*/

motor.export = function() {
  swal("Exportar");
};

/*



---------------------------------------------------------------------------------------------------------------------- Play



*/

motor.play = function() {
  window.open(this.url + "index.html", "_blank", "nodeIntegration=no");
};

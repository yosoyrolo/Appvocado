function crearObjeto(name) {
  motor.objects.push({
    nombre: name,
    url: motor.url + "objects/" + name + ".js"
  });

  fs.writeFile(
    motor.url + "objects/" + name + ".js",
    fileSource.object(name),
    err => {
      if (err) {
        swal("No se pudo crear el objeto ", err.message, "error");
      }

      swal("Exitoso", "Se pudo crear el objeto exitosamente", "success");
      motor.save();
    }
  );
}

function crearRoom(name) {
  motor.rooms.push({
    nombre: name,
    url: motor.url + "rooms/" + name + ".js"
  });

  fs.writeFile(
    motor.url + "rooms/" + name + ".js",
    fileSource.room(name),
    err => {
      if (err) {
        swal("No se pudo crear el room ", err.message, "error");
      }

      swal("Exitoso", "Se pudo crear el room exitosamente", "success");
      motor.save();
    }
  );
}

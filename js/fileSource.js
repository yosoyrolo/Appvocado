var fileSource = {};

fileSource.object = function(name) {
  var content = `var {name} = function(){
    //Aqui se declaran las variables principales

    this.draw = function(){
        //Aqui es el evento Draw
    }
}`;

  return content.replace(/{name}/, name);
};
fileSource.room = function(name) {
  var content = `var {name} = function(){
        //Aqui se pondran los objetos del room
    }`;
  return content.replace(/{name}/, name);
};

fileSource.head = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<style>
  html,
  body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
</style>
<script src="js/pixi.js"></script>
<script src="js/three.min.js"></script>
<script src="js/GLTFLoader.js"></script>
<script src="js/howler.min.js"></script>
<title>{titulo}</title>
</head>
<body></body>
<!--Motor-->
<script src="event/draw.js"></script>
<script src="js/motor.js"></script>
`;

fileSource.footer = `
</html>`;

fileSource.getTags = function() {
  var tags = `
  <!--Objetos-->`;

  for (let i = 0; i < motor.objects.length; i++) {
    const element = motor.objects[i];
    tags +=
      `
<script src="objects/` +
      element.nombre +
      `.js"></script>`;
  }

  tags += `
  <!--Rooms-->`;

  for (let i = 0; i < motor.rooms.length; i++) {
    const element = motor.rooms[i];
    tags +=
      `
<script src="rooms/` +
      element.nombre +
      `.js"></script>`;
  }

  return tags;
};

fileSource.export = function() {
  return this.head + this.getTags() + this.footer;
};

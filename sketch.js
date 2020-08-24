


var edge_list = [];
var start = false;

function setup(){
canvas = createCanvas(1920, 1080);
background(255);
noCursor();
var vertices = [];

var r = height * 0.4;
var num = 50;

//Create initial nodes;

for (var i = 0; i < num ; i ++){
var pos = new p5.Vector(width * 0.5 + r * cos(2 * 3.14 * i * 1.0/num), height * 0.5 + r * sin(2 * 3.14 * i * 1.0/num));
vertices.push(new Part(pos.x, pos.y));
}

//Add edges;

for (var i = 0; i < vertices.length - 1;  i++){
  edge_list.push(new Edge(vertices[i], vertices[i+1]));
}

//Add last edge;

edge_list.push(new Edge(vertices[vertices.length - 1], vertices[0]));

frameRate(60);
}

function draw(){
//  background(255);

  if (start){
  //This holds the edges to be removed after a split;
  var toRemove = [];

  //Thi holds the new edges to be added;
  var toAdd = [];

  for (var i = 0; i < edge_list.length; i++){
    var edge = edge_list[i];
    edge.display();
    edge.update();
    var l = edge.getLen();

    if (edge_list.length < 500){
        if ( random(0.0, 1) < 0.001){
          var adds = edge.split();
          toAdd.push(adds[0]);
          toAdd.push(adds[1]);
          edge.remove = true;
       }
      }

     }

//Remove the edges;

for (var i = edge_list.length-1; i>=0; i--){
  var e = edge_list[i];
  if (e.remove){
    edge_list.splice(i, 1);
  }
}

//Add the new edges;
toAdd.forEach( edge => edge_list.push(edge) )

//Get all the vertices;
var vertices = [];
toAdd.forEach( edge => vertices.push(edge.p2) );

//Apply forces between each vertices;

for (var i = 0; i < vertices.length; i++){
  var p = vertices[i];
  for (var j = i + 1 ; j < vertices.length; j++){
    var q = vertices[j];
    p.check(q);
  }
}

edge_list.forEach(edge => edge.move());



  }
}

function mouseClicked(){
  start = true;
}

/*
 function keyPressed(){
   save();
   console.log("Saving!");
 }
 */



function Edge(p1, p2){
  this.p1 = p1;
  this.p2 = p2;
  this.remove = false;

  this.split = function(){
    var middle = new p5.Vector(0.5 * (this.p1.pos.x + this.p2.pos.x), 0.5 * (this.p1.pos.y + this.p2.pos.y));
    var newpoint = new Part(middle.x, middle.y);
    return [new Edge(this.p1, newpoint), new Edge(newpoint, this.p2)];
  }

  this.display = function(){
    //this.p1.display();
    //this.p2.display();
    stroke(0, 20);
    line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
  }






  this.update = function(){
    var l = this.p2.pos.dist(this.p1.pos) - 10;
    var force = new p5.Vector(this.p2.pos.x - this.p1.pos.x, this.p2.pos.y - this.p1.pos.y);
    force.normalize();
    force.mult(l * 0.01);
    this.p1.applyForce(force);
    force.mult(-1.0);
    this.p2.applyForce(force);
  }

  this.move = function(){
    this.p1.bounce();
    this.p2.bounce();
    this.p1.move();
    this.p2.move();
  }

  this.getLen = function(){
    return this.p1.pos.dist(this.p2.pos);
  }
}

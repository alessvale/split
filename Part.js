

//Node class

function Part(x, y) {

  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(random(-1, 1), random(-1, 1));
  this.vel.normalize();
  this.vel.mult(random(1.0, 2.0));
  //Used only for testing reasons;

  this.rad = random(5, 15);

  //Initialize the force vector;

  this.forceApplied = new p5.Vector(0.0, 0.0);


  this.applyForce = function(force){
    this.forceApplied.add(force);
  }

  this.move = function(){
    var radial = new p5.Vector(this.pos.x - width * 0.5, this.pos.y - height * 0.5);
    var m = radial.mag();
    radial.normalize();
    radial.mult(0.05/m);
    this.vel.add(radial);
    this.forceApplied.limit(0.3);
    this.vel.add(this.forceApplied);
    this.vel.limit(0.4);
    this.pos.add(this.vel);
    this.forceApplied = new p5.Vector(0.0, 0.0);
  }

  //For testing reasons

  this.display = function(){
    noStroke();
    fill(0, 2);
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
  }

  //Check distance condition with other vertices

  this.check = function(other){
    var p = other.pos;
    var d = this.pos.dist(p);

    if (d < 10){
      var force = new p5.Vector(p.x - this.pos.x, p.y - this.pos.y);
      force.normalize();
      force.mult(-0.5);
      this.applyForce(force);
      force.mult(1.0);
      other.applyForce(force);
    }
  }

  //Bounce on the wall

  this.bounce = function(){
    if (this.pos.x > width){
      this.pos.x = width;
      this.vel.x = - this.vel.x;
    }
    if (this.pos.x < 0){
      this.pos.x = 0;
      this.vel.x = - this.vel.x;
    }
    if (this.pos.y > height){
      this.pos.y = height;
      this.vel.y = - this.vel.y;
    }
    if (this.pos.y < 0){
      this.pos.y = 0;
      this.vel.y = - this.vel.y;
    }

  }
}

// Arrow
//
// A particle that affects the enemy negatively when collision occured.

// Variable to hold arrow collision boolean
var hitArrow;

// Arrow constructor
//
// Sets the properties with the provided arguments or defaults
function Arrow(x, y, vx, vy, width, height) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = width;
    this.height = height;
}

// update()
//
// Update x and y positions based on velocities
Arrow.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    // Resets arrow if it's out of screen
    if (this.y <= 0) {
      this.reset();
    }
}

// // handleCollision(player)
// //
// // Using the collision library, verify if collision occured
// // If so, enemy size reduces and arrow resets
// Arrow.prototype.handleCollision = function (enemies) {
//     for (var i = 0; i < enemies.length; i++) {
//         hitArrow = collideRectCircle(this.x, this.y, this.width, this.height, enemies[i].x, enemies[i].y, enemies[i].size);
//         if (hitArrow) {
//           enemies[i].size -= 10;
//           this.reset();
//         }
//     }
// }

// display()
//
// Draw the enemy as a blue rectangle on the screen
Arrow.prototype.display = function () {
    push();
    fill(200,250,205);
    rect(this.x, this.y, this.width, this.height);
    pop();
}

// reset()
//
// Removes arrow from array
Arrow.prototype.reset = function () {
  // index = arrows.indexOf(this);
  // arrows.splice(index,1);
}

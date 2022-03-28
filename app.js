module.exports = class MarsRover {
  constructor(coordinates, instructions) {
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.direction = coordinates[2];
    this.instructions = instructions;
    this.delta = {
      NORTH: { x: 0, y: 1 },
      EAST: { x: 1, y: 0 },
      SOUTH: { x: 0, y: -1 },
      WEST: { x: -1, y: 0 },
    };
    this.instructionsChar = new Map([
      ["F", this.forwards],
      ["B", this.backwards],
      ["R", this.rotateRight],
      ["L", this.rotateLeft],
    ]);
    this.obstacleAreas = [
      [1, 4],
      [3, 5],
      [7, 4],
    ];
    this.stopped = false;
    this.currentCoordinates = null;
    this.movesTheRover();
  }

  forwards() {
    for (let obj in this.delta) {
      if (obj === this.direction) {
        this.x += this.delta[this.direction].x;
        this.y += this.delta[this.direction].y;
      }
    }
  }

  backwards() {
    for (let obj in this.delta) {
      if (obj === this.direction) {
        this.x -= this.delta[this.direction].x;
        this.y -= this.delta[this.direction].y;
      }
    }
  }

  // to rotate rover to right side
  rotateRight() {
    let index = this.findIndexElm();
    index++;
    this.direction =
      index > 3 ? Object.keys(this.delta)[0] : Object.keys(this.delta)[index];
  }

  // to rotate rover to left side
  rotateLeft() {
    let index = this.findIndexElm();
    index--;
    this.direction =
      index < 0 ? Object.keys(this.delta)[3] : Object.keys(this.delta)[index];
  }

  // get index of the direction
  findIndexElm() {
    let index = Object.keys(this.delta).findIndex(
      (elm) => elm === this.direction
    );
    return index;
  }

  movesTheRover() {
    for (let i = 0; i <= this.instructions.length; i++) {
      // if rover enter an obstacle area
      for (const area of this.obstacleAreas) {
        if (area.indexOf(this.x) === 0 && area.indexOf(this.y) === 1) {
          this.backwards();
          this.stopped = true;
        }
      }
      /* 
        to avoid extra loop cycle if there is no more instructions
        cuz we need another check to protect rover..
      */
      i < this.instructions.length && !this.stopped
        ? this.instructionsChar.get(this.instructions[i]).call(this)
        : null;
    }
    let isStopped = this.stopped ? "STOPPED" : "";
    this.currentCoordinates = `(${this.x}, ${this.y}) ${this.direction} ${isStopped}`;
  }

  get printCurrentCoordinates() {
    return this.currentCoordinates.trim();
  }
};

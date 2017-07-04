var cols,rows;
var wth = 20;
var grid = [];
var current;
var stack = [];

function setup() {
  createCanvas(600,400);
  //calculating no of rows and cols;
  cols = floor(width/wth);
  rows = floor(width/wth);

  //create each cell
  for(var j = 0; j < rows; j++){
  	for(var i = 0; i < cols; i++){
  		var cell = new Cell(i,j);
  		//console.log(cell);
  		grid.push(cell);
  	}
  }
  //1.Make the initial cell the current cell
  current = grid[0];//
}

function draw() {
  background(51);
  //frameRate(5);
  for(var i = 0; i < grid.length;i++){
  	grid[i].show();
  }
  //marking current cell as visited.
  current.visited = true;
  current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if(next){
  	//console.log(next);
  	next.visited = true;
  	// Step 2
  	stack.push(current);
  	// STEP 3
  	removeWalls(current,next);

  	//STEP 4
  	current = next;
  
  } else if(stack.length>0){
 	current = stack.pop(current);
 	console.log(current);
  }
}

function index(i,j){
	 if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i,j){
	this.i = i;
	this.j = j;

	this.walls = [true, true, true, true];
	this.visited = false;

	this.checkNeighbors = function(){
		// storing unvisited neighbor to the stack
		var neighbors = [];

		var top    = grid[index(i,j-1)];
		var right  = grid[index(i+1,j)];
		var bottom = grid[index(i,j+1)];
		var left   = grid[index(i-1,j)];

		if(top && !top.visited){
			neighbors.push(top);
		}

		if(right && !right.visited){
			neighbors.push(right);
		}

		if(bottom && !bottom.visited){
			neighbors.push(bottom);
		}

		if(left && !left.visited){
			neighbors.push(left);
		}
		//1.1.1 choosing randomly one of the unvisited neighbor
		if(neighbors.length>0){
			var r  = floor(random(0,neighbors.length));
			return neighbors[r];
		}else{
			return undefined;
		}
	}

	this.highlight = function(){
		var x = this.i*wth;
		var y = this.j*wth;
		noStroke();
		fill(0,0,255,100);
		rect(x,y,wth,wth);
	}

	this.show = function(){
		var x = this.i*wth;
		var y = this.j*wth;
		stroke(255);
		if(this.walls[0]){
			line(x      , y    , x + wth, y);
		}
		if(this.walls[1]){
			line(x + wth, y    , x + wth, y+wth);
		}
		if(this.walls[2]){
			line(x      , y+wth, x + wth, y+wth);
		}
		if(this.walls[3]){
			line(x      , y    , x      , y+wth)
		}
		if(this.visited){
			noStroke();
			fill(255,0,255,100);
			rect(x,y,wth,wth);
		}
		// noFill();
		// rect(x,y,wth,wth);
	}
}

function removeWalls(a,b){
	
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
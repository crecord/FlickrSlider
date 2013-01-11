/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 1 Sliding Block Puzzle
Author : Caroline Record
Created : 9/20/12
Modified : 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

var imagePath;
randomFlickrImage();
var imageWidth =  640;
var imageHeight = 426;

//randomize the number of rows and cols   
var numRows = 3 + Math.floor(Math.random()*7);
var numCols = 3 + Math.floor(Math.random()*7);
var emptyTile = {row:0, col: 0};


// figure out how wide and tall each tile should be
  var tileWidth = imageWidth / numCols; 
  var tileHeight = imageHeight / numRows; 

/*
 * Summary: This goes through the rows and columns and draws a tile in each location
 * Returns: nothing
 */
function createTiles(){
  // add all of the tiles to your page using nested for loops and
  for (x=0; x < numRows; x++){
  	for (y=0; y < numCols; y++){
  	  // createDiv. Remember to leave one out for the empty tile
  			if(x !== emptyTile.row || y !== emptyTile.col ){
  			
  			var newDiv= new createDiv(x,y);
  			//var testString="Hello";
  				//var header=document.createElement("H4");
				//document.documentElement.appendChild(header);
				//header.innerText= testString;
  			console.log(x+","+y);
  			// hint: you can use document.body.appendchild
			document.documentElement.appendChild(newDiv.div);
			
			}
  	} 
  }	
  // set the empty tile location
}


/*
 * Summary: Should return a div with the specified width and height 
 * and put it at the supplied row and column
 * Parameters: row and col 
 * Returns: The div you created
 */
function createDiv( row, col){
  // create your div and set its size & position attributes
  // based on parameters
	this.div= document.createElement("div");
	this.div.id= col + "," + row; 
	this.positionLeft = col*tileWidth;
	this.positionTop = row*tileHeight;
	this.div.style.width = tileWidth +"px";
	this.div.style.height = tileHeight +"px";
	this.div.style.position= "absolute";
	this.div.style.left = this.positionLeft +"px";
	this.div.style.top = this.positionTop +"px";
  // Set the div's background
  	var image = "url(" + imagePath+")"; 
  	this.div.style.backgroundImage=image; 
  	this.div.style.backgroundSize="640px 426px";
  // hint: css sprites (tutorial: http://css-tricks.com/158-css-sprites/) are a really
  // nice way to show only a portion of an image on a tile. 
  	this.div.style.backgroundPositionX= -this.positionLeft +"px"; 
  	this.div.style.backgroundPositionY= -this.positionTop +"px";
  // add an event handler that will execute some function you define that will move the 
  // clicked div to the empty tile location if the div is in a valid position
  this.actualRow=row;
  this.actualCol=col;
  // "this" won't be recognized inside the event handler
  var self= this;
  this.div.addEventListener("click",function(event){
  tileClicked(self, event); 
  }); 
}

/*
 * Summary: this function is called whenever a tile is clicked. It checks if the tile is
 * next to the empty tile and switches it if it is.
 * Parameters: self (which gives you access to all the vars in createDiv) and the event(which gives
 * you all the details about the event)
 */
function tileClicked(self,event){
	theda=1; 
	var myDiv = event.target;
	var id = myDiv.id; 
	var idArray = id.split(",");
	var col = parseInt(idArray[0]);
	var row = parseInt(idArray[1]);
    console.log (col + "," + row);
	if ( ( (Math.abs(emptyTile.row - row) === theda) && ( emptyTile.col === col)) 
	|| ( (Math.abs(emptyTile.col - col) === theda) && ( emptyTile.row === row)) ){
	self.div.style.left = emptyTile.col  * tileWidth + "px";
	self.div.style.top = emptyTile.row * tileHeight + "px";
	self.div.id = emptyTile.col + "," + emptyTile.row;
	emptyTile.row = row;
	emptyTile.col = col;

	}
  // check if the tile can move to the empty spot
  // if the tile can move, move the tile to the empty spot
}

/*
 * Summary: Shuffle up the tiles in the beginning of the game
 */
function shuffleTiles(){
console.log("hello");

//run a loop while some number is less than the row and col
var limit = numRows * 20;
var iterator = 0;
while (iterator <= limit){
// find out what the empty position is
// generate two numbers randomly b/w -1-1
var randX;
var randY;
// only apply if it'll keep the empty square within the image

if (emptyTile.row == 0) {
randY = Math.floor(Math.random()*2);
}
else if (emptyTile.row == numRows-1){
randY = Math.floor(Math.random()*2) -1;
}
else{
randY = Math.floor(Math.random()*3) -1;
}

if (emptyTile.col == 0) {
randX = Math.floor(Math.random()*2);
}
else if (emptyTile.col == numCols-1){
randX = Math.floor(Math.random()*2) -1;
}
else{
randX = Math.floor(Math.random()*3) -1;
}
// check if the position is next to and not equivalent to the empty tile
console.log("randx:"+ randX+"randy:"+ randY);
var  oneIsZero = ((randX === 0) || (randY === 0));
var bothNotZero = !((randY === 0) && (randX === 0));
if (oneIsZero && bothNotZero){
var divX = emptyTile.col + randX;
var divY = emptyTile.row + randY;
console.log("emptycol"+ emptyTile.col + "emptyRow"+ emptyTile.row);
var divToSwitch = document.getElementById(divX + "," + divY);
console.log(divX + "," + divY);
// reseting it's position
	divToSwitch.style.left = emptyTile.col  * tileWidth + "px";
	divToSwitch.style.top = emptyTile.row * tileHeight + "px";
    divToSwitch.id = emptyTile.col + "," + emptyTile.row;
	emptyTile.row = emptyTile.row + randY;
	emptyTile.col = emptyTile.col + randX;
//console.log("emptycol2:"+ emptyTile.col + "emptyRow2:"+ emptyTile.row);
}	

iterator++;
}

}


/*
 * Summary:this generates a random image from flickr. by searching a randomly chosen topic 
 * and picking the first image that comes up.
 * Parameters: none 
 * Returns: the image
 */

function randomFlickrImage(){
var searchTerms=new Array("dog","cat","boy","cute","art","funny","drawing","run","pink","sad","athlete", "blue", "lol");
var index=  Math.floor(Math.random()* searchTerms.length);
var term = searchTerms[index];
console.log(term);
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+term+"&tagmode=any&format=json&jsoncallback=?",
        function(data){
          $.each(data.items, function(i,item){
            imagePath= item.media.m;
            console.log(imagePath);    
            if ( i == 0 ) return false;

          });
   			
  });

}

/*
 * When the page loads, create our puzzle
 */
window.onload = function () {
  // generate parameters for a random puzzle2
  // create the tiles
  createTiles();
  shuffleTiles();
  // shuffle the tiles
}
var grid = [];
var idCell = 0;
var nrDivs = 0;
var interval;

function newGrid (divs){
	var idCell = 0;
	var size = 592;
	var newSize = (+size) / (+divs) - 2;
	nrDivs = divs;
	for(var i = 0; i < divs; i++){
		grid[i] = []
		for(var j = 0; j < divs; j++) {
			$div = $('<div class="grid"></div>').attr('id', idCell);
			$(".container").append($div);
			grid[i][j] = {id: idCell, alive: false};
			idCell++;
		}
	}
	$(".grid").height(newSize);
	$(".grid").width(newSize);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomGrid(){
	var grid = []
	var id = 0;
	for(var i = 0; i < nrDivs; i++){
		grid[i] = []
		for(var j = 0; j < nrDivs; j++){
			var r = getRandomInt(0,4);
			if(r == 0) {
				grid[i][j] = {id:id, alive:true};
			} else {
				grid[i][j] = {id:id, alive:false};
			}
			id++;
		}
	}
	this.grid = grid;
	return grid;
}

function getCoordinates(id){
	for(var i = 0; i < nrDivs; i++){
		for(var j = 0; j < nrDivs; j++){
			if(grid[i][j]['id'] == id){
				return [i, j];
			}
		}
	}
	return false;
}

function isAlive(id){
	for(var i = 0; i < nrDivs; i++){
		for(var j = 0; j < nrDivs; j++){
			if(grid[i][j]['id'] == id){
				return grid[i][j]['alive'];
			}
		}
	}
	return false;
}

function aliveNeighbours(id){
	var c = getCoordinates(id);
	var x = c[0];
	var y = c[1];
	var count = 0;

	for(var i = x-1; i <= x+1; i++){
		for(var j = y-1; j <= y+1; j++){
			if(insideGrid(i, j) && (x != i || y != j)){
				if(grid[i][j]['alive']){
					count++;
				}
			}
		}
	}

	return count;
}

function aliveNeighbours(x, y){
	var count = 0;

	for(var i = x-1; i <= x+1; i++){
		for(var j = y-1; j <= y+1; j++){
			if(insideGrid(i, j) && (x != i || y != j)){
				if(grid[i][j]['alive']){
					count++;
				}
			}
		}
	}

	return count;
}

function insideGrid(i, j){
	return i >= 0 && i < nrDivs && j >= 0 && j < nrDivs;
}

function deadGrid(){
	for(var i = 0; i < nrDivs; i++){
		for(var j = 0; j < nrDivs; j++){
			if(grid[i][j]['alive']){
				return false;
			}
		}
	}
	return true;
}

function nextGeneration(){
	var newGeneration = [];
	for(var i = 0; i < nrDivs; i++){
		newGeneration[i] = [];
		for(var j = 0; j < nrDivs; j++) {
			if(grid[i][j]['alive']){
				if(aliveNeighbours(i, j) < 2 || aliveNeighbours(i, j) > 3){
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:false};
				} else {
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:true};
				}

			} else {
				
				if(aliveNeighbours(i, j) == 3){
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:true};
				} else {
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:false};
				}

			}
		}
	}
	grid = newGeneration;
	return newGeneration;
}

function showGrid(newGrid){
	var id = 0;
	for(var i = 0; i < nrDivs; i++){
		for(var j = 0; j < nrDivs; j++) {
			var element = '#' + id;
			$div = $(element);
			if(newGrid[i][j]['alive']){
				$($div).addClass("highlight-click");
			} else {
				$($div).removeClass("highlight-click");
			}
			id++;
		}
	}
}

function defaultGrid(){
	$('.grid').click(function(){
		$(this).toggleClass('highlight-click');
		var divId = +($(this).attr('id'));
		
		var c = getCoordinates(divId);
		var i = c[0];
		var j = c[1];
		grid[i][j]['alive'] = !grid[i][j]['alive'];
	});
}

function next(){
	showGrid(nextGeneration());
}

function run(){
	if(!deadGrid()){
		interval = setInterval(next, 500);
	}
}

function askSize(){
	var s = prompt("Number of rows/columns");
	$('.container').empty();
	newGrid(s);
	defaultGrid();
}

function init(s){
	$('.container').empty();
	newGrid(s);
	defaultGrid();
}

function main (){
	init(16);

	$('#clear').click(function(){
		clearInterval(interval);
		init(16);
	});

	$('#size').click(function(){
		clearInterval(interval);
		askSize();
	});

	$('#next').click(function(){
		clearInterval(interval);
		next();
	});

	$('#run').click(function(){
		run();
	});

	$('#random').click(function(){
		showGrid(randomGrid());
		run();
	});
}

$(document).ready(main);
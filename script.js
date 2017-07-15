var grid = [];
var idCell = 0;
var nrDivs = 0;

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
			console.log(i + ' ' + j);
			console.log(aliveNeighbours(i,j));
			var alive = aliveNeighbours(i, j);
			console.log(alive < 2 || alive > 3);
			console.log(aliveNeighbours(i, j) < 2 || aliveNeighbours(i, j) > 3);
			if(grid[i][j]['alive']){
				if(aliveNeighbours(i, j) < 2 || aliveNeighbours(i, j) > 3){
					console.log('over/underpopulation ' + i + ' ' + j);
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:false};
				} else {
					console.log('keeps true ' + i + ' ' + j);
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:true};
				}

			} else {
				
				if(aliveNeighbours(i, j) == 3){
					console.log('reproduction ' + i + ' ' + j);
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:true};
				} else {
					console.log('keeps false ' + i + ' ' + j);
					newGeneration[i][j] = {id:grid[i][j]['id'], alive:false};
				}

			}
		}
	}
	grid = newGeneration;
	console.log(newGeneration);
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
		
		//console.log(isAlive(divId));
		//console.log(aliveNeighbours(divId));
	});
}

function askSize(){
	var s = prompt("Size of grid");
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
		init(16);
	});

	$('#size').click(function(){
		askSize();
	});

	$('#next').click(function(){
		var next = nextGeneration();
		showGrid(next);
		console.log("new grid");
		console.log(grid);
	});

	//console.log(getCoordinates(0));
	//console.log(getCoordinates(300));
}

$(document).ready(main);
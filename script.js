var grid = [];
var idCell = 0;
var nrDivs = 0;

function newGrid (divs){
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

	console.log(getCoordinates(0));
	console.log(getCoordinates(300));
}

$(document).ready(main);
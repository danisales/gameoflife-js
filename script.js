function newGrid (divs){
	var size = 592;
	var newSize = (+size) / (+divs) - 2;
	for(var i = 0; i < divs; i++){
		for(var j = 0; j < divs; j++) {
			$(".container").append('<div class="grid"></div>');
		}
	}
	$(".grid").height(newSize);
	$(".grid").width(newSize);
}

function defaultGrid(){
	$('.grid').click(function(){
		$(this).toggleClass('highlight-click');
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
}

$(document).ready(main);
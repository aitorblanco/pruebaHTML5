function visible(tipo){
	if (tipo == 1){
		document.getElementById("iguales").style.visibility = "visible";
	}
	if (tipo == 2){
		document.getElementById("tablero").style.visibility = "visible";
	}
}

function pintar(num_cartas, num_elem_x, num_elem_y, num_iguales) {
	// Limpiar el canvas antes de pintar
	$("#canvas").clearCanvas();
	
	cartas_tablero = num_cartas;
	cartas_iguales = num_iguales;
	cartas_x = num_elem_x;
	cartas_y = num_elem_y;
	
	pos_ini_x = 20;
	pos_ini_y = 20;
	pos_x = pos_ini_x;
	pos_y = pos_ini_y;
	ancho = 50;
	largo = 80;	
	dis_x = ancho + largo/4;
	dis_y = largo + pos_ini_y;
	
	canvas.width = (num_elem_x*dis_x) + pos_ini_x;
	canvas.height = (num_elem_y*dis_y) + pos_ini_y;
	
	col_defect = ["white", "black", "gray", "red", "darkred", "deeppink", "orangered", "yellow", 
	"aqua", "saddlebrown", "purple", "greenyellow", "lime", "darkgreen"];
	colores = [""];
	for (p = 0; p < (num_cartas/num_iguales); p++){
		colores[p] = col_defect[p];
	}
	
	arrayColor = [""];
	arrayIndice = [-1];
	descartados = [-1];	
	for (j = 0; j < num_cartas; j++){
		cont = 0;
		do{
			distinto = 0;
			indice = Math.floor((Math.random()*colores.length));		
			for (m = 0; m < descartados.length; m++){
				if (descartados[m] != indice){
					distinto++;
				}
			}
		} while (distinto < descartados.length);		
		
		arrayIndice[j] = indice;
		arrayColor[j] = colores[indice];
		for (m = 0; m < arrayIndice.length; m++){
			if (arrayIndice[m] == indice){
				cont++;
			}
			if (cont == num_iguales){
				descartados.push(indice);
			}
		}
	}
	pintar_cartas(arrayColor, num_cartas, num_iguales);
}

function pintar_cartas(col, num_cartas, num_iguales) {
	contador = 0;
	color_sec = "";
	carta_ant = [];
	pareja = 0;
	
	for (i = 0; i < num_cartas; i++){
		$("#canvas").drawRect({
			layer: true,
			name: "carta-"+i,
			fillStyle: "blue",
			strokeStyle: "black",
			strokeWidth: 3,
			x: pos_x, y: pos_y,
			width: ancho, 
			height: largo,
			fromCenter: false,
			cornerRadius: 15,
			click: function(layer) {
				capa = layer.name.split("-");
				ind = capa[1]; 
				color = col[ind];
				$(this).animateLayer(layer, {
					fillStyle: color,
					rotate: 180
				}, 1000);
				
				if (color == color_sec){
					contador++;
					if (contador == num_iguales){
						color_sec = "";
						contador = 0;
						carta_ant.splice(0, carta_ant.length);
						pareja++;
						if (pareja == (cartas_tablero/cartas_iguales)){
							alert("HAS GANADO");
							pintar(cartas_tablero, cartas_x, cartas_y, cartas_iguales);
						}
					}
					else{
						carta_ant.push(layer.name);
					}
				}
				
				else if (color_sec == ""){
					contador++;
					color_sec = color;
					carta_ant.push(layer.name);
				}
				else{
					$(this).animateLayer(layer, {
						fillStyle: "blue",
						rotate: 0
					}, 1000);
					for (k = 0; k < carta_ant.length; k++){
						$(this).animateLayer(carta_ant[k], {
							fillStyle: "blue",
							rotate: 0
						}, 1000);
					}
					color_sec = "";
					contador = 0;
					carta_ant.splice(0, carta_ant.length);
				}
			}
		});
		
		if ((i+1)%cartas_x == 0){
			pos_y += dis_y;
			pos_x = pos_ini_x;
		}
		else
			pos_x += dis_x;
	}
}

function cambiar_iguales(num_iguales){
	pintar(cartas_tablero,cartas_x,cartas_y,num_iguales);
}

function cambiar_tablero(num_cartas, num_elem_x, num_elem_y){
	pintar(num_cartas,num_elem_x,num_elem_y,cartas_iguales);
}

function ayuda(){
	alert("Esto es la ayuda del juego");
}
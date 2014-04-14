function Modelo() {

    /** Variables **/
    this.miJuego = new Juego();
    this.cVacio = 'EDEDED';
    this.cAmarillo = 'FAFF67';
    this.cRojo = 'FF534D';
    this.cAzul = '2983CC';
    this.cVerde = '27CC40';
    this.sCuadroSel = 0;

    /** Metodos publicos **/

    /**
     * Metodo que contiene la logica del juego
     * @param  {string} insId Nombre del cuadro pulsado
     */
    this.procesarEvento = function(insId) {
        if(!this.miJuego.bTerm) {
            this.moverCuadro(insId);
            this.actualizarTablero();
        }
        $('#multiplicador').html(miModelo.miJuego.iCombo + 'x');
        $('#puntuacion').html(miModelo.miJuego.iPuntosTotal);
        $('#numNivel').html(miModelo.miJuego.iNivel);
    }

    /**
     * Metodo que sincroniza lo que ve el usuario con la matriz
     */
    this.actualizarTablero = function() {
    	var iCont = 0;
    	var cColor;
    	for (var i = 0; i < this.miJuego.iLogTab; i++) {
    		for (var j = 0; j < this.miJuego.iLogTab; j++) {
    			iCont++;
    			switch(this.miJuego.aaTablero[i][j]) {
    				case 0:
    					cColor =  this.cVacio;
    				break;
    				case 1:
    					cColor =  this.cAmarillo;
    				break;
    				case 2:
    					cColor =  this.cRojo;
    				break;
    				case 3:
    					cColor =  this.cAzul;
    				break;
    				case 4:
    					cColor =  this.cVerde;
    				break;
    			}
    			$('#cuadro' + iCont).css('background-color', '#' + cColor);
    		}
    	}
    }

    /**
     * Metodo que mueve los cuadros
     * @param  {string} insCuadro Cuadro pulsado
     */
    this.moverCuadro = function(insCuadro) {
        if(this.miJuego.getVacio(insCuadro)) {//Pulsa sobre vacio 
            if(this.sCuadroSel != 0) {
                this.miJuego.cambiarPos(this.sCuadroSel, insCuadro);
            } 
            this.sCuadroSel = 0;
        } else {
            this.sCuadroSel = insCuadro;
        }
        //Quita seleccionado
        
        if(this.miJuego.bTerm) {
            this.mostrarInterfazFin();
        }

    }

    /**
     * Metodo que selecciona un cuadro
     * @param  {string} insCuadro Cuadro pulsado
     */
    this.seleccionar = function(insCuadro) {
        $('[id^=cuadro]').css('transform', 'scale(1)');
        if(!this.miJuego.getVacio(insCuadro)) {
            $('#' + insCuadro).css('transform', 'scale(0.8)');
        }
    }

    /**
     * Metodo que muestra la interfaz de juego acabado
     */
    this.mostrarInterfazFin = function() {
        $('.cuadroG').css('transform', 'scale(0)');
        $('#botonReiniciar').css('visibility', 'visible');
    }

    /**
     * Metodo que reiniciar el juego
     */
    this.reiniciarJuego = function() {
        $('#botonReiniciar').css('visibility', 'hidden');
        this.miJuego.empezar();
        this.actualizarTablero();
        $('.cuadroG').css('transform', 'scale(1)');
        $('#multiplicador').html(miModelo.miJuego.iCombo + 'x');
        $('#puntuacion').html(miModelo.miJuego.iPuntosTotal);
        $('#numNivel').html(miModelo.miJuego.iNivel);
    }
}
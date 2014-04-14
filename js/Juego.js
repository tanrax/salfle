function Juego() {

	/** Variables **/
	this.iLogTab = 7;
    this.iNumCuaGen = 6;
    this.iNumLineas = 3;
	this.aaTablero;
    this.iPuntosTotal = 0;
    this.iPuntosTotalIni = 0;
    this.iPuntosFila = 100;
    this.iCombo = 1;
    this.bCombo = false;
    this.bTerm = false;
    this.iNivel = 1;
    this.iLineasSubNivel = 25;
    this.iContLineas = 0;

    /** GETS **/
    this.getVacio = function(insCuadro) {
        var iPos = this.getNumCuadro(insCuadro); 
        var iCont = 0;
        var bVacio = false;
        for (var i = 0; i < this.iLogTab; i++) {
            for (var j = 0; j < this.iLogTab; j++) {
                iCont++;
                if(iPos == iCont) {
                    if(this.aaTablero[i][j] == 0) {
                        bVacio = true;
                    }
                    break;
                }
            }
        }
        return bVacio;
    }

    this.getTableroLleno = function() {
        var bVacio = true;
        for (var i = 0; i < this.iLogTab; i++) {
            for (var j = 0; j < this.iLogTab; j++) {
                if(this.aaTablero[i][j] == 0) {
                    bVacio = false;
                    break;
                }
            }
        }
        return bVacio;
    }

    this.getNumVacios = function() {
        var iCont = 0;
        for (var i = 0; i < this.iLogTab; i++) {
            for (var j = 0; j < this.iLogTab; j++) {
                if(this.aaTablero[i][j] == 0) {
                    iCont++;
                }
            }
        }
        return iCont;
    }

    this.getNumCuadro = function(insCuadro) {
        return insCuadro.slice(6, insCuadro.length);
    }

    this.getPosI = function(insCuadro) {
        var iPos = this.getNumCuadro(insCuadro); 
        var iCont = 0;
        var iReturn = 0;
        for (var i = 0; i < this.iLogTab; i++) {
            for (var j = 0; j < this.iLogTab; j++) {
                iCont++;
                if(iPos == iCont) {
                    iReturn = i;
                    break;
                }
            }
        }
        return iReturn;
    }

    this.getPosJ = function(insCuadro) {
        var iPos = this.getNumCuadro(insCuadro); 
        var iCont = 0;
        var iReturn = 0;
        for (var i = 0; i < this.iLogTab; i++) {
            for (var j = 0; j < this.iLogTab; j++) {
                iCont++;
                if(iPos == iCont) {
                    iReturn = j;
                    break;
                }
            }
        }
        return iReturn;
    }


    /** Metodos publicos **/

    /**
     * Metodo que empieza el juego
     */
    this.empezar = function() {
    	//Rellena la matriz del tablero
    	this.aaTablero = new Array();
        this.iPuntosTotal = this.iPuntosTotalIni;
        this.iNivel = 1;
        this.iContLineas = 0;
        this.bTerm = false;
    	for (var i = 0; i < this.iLogTab; i++) {
    		this.aaTablero[i] = new Array();
    		for (var j = 0; j < this.iLogTab; j++) {
    			this.aaTablero[i][j] = 0;
    		}
    	}
    	this.generarCuadros();
    }

    /**
     * Metodo que cambia la posicion de un cuadro
     * @param  {String} insIni 
     * @param  {String} insFin
     */
    this.cambiarPos = function(insIni, insFin) {
        this.aaTablero[this.getPosI(insFin)][this.getPosJ(insFin)] = this.aaTablero[this.getPosI(insIni)][this.getPosJ(insIni)];
        this.aaTablero[this.getPosI(insIni)][this.getPosJ(insIni)] = 0;
        this.generarCuadros();
        
    }

    /**
     * Metodo que genera nuevos cuadros
     */
    this.generarCuadros = function() {
        this.quitarLineas();
        var iColor = 0;
        var iCuadro = 0;
        var iI = 0;
        var iJ = 0;
        var bCont = false;
        var iNumCuaTem = this.iNumCuaGen * this.iNivel;
        var iNumCuaVac = this.getNumVacios();

        //Compueba el numero de cuadros que debe crear
        if(iNumCuaVac < iNumCuaTem) {
             iNumCuaTem = iNumCuaVac;
        }

        if(!this.bCombo && !this.bTerm) {
            //Genera nuevas lineas
            for (var i = 0; i < iNumCuaTem; i++) {
                bCont = true;
                iColor = Math.floor((Math.random() * 4) + 1);
                while(bCont) {
                    iCuadro = Math.floor((Math.random() * (this.iLogTab * this.iLogTab)) + 1);
                    iI = this.getPosI('cuadro' + iCuadro);
                    iJ = this.getPosJ('cuadro' + iCuadro);
                    if(this.aaTablero[iI][iJ] == 0) {
                        this.aaTablero[iI][iJ] = iColor;
                        bCont = false;
                    }
                }
            }
            //Quitar combo
            this.iCombo = 1;
        } else {
            this.iCombo++;
        }
        
        this.quitarLineas();
        
        //Termina el juego si esta lleno
        if(this.getTableroLleno()) {
            this.bTerm = true;
        }
    }

    /**
     * Metodo que gestiona la subida de nivel
     */
    this.gestionarSubidaNivel = function() {
        this.iContLineas++;
        this.iNivel = parseInt(this.iContLineas / this.iLineasSubNivel) + 1;

    }

    /**
     * Metodo que quita las filas que coinciden
     */
    this.quitarLineas = function() {
        var iContTem = 0;
        var iVarI = 0;
        var iVarJ = 0;
        var iCont1 = 0;
        var iCont2 = 0;
        var iCont3 = 0;
        var iCont4 = 0;
        var iTipoCont = 0;
        this.bCombo = false;
        /** Horizontales **/
        for(var i = 0; i < this.iLogTab; i++) {
            for(var j = 0; j < this.iLogTab; j++) {
                if((this.aaTablero[i][j] != iTipoCont || j == this.iLogTab) 
                    && (iCont1 >= this.iNumLineas || iCont2 >= this.iNumLineas 
                        || iCont3 >= this.iNumLineas || iCont4 >= this.iNumLineas)) {
                    //Contador de cuadros a borrar
                    iContTem = 0;
                    iTipoCont = this.aaTablero[i][j];
                    if(iCont1 >= this.iNumLineas) {
                        iContTem = iCont1;
                    } else if(iCont2 >= this.iNumLineas) {
                        iContTem = iCont2;
                    } else if(iCont3 >= this.iNumLineas) {
                        iContTem = iCont3;
                    } else if(iCont4 >= this.iNumLineas) {
                        iContTem = iCont4;
                    }
                    //Elimina de la matriz
                    iVarI = i;
                    iVarJ = j;
                    if(iVarJ == 0) {
                        iVarI = i - 1;
                        iVarJ = 7;
                    }
                    for(var k = (iVarJ - 1); k >= (iVarJ - iContTem); k--) {
                        this.aaTablero[iVarI][k] = 0;
                        this.bCombo = true;
                    }
                    iCont1 = 0;
                    iCont2 = 0;
                    iCont3 = 0;
                    iCont4 = 0;
                    //Aumenta puntos
                    this.iPuntosTotal += this.iPuntosFila * iContTem * this.iCombo;
                    //Gestiona nivel
                    this.gestionarSubidaNivel();
                }
                //Cuenta
                if(this.aaTablero[i][j] != 0) {
                    if(this.aaTablero[i][j] != iTipoCont) {
                        iTipoCont = this.aaTablero[i][j];
                        iCont1 = 0;
                        iCont2 = 0;
                        iCont3 = 0;
                        iCont4 = 0;
                    }
                    switch(this.aaTablero[i][j]) {
                        case 1:
                            iCont1++;
                            break;
                        case 2:
                            iCont2++;
                            break;
                        case 3:
                            iCont3++;
                            break;
                        case 4:
                            iCont4++;
                            break;
                    }
                } else {
                    //Restablece
                    iCont1 = 0;
                    iCont2 = 0;
                    iCont3 = 0;
                    iCont4 = 0;
                }
            }
        }
        //Quita esquina(bug)
        if(this.aaTablero[6][4] == this.aaTablero[6][5]
            && this.aaTablero[6][5] == this.aaTablero[6][6]
            && this.aaTablero[6][4] != 0) {
            this.aaTablero[6][6] = 0;
            this.aaTablero[6][5] = 0;
            this.aaTablero[6][4] = 0;
            //Aumenta puntos
            this.iPuntosTotal += this.iPuntosFila * 3 * this.iCombo;
            //Gestiona nivel
            this.gestionarSubidaNivel();
        } 
        /** Verticales **/
        iCont1 = 0;
        iCont2 = 0;
        iCont3 = 0;
        iCont4 = 0;
        iTipoCont = 0;
        for(var j = 0; j < this.iLogTab; j++) {
            for(var i = 0; i < this.iLogTab; i++) {
                //Borra
                if((this.aaTablero[i][j] != iTipoCont || i == this.iLogTab) 
                    && (iCont1 >= this.iNumLineas || iCont2 >= this.iNumLineas 
                        || iCont3 >= this.iNumLineas || iCont4 >= this.iNumLineas)) {
                    iContTem = 0;
                    iTipoCont = this.aaTablero[i][j];
                    if(iCont1 >= this.iNumLineas) {
                        iContTem = iCont1;
                    } else if(iCont2 >= this.iNumLineas) {
                        iContTem = iCont2;
                    } else if(iCont3 >= this.iNumLineas) {
                        iContTem = iCont3;
                    } else if(iCont4 >= this.iNumLineas) {
                        iContTem = iCont4;
                    }
                    iVarI = i;
                    iVarJ = j;
                    if(iVarI == 0) {
                        iVarI = 7;
                        iVarJ = j - 1;
                    }
                    if(iVarI > 2) {
                        for(var k = (iVarI - 1); k >= (iVarI - iContTem); k--) {
                            this.aaTablero[k][iVarJ] = 0;
                            this.bCombo = true;
                        }
                    }
                    iCont1 = 0;
                    iCont2 = 0;
                    iCont3 = 0;
                    iCont4 = 0;
                    //Aumenta puntos
                    this.iPuntosTotal += this.iPuntosFila * iContTem * this.iCombo;
                    //Gestiona nivel
                    this.gestionarSubidaNivel();
                }
                //Cuenta
                if(this.aaTablero[i][j] != 0 || (i == this.iLogTab - 1)) {
                    if(this.aaTablero[i][j] != iTipoCont) {
                        iTipoCont = this.aaTablero[i][j];
                        iCont1 = 0;
                        iCont2 = 0;
                        iCont3 = 0;
                        iCont4 = 0;
                    }
                    switch(this.aaTablero[i][j]) {
                        case 1:
                            iCont1++;
                            break;
                        case 2:
                            iCont2++;
                            break;
                        case 3:
                            iCont3++;
                            break;
                        case 4:
                            iCont4++;
                            break;
                    }
                } else {
                    //Restablece
                    iCont1 = 0;
                    iCont2 = 0;
                    iCont3 = 0;
                    iCont4 = 0;
                }
            }
        }
        //Quita esquina(bug)
        if(this.aaTablero[4][6] == this.aaTablero[5][6]
            && this.aaTablero[5][6] == this.aaTablero[6][6]
            && this.aaTablero[4][6] != 0) {
            this.aaTablero[4][6] = 0;
            this.aaTablero[5][6] = 0;
            this.aaTablero[6][6] = 0;
            //Aumenta puntos
            this.iPuntosTotal += this.iPuntosFila * 3 * this.iCombo;
            //Gestiona nivel
            this.gestionarSubidaNivel();
        }
    }
}
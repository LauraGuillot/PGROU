//Function at the end of the drag
function endDrag(tempSprite, pointer) {

    if ((game.input.y > 20) && (game.input.y < 96) && (game.input.x > 60) && (game.input.x < 143)) {
        if (tempSprite.key == 'square') {
            nbF1 = nbF1 - 1;
        }
        if (tempSprite.key == 'trapeze') {
            nbF2 = nbF2 - 1;
        }
        if (tempSprite.key == 'hexagon') {
            nbF3 = nbF3 - 1;
        }
        if (tempSprite.key == 'triangle_equi') {
            nbF4 = nbF4 - 1;
        }
        if (tempSprite.key === 'triangle_rect') {
            nbF5 = nbF5 - 1;
        }
        if (tempSprite.key === 'diamond') {
            nbF6 = nbF6 - 1;
        }
        tempSprite.destroy();
        trashBinSound();
    }

    for (var i = 0; i < 1200; i++) {
        for (var j = 0; j < 800; j++) {
            matSolution[i][j] = 0;
        }
    }
    
    for (var i = 0; i < 1200; i++) {
        for (var j = 0; j < 800; j++) {
            matSnap[i][j] = 0;
        }
    }

    
    // add the shapes from the pattern into the snap matrix, to get the global contours to which we want to snap
    P1.forEach(function(patternItem) {
        addShapeMatrix(patternItem,3);
    }, this);

    P2.forEach(function(patternItem) {
        addShapeMatrix(patternItem,3);
    }, this);

    P3.forEach(function(patternItem) {
        addShapeMatrix(patternItem,3);
    }, this);

    P4.forEach(function(patternItem) {
        addShapeMatrix(patternItem,3);
    }, this);

    P5.forEach(function(patternItem) {
        addShapeMatrix(patternItem,3);
    }, this);

    P6.forEach(function(patternItem) {
        addShapeMatrix(patternItem,3);
    }, this);
    
    // add the shapes already in the game (except the shape that has just been dragged)
    // in order to update the contours to which we want to snap
    F1.forEach(function(patternItem) {
    	if (patternItem.key != tempSprite.key && patternItem.x != tempSprite.x && patternItem.y != tempSprite.y) {
	        addShapeMatrix(patternItem,3);
        }
    }, this);

    F2.forEach(function(patternItem) {
    	if (patternItem.key != tempSprite.key && patternItem.x != tempSprite.x && patternItem.y != tempSprite.y) {
	        addShapeMatrix(patternItem,3);
        }
    }, this);

    F3.forEach(function(patternItem) {
    	if (patternItem.key != tempSprite.key && patternItem.x != tempSprite.x && patternItem.y != tempSprite.y) {
	        addShapeMatrix(patternItem,3);
        }
    }, this);

    F4.forEach(function(patternItem) {
    	if (patternItem.key != tempSprite.key && patternItem.x != tempSprite.x && patternItem.y != tempSprite.y) {
	        addShapeMatrix(patternItem,3);
        }
    }, this);

    F5.forEach(function(patternItem) {
    	if (patternItem.key != tempSprite.key && patternItem.x != tempSprite.x && patternItem.y != tempSprite.y) {
	        addShapeMatrix(patternItem,3);
        }
    }, this);

    F6.forEach(function(patternItem) {
    	if (patternItem.key != tempSprite.key && patternItem.x != tempSprite.x && patternItem.y != tempSprite.y) {
	        addShapeMatrix(patternItem,3);
        }
    }, this);
    
    // calculate the best position for tempSprite (snap effect)
    
    var criteria = 0;
    var criteriaTemp = 0;
    var range_i = 30; // must be an even number
    var range_j = 30; // must be an even number
    var i_init = tempSprite.y;
    var j_init = tempSprite.x;
    var i_opt = tempSprite.y; // to store the best position we have found for tempSprite
    var j_opt = tempSprite.x;
    
    for (var i=0; i<range_i; i++) {
    	for (var j=0; j<range_j; j++) {
    		criteriaTemp = calculateCommonContours(tempSprite, i_init + (i-range_i/2), j_init + (j-range_j/2));
    		if ((i==0) && (j==0)) { // 1st iteration
    			criteria = criteriaTemp;
    		}
    		if (criteriaTemp > criteria) {
    			criteria = criteriaTemp;
    			i_opt = i_init + (i-range_i/2);
    			j_opt = j_init + (j-range_j/2);
    		}
    	}
    }
    tempSprite.x = j_opt;
    tempSprite.y = i_opt; 
    
    // update matSolution
    areaSolution = 0;
    
    F1.forEach(function(patternItem) {
        areaSolution = areaSolution + shapes.square.area[patternItem.frame];
        addShapeMatrix(patternItem,2);
    }, this);

    F2.forEach(function(patternItem) {
        areaSolution = areaSolution + shapes.trapeze.area[patternItem.frame];
        addShapeMatrix(patternItem,2);
    }, this);

    F3.forEach(function(patternItem) {
        areaSolution = areaSolution + shapes.hexagon.area[patternItem.frame];
        addShapeMatrix(patternItem,2);
    }, this);

    F4.forEach(function(patternItem) {
        areaSolution = areaSolution + shapes.triangleEqui.area[patternItem.frame];
        addShapeMatrix(patternItem,2);
    }, this);

    F5.forEach(function(patternItem) {
        areaSolution = areaSolution + shapes.triangleRect.area[patternItem.frame];
        addShapeMatrix(patternItem,2);
    }, this);

    F6.forEach(function(patternItem) {
        areaSolution = areaSolution + shapes.diamond.area[patternItem.frame];
        addShapeMatrix(patternItem,2);
    }, this);


}

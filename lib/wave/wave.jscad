function wave(pars){
    var radius = pars.r;
    var thick = pars.th;
    var height = pars.h;
    var length = pars.l;
    
    var semi_count = length / radius + 1;
    
    semi = function(){
        return difference(
                cylinder({r:radius,h:height}).translate([0,-radius,0]),
                cylinder({r:radius-thick,h:height}).translate([0,-radius,0]),
                cube([radius *2 , radius * 2, height]).translate([0,-2*radius,0])
            );
    };
    
    var longline;
    let rot = 0
    for( i = radius*2-thick; i < length + radius*2; i+=radius*2-thick){

        var ss = semi();
        if(rot %2 == 1){
            ss = ss.rotateZ(180).translate([0,-radius*2,0]);
        }
        if(longline == null){
            longline = ss.translate([0,i+thick,0]);
        }else{
            longline = longline.union(ss.translate([0,i+thick,0]));
        }
        rot +=1;
    }
    return     difference( 
        longline.translate([radius,0,0])
        , cube([radius*2,length,height]).translate([0,length,0])
    );
  }

//--------------------------------

function getParameterDefinitions() {

    return [{
        name: 'r',
        type: 'float',
        initial: 3.0,
        caption: 'Radius:'
    }, {
        name: 'th',
        type: 'float',
        initial: 1,
        caption: 'Thickness'
    }, {
        name: 'h',
        type: 'float',
        initial: 10,
        caption: 'Height'
    }, {
        name: 'l',
        type: 'float',
        initial: 40,
        caption: 'Length'
    }];
}

function main(params) {
    // echo('params', JSON.stringify(params));

  
	
	return wave(params);
}

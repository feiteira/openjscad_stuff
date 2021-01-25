function fcylinder(h){
    var cy = cylinder(h);
    var angle = h.angle % 360;
    if(h.angle === undefined ||  angle % 360 == 0)
        return cy;
    var rad = h.r;
    if(h.r === undefined){
        rad = h.r1;
        if(h.r2 > h.r1)
            rad = h.r2;
    }

    var half = difference(
         cy,
         cube([rad*2,rad,h.h]).translate([-rad,0,0])
        );

    if(angle == 180)
        return half;
    if(angle> 180){
        return union(
            half,
            half.rotateZ(angle-180)
            );
    }//angle < 180
    else{
        return intersection(
            half,
            half.rotateZ(angle-180)
            );
    }
}

function xcube(val){
    var cvar = {
        r:val.size[1]/2,
        h:val.size[2]
    };
    var cyl = cylinder(cvar);
    return union(
        cube(val),
        cyl.translate([0,cvar.r,0]),
        cyl.translate([val.size[0],cvar.r,0])
    );
}

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

    var longline = semi();
    let rot = 0
    for( i = radius*2-thick; i < length + radius; i+=radius*2-thick){
        rot +=1;
        var ss = semi();
        if(rot %2 == 1){
            ss = ss.rotateZ(180).translate([0,-radius*2,0]);
        }
        longline = longline.union(ss.translate([0,i,0]));
    }
    return longline.translate([radius,0,0]);
//    return intersection( longline.translate([radius,0,0]),
 //       cube([radius*2,length,height]));
  }

function body2(){
    var side = difference(
        xcube({size:[45,6,10],center:false}).translate([0,-3,0]),
        cylinder({r:0.9,h:10}).translate([45,0,0])
        );
    let ang = 15;
    var ret = union(
        side.rotateZ(ang).translate([0,2,0]),
        side.rotateZ(-ang).translate([0,-2,0]),
        cylinder({h:10,r:5.4}).translate([1.5,0,0])
        );

    var w = wave({r:1.2,th:0.2,h:12,l:16}).rotateZ(90)
            .scale([1.0,0.5,1]).translate([6.4,-1,0]);
    return difference(
        ret,
        w.translate([1.6,0,0])
        //cylinder({r:1.2,h:10}).translate([-2,0,0])
        );
}

function barrel(){
    var _r = 3;
    var _r1 = 2.5;
    var _r2 = _r;

    return union(
        cylinder({r1:_r1,r2:_r2,h:2}),
        cylinder({r:_r,h:6}).translate([0,0,2]),
        cylinder({r1:_r2,r2:_r1,h:2}).translate([0,0,8])
        ).translate([22,0,0]);
}
function barrel_shape(){
    var margin = 0.1;
   var _r = 3+margin;
    var _r1 = 2.5+margin;
    var _r2 = _r;

    var out = union(
        cylinder({r1:_r1,r2:_r2,h:2}),
        cylinder({r:_r,h:6}).translate([0,0,2]),
        cylinder({r1:_r2,r2:_r1,h:2}).translate([0,0,8])
        ).translate([22,0,0]);
    return difference(
        out, barrel()
        );
}

function inner_part(){
    var b = union(
        barrel(),
        cube([3,7,10]).translate([20.5,0,0])
        );

//    var o = fcylinder({r:4.5,h:10,angle:268}).rotateZ(-53.5).translate([22,0,0]);
    var o = cylinder({r:4.5,h:10}).translate([22,0,0]);
    o = difference(
        o,
        cube([10,3,10]).translate([20.3,2,0])
        );
    var c = cube([9,8,10]).translate([22-4.5,-8,0]);

    var holder = difference(
        union(o,c), barrel_shape()
        );

    return union(b,holder);
}

TEST = 0;

function main(){
    if(TEST == false){
        return union(
            body2(),inner_part()
            );
    }else{
        return union(
                body(),body2().translate([0,30,0]),
                wave({r:5,th:1,h:10,l:23}).translate([0,-30,0])
                );
    }
}

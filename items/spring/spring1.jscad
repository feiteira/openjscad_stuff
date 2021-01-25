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

function body(){
    var c = cube({size:[40,30,10]}).translate([0,-15,0]);
    var c2 = cube({size:[100,30,10]}).translate([0,-15,0]);

    var body_shape= difference(
        c,
        c2.rotateZ(18).translate([-44,4,0]),
        c2.rotateZ(-18).translate([-44,-4,0])
        );
    var divider = cube([100,0.2,10]).translate([0,-0.1,0]);

    var hole = cylinder({r:0.8,h:10});

    var decor = union(
        cylinder({r:1,h:10}),//pretty hole shapre at the tip
        cylinder({r:2,h:10}).translate([16,0,0]),
        cylinder({r:1.4,h:10}).scale([4,0.8,1]).rotateZ(15).translate([9,3,0]),
        cylinder({r:1.4,h:10}).scale([4,0.8,1]).rotateZ(-15).translate([9,-3,0])
        );

    return difference(
        body_shape,
        body_shape.translate([16,0,0]),
        divider,
        decor,
        hole.translate([40-3,15-3,0]),
        hole.translate([40-3,-15+3,0])
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

    var o = fcylinder({r:4.5,h:10,angle:268}).rotateZ(-53.5).translate([22,0,0]);
    o = difference(
        o,cube([10,3,10]).translate([23,2,0])
        );
    var c = cube([9,8,10]).translate([22-4.5,-8,0]);

    var holder = difference(
        union(o,c), barrel_shape()
        );

    return union(b,holder);
}

function main(){
    return union(
        body(),inner_part()
        );
}

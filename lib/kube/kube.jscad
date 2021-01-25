function kube(vals){
    var c = cube(vals);//.setColor(0.5, 0.5, 1.0);
    var x = vals.size[0];
    var y = vals.size[1];
    var z = vals.size[2];
    var cut = vals.cut;

    var cat = Math.sqrt( cut * cut /2 )//cateto dat hipotenusa

    var bottom = union(
        cube([x,cut,cut]).rotateX(45).translate([0,0,-cat]),
        cube([cut,y,cut]).rotateY(-45).translate([0,0,-cat]),
        cube([x,cut,cut]).rotateX(45).translate([0,y,-cat]),
        cube([cut,y,cut]).rotateY(-45).translate([x,0,-cat])
        );
    var top = bottom.translate([0,0,z])

    var sides = union(
        cube([cut,cut,z]).rotateZ(45).translate([0,-cat,0]),
        cube([cut,cut,z]).rotateZ(45).translate([x,-cat,0]),
        cube([cut,cut,z]).rotateZ(45).translate([0,y-cat,0]),
        cube([cut,cut,z]).rotateZ(45).translate([x,y-cat,0])
        );

    var outer = union(top,bottom,sides);

    var out =difference(c,outer);
   return out;
}
///----------------

function getParameterDefinitions() {

    return [{
        name: 'x',
        type: 'float',
        initial: 20,
        caption: 'X width:'
    }, {
        name: 'y',
        type: 'float',
        initial: 30,
        caption: 'Y Length'
    }, {
        name: 'z',
        type: 'float',
        initial: 10,
        caption: 'Z Length'
    }, {
        name: 'cut',
        type: 'float',
        initial: 1,
        step: 0.25,
        caption: 'Hypotenuse'
    }];
}



function main(params){
    return kube({
        size:[params.x,params.y,params.z],
        cut:params.cut
    }
        );
}

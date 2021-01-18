function lomba(v){
    if (typeof v.fn !== 'undefined') {
        step_count = v.fn;
    }else{
        step_count = 32;
    }

    let shape_formula = function(step){return 1-Math.cos(Math.PI * step / step_count);}
    let shape = function(xx,yy,zz1,zz2){
        let atanval = (zz2-zz1)/yy;
        let atan = Math.atan(atanval);
        atan = atan / Math.PI * 180;

        return difference(
           cube({size:[xx,yy,zz2]}),
           cube({size:[xx,yy*2,zz2-zz1]}).rotateX(atan).translate([0,0,zz1])
         );
    }

    let ret = [];
    for(let i = 0; i < step_count; i++){
        let height1 = v.z1 + (v.z2-v.z1)*shape_formula(i);
        let height2 = v.z1 + (v.z2-v.z1)*shape_formula(i+1);

        let part = shape(v.x,v.y/step_count,height1,height2)
                    .translate([0,i*v.y/step_count,0]);

        ret.push(part);
    }
    return union(ret);
}

//--------------------------------

function getParameterDefinitions() {

  return [{
      name: 'x',
      type: 'float',
      initial: 20.0,
      caption: 'X length'
  }, {
      name: 'y',
      type: 'float',
      initial: 50,
      caption: 'Y length'
  }, {
      name: 'z1',
      type: 'float',
      initial: 10,
      caption: 'Height (1)'
    }, {
        name: 'z2',
        type: 'float',
        initial: 20,
        caption: 'Height (2)'
  }, {
    name: 'fn',
      type: 'choice',
      values: [4, 8, 16, 32, 64],
      captions: ['very low', 'low', 'normal', 'high', 'very high'],
      initial: 16,
      caption: 'Resolution:'
  }];
}

function main (params) {
  return lomba({
      x:params.x,
      y:params.y,
      z1:params.z1,
      z2:params.z2,
      fn:params.fn});
}

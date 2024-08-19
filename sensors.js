class Sensors {
  constructor(car) {
    this.car = car;
    this.raycount = 6;
    this.raylength = 150
    ;
    this.rayspan = Math.PI/2 ;
    this.rays = [];
    this.readings = [];

  }

  update(borders,traffic) {
    this.spreadRays();
    this.readings=[];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.takeReading(this.rays[i], borders, traffic));

  }

}

 takeReading(ray, borders,traffic) {
  let touches = [];
   for (let i = 0 ; i < borders.length; i++){
    const touch = getTheCrossing(ray[0],ray[1],borders[i][0],borders[i][1]);
    if(touch){
      touches.push(touch);
    }
}

for (let i = 0 ; i < traffic.length; i++){
  const corner = traffic[i].corners;
  for (let j = 0 ; j < corner.length; j++){
    const ret = getTheCrossing(ray[0],ray[1],corner[j],corner[(j+1)%corner.length]);
    if(ret){
      touches.push(ret);
    }
  }

}

if(touches.length==0){
  return null;
}
else{
  let distance = touches.map(x=>x.offset);
  let closet = Math.min(...distance);

  return touches.find(x=>x.offset==closet);

}
}
spreadRays(){
  this.rays=[];
  for(let i=0;i<this.raycount;i++){
      const rayAngle=lerpf(
          this.rayspan/2,
          -this.rayspan/2,
          this.raycount==1?0.5:i/(this.raycount-1)
      )+this.car.angle;

      const start={x:this.car.x, y:this.car.y};
      const end={
          x:this.car.x-
              Math.sin(rayAngle)*this.raylength,
          y:this.car.y-
              Math.cos(rayAngle)*this.raylength
      };
      this.rays.push([start,end]);
  }
}

    draw(ctx) {
      for (let i = 0; i < this.raycount; i++) {
        let end = this.rays[i][1];
        if(this.readings[i]){
          end = this.readings[i];

        }
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "yellow";
        ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
        ctx.lineTo(end.x,end.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
        ctx.lineTo(end.x,end.y);
        ctx.stroke();
      };
    }
  }


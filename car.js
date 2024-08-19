class Car{
    constructor(x,y,width,height,controlType,maxSpeed = 3,color="black"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.accelaration=0.2;
        this.friction=0.05;
        this.color = color;
        this.angle = 0; 
        this.maxSpeed = maxSpeed;
        this.isDamaged = false;
        this.userBrain = controlType=="MAIN";
        if(controlType=="MAIN"){
        this.sensor = new Sensors(this);
        this.brain = new Network([this.sensor.raycount,6,4]);

    }
        this.controls = new Controls(controlType);
    }
 
    update(borders,traffic){
        if(!this.isDamaged){
       this.#move();
       this.corners = this.carCornerCoordinates();
       this.isDamaged = this.checkDamage(borders,traffic);


        }
        if(this.sensor){
        this.sensor.update(borders,traffic);
        // console.log(this.sensor.readings);
        const distances = this.sensor.readings.map(x=>x==null?0:1-x.offset);
        console.log(distances);
        console.log(this.brain);
        let moves = Network.feedforward(distances,this.brain);
        // console.log(distances);

        if(this.userBrain){
        this.controls.forward = moves[0]>0.5;
        this.controls.reverse = moves[1]>0.5;
        this.controls.left = moves[2]>0.5;
        this.controls.right = moves[3]>0.5;
        }

    }
    }

    checkDamage(borders,traffic){

        for(let i = 0;i < borders.length;i++){

            if(cornerIntersect(this.corners,borders[i])){
                return true;
            }
        }
        for(let i = 0;i < traffic.length;i++){

            if(cornerIntersect(this.corners,traffic[i].corners)){
                return true;
            }
        }
        return false;

    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.accelaration;
        }
        if(this.controls.reverse){
            this.speed-=this.accelaration;
        }
        
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(this.speed!=0){
            const flip = this.speed>0?1:-1;
        
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }}
        if(Math.abs(this.speed)<0.05){
            this.speed=0;
        }
        this.x-=this.speed*Math.sin(this.angle);
        this.y-=this.speed*Math.cos(this.angle);
    }


    carCornerCoordinates(){
        let corners = [];

        const rad = Math.hypot(this.width,this.height)/2;
        const alpha = Math.atan2(this.width,this.height);

        corners.push({
            x:this.x-rad*Math.sin(this.angle-alpha),
            y:this.y-rad*Math.cos(this.angle-alpha)
        });
        corners.push({
            x:this.x-rad*Math.sin(this.angle+alpha),
            y:this.y-rad*Math.cos(this.angle+alpha)
        });
        corners.push({
            x:this.x-rad*Math.sin(Math.PI+this.angle-alpha),
            y:this.y-rad*Math.cos(Math.PI+this.angle-alpha)
        });
        corners.push({
            x:this.x-rad*Math.sin(Math.PI+this.angle+alpha),
            y:this.y-rad*Math.cos(Math.PI+this.angle+alpha)
        });
        return corners;
    }


    draw(ctx,sensor=false){
        ctx.beginPath();
        ctx.fillStyle = this.isDamaged?"grey":this.color;
        ctx.moveTo(this.corners[0].x,this.corners[0].y);
        for (let i=1;i<this.corners.length;i++){
            ctx.lineTo(this.corners[i].x,this.corners[i].y);
        }
        ctx.fill();
        // ctx.save();
        // ctx.translate(this.x,this.y);
        // ctx.rotate(-this.angle);
        // ctx.beginPath();

        // ctx.rect(
        //     -this.width/2,
        //     -this.height/2,
        //     this.width,
        //     this.height
        // );
        // ctx.fill();
        // ctx.restore();
        if(this.sensor&&sensor){
        this.sensor.draw(ctx);}


    }
}
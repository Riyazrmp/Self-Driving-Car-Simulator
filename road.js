class Road{
    constructor(x,width,lanecount=3){
        this.x = x;
        this.width = width;
        this.lanecount = lanecount;
        this.left = this.x-this.width/2;
        this.right = this.x+this.width/2;
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
        this.topLeft = {x:this.left,y:this.top};
        this.topRight = {x:this.right,y:this.top};
        this.bottomLeft = {x:this.left,y:this.bottom};
        this.bottomRight = {x:this.right,y:this.bottom};

        this.borders = [[this.topRight,this.bottomRight],[this.topLeft,this.bottomLeft]];


    }
 
    getLaneCenter(lane){
        const laneWidth = this.width/this.lanecount;
        return this.left + laneWidth/2 + laneWidth*Math.min(lane,this.lanecount-1);
        
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 1; i<=this.lanecount-1; i++){
            const x = lerpf(this.left,this.right,i/this.lanecount);
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
    }
    
    this.borders.forEach(border=>{
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(border[0].x,border[0].y);
    ctx.lineTo(border[1].x,border[1].y);
    ctx.stroke();
});


}}


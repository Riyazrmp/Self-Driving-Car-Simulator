const carCanvas=document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width = 300;

const road = new Road(carCanvas.width/2,carCanvas.width*.93);


const carCtx =  carCanvas.getContext("2d");
const networkCtx =  networkCanvas.getContext("2d");



let cars = generateMainCars();
let bestCar = cars[0];

if(localStorage.getItem("topCar")){ 
    bestCar.brain = JSON.parse(localStorage.getItem("topCar"));
    for(let i = 0; i <cars.length;i++){
        cars[i].brain = JSON.parse(localStorage.getItem("topCar"));
        if(i>0){
           Network.evolve(cars[i].brain,0.17);
        }
        
    }
    // console.log(bestCar.brain);
}

let traffic = [

    new Car(road.getLaneCenter(1),-200,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-300,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-400,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-600,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-700,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-800,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-1000,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-1200,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-1300,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-1400,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-1500,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-1600,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-1700,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-1800,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-1900,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-2000,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-2100,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-2200,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-2500,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-2400,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-2500,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-2600,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-2700,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-2800,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-2900,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-3000,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-3100,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-3200,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-3300,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-3400,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-3500,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-3600,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-3700,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-3800,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-3900,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-4000,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-4100,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-4200,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-4300,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-4400,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(1),-4500,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(2),-4600,30,50,"TRAFFIC",4,"red"),
    new Car(road.getLaneCenter(0),-4700,30,50,"TRAFFIC",4,"red"),


];

animate();
function generateMainCars(){
    let cars = [];
    for(let i = 0;i<200;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"MAIN",7));
    }
    return cars;
}
function saveTopCar(){  
    console.log("saved");
    localStorage.setItem("topCar",JSON.stringify(bestCar.brain)) ;
}
function destroyTopCar(){   
    localStorage.removeItem("topCar");
}
function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
        
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
     bestCar = cars.find(car=> car.y==Math.min(...cars.map(car=>car.y)));

    // car.update(road.borders,traffic);
   
    carCanvas.height = window.innerHeight;

    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y + carCanvas.height*(2/3));

    road.draw(carCtx);
    carCtx.globalAlpha = 0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx,true);
    
  for (let i = 0; i < traffic.length; i++){
      traffic[i].draw(carCtx);
    }
carCtx.restore();
   networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);

    requestAnimationFrame(animate);
}

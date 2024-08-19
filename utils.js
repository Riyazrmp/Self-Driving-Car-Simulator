function lerpf(a,b,t){
    return a + (b-a)*t;
}


function getTheCrossing(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerpf(A.x,B.x,t),
                y:lerpf(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function cornerIntersect(corners,border,traffic){

    for(let i=0;i<corners.length;i++){

        let next = (i+1)%corners.length;
        for(let j= 0; j<border.length;j++){
            let nextBorder = (j+1)%border.length;
            if(getTheCrossing(corners[i],corners[next],border[j],border[nextBorder])){
                return true;
            }
        }
        }
        return false;

    }

   function sigmoid(z) {
        return 1 / (1 + Math.exp(-z));
      }
      function getRGBA(value){
        const alpha=Math.abs(value);
        const R=value<0?0:255;
        const G=R;
        const B=value>0?0:255;
        return "rgba("+R+","+G+","+B+","+alpha+")";
    }
      

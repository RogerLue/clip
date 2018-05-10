
class Rectangle extends Shape{
    constructor(){
        super();
        this.coords = [[10,10],[110,10],[110,110],[10,110]];
        this.w = 5;
        this.controlPoints = this._calControlPoint();

    }

    move(control,obj){
        console.log(control);
        let type = control.type,
            index = control.index;
        if('move' === type){
            this.redraw(obj);
        }else if('drag' === type){
            this.drag(obj,index);
        }

    }

    redraw(obj){
        let c = this.coords,
            x = obj._x,y = obj._y;
        for(let i = 0, len = c.length; i < len; i++){
            c[i][0] += x;
            c[i][1] += y;
            console.log(this.coords);
        }


        let cps = this.controlPoints;
        cps.forEach((cp)=>{
            cp.coords.forEach((c)=>{
                c[0] += x;
                c[1] += y;
            })
        });
        // this.draw();
    }

    drag(obj,index){
        let x = obj._x,y = obj._y;
        if(index % 2 === 0){
            let i = index/2,
                cp = this.coords[i-1<0?3:i-1],
                c = this.coords[i],
                cn = this.coords[i+1>3?0:i+1];
            if(i%2 == 0){
                cp[0] += x;
                c[0] += x;
                c[1] += y;
                cn[1] += y;
            }else{
                cp[1] += y;
                c[0] += x;
                c[1] += y;
                cn[0] += x;
            }
        }else{
            let i = Math.round(index/2),
                cp = this.coords[i-1],
                cn = this.coords[i>3?0:i];
            if(i%2 == 0){
                cp[0] += x;
                cn[0] += x;
            }else{
                cp[1] += y;
                cn[1] += y;
            }

        }

        this.controlPoints = this._calControlPoint();
    }

    _calControlPoint(){
        let c = this.coords,
            cp = [],
            type='drag',
            w = this.w,
            p1,p2,n1,n2,m1,m2,ni;

        for(let i = 0, len = c.length; i < len; i++){
            p1 = c[i][0];
            p2 = c[i][1];
            ni = i+1>=len ? 0 : i+1;
            n1 = c[ni][0];
            n2 = c[ni][1];
            m1 = p1 === n1 ? p1 : (p1+n1)/2;
            m2 = p2 === n2 ? p2 : (p2+n2)/2;
            cp.push({
                index: 2*i,
                coords:[
                  [p1-w,p2-w],[p1+w,p2-w],[p1+w,p2+w],[p1-w,p2+w]
                ],
                type: type,
            },
            {
                index:2*i+1,
                coords:[
                    [m1-w,m2-w],[m1+w,m2-w],[m1+w,m2+w],[m1-w,m2+w]
                ],
                type: type,
            }
            )
        }
        return cp;
    }

}
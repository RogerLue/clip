
class Rectangle extends Shape{
    constructor(){
        super();
        this.coords = [[10,10],[110,10],[110,110],[10,110]];
        this.controlPoints = [
            {
                index: 0,
                coords: [[105,105],[115,105],[115,115],[105,115]],
                type: 'drag',
            },
            {
                index: 1,
                coords: [[105,5],[115,5],[115,15],[105,15]],
                type: 'drag',
            },
            {
                index: 2,
                coords: [[45,45],[55,45],[55,55],[45,55]],
                type: 'move',
            }
        ];


    }

    move(control,obj){
        console.log(control);
        let type = control.type;
        if('move' === type){
            this.redraw(obj);
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

}
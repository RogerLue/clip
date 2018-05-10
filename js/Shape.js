class Shape{

    constructor(){
        this.ctx = undefined;
        this.coords = [];
        this.controlPoints = [];
        this.strokeStyle = 'rgb(250,55,50)';
        this.fillStyle = 'rgba(250,255,255,0.3)';
    }

    setCtx(ctx){
        this.ctx = ctx;
    }

    getControlPoints(){
        return this.controlPoints;
    }

    draw(){
        let c = this.coords,
            ctx = this.ctx;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        for(let i = 0, len = c.length; i < len; i++){
            ctx.lineTo(c[i][0],c[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        this.drawControl();
    }

    drawControl(){
        let cps = this.controlPoints,
            ctx = this.ctx;
        console.log(cps);
        cps.forEach((cp)=>{
            ctx.strokeStyle = this.strokeStyle;
            ctx.fillStyle = this.fillStyle;
            ctx.beginPath();
            let c = cp.coords;
            for(let i = 0, len = c.length; i < len; i++){
                ctx.lineTo(c[i][0],c[i][1]);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });
    }

    move(control){

    }

    /**
     * {
     *      x0: '',y0: '',x1: '',y1: ''
     * }
     * @param obj
     */
    redraw(obj){

    }


}
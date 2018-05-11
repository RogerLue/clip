class Shape{

    constructor(){
        this.ctx = undefined;
        this.coords = [];
        this.controlPoints = [];
        this.strokeStyle = 'rgb(250,55,50)';
        this.fillStyle = 'rgba(250,255,255,0.3)';
        this.lineDash = [];
        this.clip = undefined;
    }

    setCtx(ctx){
        this.ctx = ctx;
    }

    getControlPoints(){
        return this.controlPoints;
    }
    getCoords(){
        return this.coords;
    }
    draw(){
        let c = this.coords,
            ctx = this.ctx;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.save();
        if(this.lineDash.length === 2){
            ctx.setLineDash(this.lineDash);
        }
        ctx.beginPath();
        for(let i = 0, len = c.length; i < len; i++){
            ctx.lineTo(c[i][0],c[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    drawControl(){
        let cps = this.controlPoints,
            ctx = this.ctx;
        cps.forEach((cp)=>{
            ctx.strokeStyle = this.strokeStyle;
            ctx.fillStyle = this.fillStyle;
            ctx.restore();
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
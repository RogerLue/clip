
class Clip{

    constructor(params){
        this.params = params;
        this.img = new Image();
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        this.mox = 0;//图片左上角x坐标
        this.moy = 0;//图片左上角y坐标

        this.cw = this.canvas.clientWidth;//画布宽度
        this.ch = this.canvas.clientHeight;//画布高度

        this.mx = 0;//鼠标在canvas的x坐标
        this.my = 0;//鼠标在canvas的y坐标

        this.pmx = 0;//鼠标在canvas的前一x坐标
        this.pmy = 0;//鼠标在canvas的前一y坐标

        this.shape = undefined;

        this.currentControl = undefined;

        this.event = {
            move : undefined,
        };

        this.clipMark = true;

        this._loadImage();
        this._event();
    }


    /**
     * 鼠标事件
    * @private
     */
    _event(){
        let t = this;
        let m = false;
        this.canvas.onmousedown = function(e1){
            let e11 = e1 || event;
            t.mx = e11.clientX - this.offsetLeft;
            t.my = e11.clientY - this.offsetTop;

            t.pmx = t.mx;
            t.pmy = t.my;
            t.currentControl = t._getCurrentControlPoint(t.mx, t.my);

        };
        this.canvas.addEventListener('mousemove',move);
        function move(e2){
            if(!t.clipMark){
                return;
            }
            t.moveoverControl = t._getCurrentControlPoint(t.mx, t.my);
            if(t.moveoverControl){
                t.canvas.style.cursor = t.moveoverControl.cursor;
            }else{
                t.canvas.style.cursor = 'default';
            }
            let e22 = e2 || event;
            t.mx = e22.clientX - t.canvas.offsetLeft;
            t.my = e22.clientY - t.canvas.offsetTop;
            // t._moveImage(t.mx - t.pmx,t.my - t.pmy );

            t.ctx.clearRect(0,0,t.cw,t.ch);
            t._moveImage(0,0);

            if(t.event.move instanceof Function){
                t.event.move(t.currentControl);
            }
            if(t.shape.move instanceof Function && t.currentControl){
                t.shape.move.call(t.shape,t.currentControl,{
                    x0: t.pmx,
                    y0: t.pmy,
                    x1: t.mx,
                    x2: t.my,
                    _x: t.mx - t.pmx,
                    _y: t.my - t.pmy,
                });
            }
            t._draw();
            t.pmx = t.mx;
            t.pmy = t.my;
            // console.log(t.mx,t.my);
        }
        this.canvas.onmouseup = function(){
            // t.canvas.removeEventListener('mousemove',move);
            t.currentControl = undefined;
        }

    }

    /**
     * 加载图片
     * @private
     */
    _loadImage(){
        let t = this;
        this.img.onload = function(){
            t.ctx.drawImage(this,t.mox,t.moy);
            //添加裁剪图形
            t.shape && t.shape.draw();
        };
        this.img.src = this.params.imgURL;
    }

    /**
     * 移动图片
     * @param x
     * @param y
     * @private
     */
    _moveImage(x,y){
        this.mox += x;
        this.moy += y;
        this.ctx.drawImage(this.img,this.mox,this.moy);
    }


    setShape(shape){
        shape.setCtx(this.ctx);
        this.shape = shape;
    }

    listen(type,callback){
        this.event[type] = callback;
    }

    _redrawShape(obj){
        this.shape && this.shape.redraw(obj);
    }

    _getCurrentControlPoint(x,y){
        let cps = this.shape.getControlPoints(),
        tempCp = undefined;
        cps.forEach((cp)=>{
            let cpcoords = cp.coords;
            let i,polySides =cpcoords.length, j = polySides - 1,
                oddNodes = false;
            let polyX,polyY,polyXj,polyYj;
            for (i = 0;i < polySides; i++) {
                polyX = cpcoords[i][0];
                polyY = cpcoords[i][1];
                polyXj = cpcoords[j][0];
                polyYj = cpcoords[j][1];
                if((polyY< y && polyYj>=y || polyYj<y && polyY>=y) && (polyX<=x || polyXj<=x)) {
                    oddNodes ^= (polyX+(y-polyY)/(polyYj-polyY)*(polyXj-polyX)<x);
                }
                j=i;
            }
            if(oddNodes){
                if(!tempCp){
                    tempCp = cp;
                }
                if(tempCp.index <= cp.index){
                    tempCp = cp;
                }
            }
        });
        return tempCp;
    }
    _draw(){
        this.shape.draw();
        this.shape.drawControl();
    }
    reClip(){
        if(this.clipMark){
            return;
        }
        this.clipMark = true;
        this.ctx.restore();
        this.ctx.drawImage(this.img,0,0);
        this._draw();
    }

    save(){
        if(!this.clipMark){
            return this.clipImage;
        }
        this.clipMark = false;
        this.ctx.clearRect(0,0,this.cw,this.ch);
        this.ctx.save();
        let coords = this._clipDraw();
        this.ctx.clip();
        this.ctx.drawImage(this.img,0,0);

        //求最大外接矩形
        //....
        //
        let w = coords[1][0] - coords[0][0],h = coords[3][1] - coords[0][1];
        let im = this.ctx.getImageData(coords[0][0],coords[0][1],w,h);

        let canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        let context = canvas.getContext('2d');
        // document.body.appendChild(canvas)
        context.putImageData(im,0,0,0,0,w,h);
        this.clipImage = canvas.toDataURL("image/png");
        return this.clipImage;

    }
    _clipDraw(){
        let c = this.shape.getCoords(),
            ctx = this.ctx;
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.beginPath();
        for(let i = 0, len = c.length; i < len; i++){
            ctx.lineTo(c[i][0],c[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
        return c;
    }
}

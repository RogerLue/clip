
class Clip{

    constructor(){
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

        this._loadImage();
        this._event();
    }




    _event(){
        let t = this;
        let m = false;
        this.canvas.onmousedown = function(e1){
            let e11 = e1 || event;
            t.mx = e11.clientX - this.offsetLeft;
            t.my = e11.clientY - this.offsetTop;

            t.pmx = t.mx;
            t.pmy = t.my;
            console.log(t.mx,t.my)
            this.addEventListener('mousemove',move);
        };
        function move(e2){
            let e22 = e2 || event;
            t.mx = e22.clientX - t.canvas.offsetLeft;
            t.my = e22.clientY - t.canvas.offsetTop;
            console.log(t.mx - t.pmx,t.my - t.pmy)
            t._moveImage(t.mx - t.pmx,t.my - t.pmy );
            t.pmx = t.mx;
            t.pmy = t.my;
            // console.log(t.mx,t.my);
        }
        this.canvas.onmouseup = function(){
            // console.log(11);
            t.canvas.removeEventListener('mousemove',move);
        }

    }

    _loadImage(){
        let t = this;
        this.img.onload = function(){
            t.ctx.drawImage(this,t.mox,t.moy);
        };
        this.img.src = 'girl.jpg';
    }

    _moveImage(x,y){
        this.ctx.clearRect(0,0,this.cw,this.ch);
        this.mox += x;
        this.moy += y;
        this.ctx.drawImage(this.img,this.mox,this.moy);

    }
}

let clip = new Clip();
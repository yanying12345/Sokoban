function Game(){
    //画布现在也是实例
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    //读图
    this.R = {      
        "b0":"b0.png",
        "b1":"b1.png",
        "b2":"b2.png",
        "b3":"b3.png",
        "tile":"tile.png",
        "Player":"Player.png"
    }
    //图片的数量
    var pic = Object.keys(this.R).length;
    var picCount = 0
    //实例化玩家类
    this.Player = new Player(this);
    //实例化地图
    this.Map = new Map(this);
   var self = this;
    //游戏资源加载
    for(var k in this.R){
       (function(k){
           picCount++;
           var img = new Image();
           img.src="images/"+self.R[k];
           img.onload = function(){
               self.R[k] = img;
               if(picCount == pic){
                   //开始游戏
                   self.start();
                   //绑定监听
                   self.bind();
               }
           }
       })(k)
    }
    //开始游戏的方法  
    Game.prototype.start = function(){
       var self = this;
       //打印帧编号
       this.f = 0;
       setInterval(function(){
           self.ctx.clearRect(0,0,320,320);
           //帧编号加加
           self.f++;
           self.ctx.fillStyle = "white";
           self.ctx.fillText(self.f,10,20);
           //更新玩家类
           self.Player.update();
           self.Player.render();

           //更新地图类
           self.Map.update();
           self.Map.render();
       },20)
    }
}
//绑定键盘监听
Game.prototype.bind = function(){
    //备份this
    var self = this;
    document.onkeydown = function(e){
        ///坦克车方向 0 是下 1左 2右 3上
        if(e.keyCode == 37){
           self.Player.changeDirection(1);
           self.Player.ismoving = true;
        }
        if(e.keyCode == 38){
           self.Player.changeDirection(3);
           self.Player.ismoving = true;
        }
        if(e.keyCode == 39){
           self.Player.changeDirection(2)
           self.Player.ismoving = true;
        }
        if(e.keyCode == 40){
          self.Player.changeDirection(0);
          self.Player.ismoving = true;
        }
    }
    //键盘抬起
    document.onkeyup = function(e){
        if(e.keyCode == 37 ||e.keyCode == 38||e.keyCode == 39 ||e.keyCode ==40){
            self.Player.ismoving = false;
        }
    }
}
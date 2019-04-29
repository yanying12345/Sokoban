  //在游戏类里面实例
function Player(game){
   this.game = game;
   //人物的 行和列 初始值 四个格
   this.col = 7;
   this.row = 10;
   //自己的位置
   this.x = this.col*16;
   this.y = this.row*16;
   //方向 0 是下 1左 2右 3上
   this.state = 0;  
   // 跳一个格子
   this.speed = 16;
   //是否在运动
   this.ismoving = false;
}
//更新
Player.prototype.update = function(){
    //人物的状态机
    if(this.ismoving){
        //下
        if(this.state == 0){
            if(this.y + 32 == this.game.xiangzi.y && this.x == this.game.xiangzi.x){
                if(this.game.xiangzi.y+32<320-32){
                this.game.xiangzi.y += 16;
                this.y += this.speed;
                //改变row
                this.row = parseInt(this.y/16);
                }
            }else{
                this.y += this.speed;
                //改变row
                this.row = parseInt(this.y/16);
            }
            //左
        }else if(this.state == 1){
            if(!(this.x < 32)){
                if(this.x == this.game.xiangzi.x + 32 && this.y == this.game.xiangzi.y){
                    if(this.game.xiangzi.x>32){
                        this.game.xiangzi.x -= 16;
                        this.x -= this.speed;
                        this.col = parseInt(this.x/16)
                    }
                }else{
                    this.x -= this.speed;
                    this.col = parseInt(this.x/16)
                }
               
            }
            //右
        }else if(this.state==2){
            if(!(this.x > 320-64)){
                if(this.x + 32 == this.game.xiangzi.x && this.y == this.game.xiangzi.y){
                    if(this.game.xiangzi.x+32<320-32){
                    this.game.xiangzi.x += 16;
                    this.x += this.speed;
                    this.col = parseInt(this.x/16)
                    }
                }else{
                    this.x += this.speed;
                    this.col = parseInt(this.x/16)
                }
            }
            //上
        }else if(this.state == 3){
            if(!(this.y < 32)){
                if(this.y == this.game.xiangzi.y + 32 && this.x == this.game.xiangzi.x){
                    if(this.game.xiangzi.y>32){
                    this.game.xiangzi.y -= 16;
                    this.y -= this.speed;
                    this.col = parseInt(this.y/16)
                    }
                }else{
                    this.y -= this.speed;
                    this.col = parseInt(this.y/16)
                }
            }
        }
        if(this.game.xiangzi.x == 320-64 && this.game.xiangzi.y == 32){
            setTimeout(function(){
                alert("你赢了");
                window.location.reload();
            },100)
        }
        this.ismoving = false; 
    }
}
// 改变方向
Player.prototype.changeDirection = function(n){
    // 每当改方向的时候，都要做16倍数的拉动。
    this.x = Math.round(this.x / 16) * 16;
    this.y = Math.round(this.y / 16) * 16;
    // 同时改一下col
    this.row = parseInt(this.y / 16);
    this.col = parseInt(this.x / 16);
    this.state = n;
}
Player.prototype.render = function(){
    //渲染图片
    this.game.ctx.drawImage(this.game.R.Player,this.state*32,0,32,32,this.x,this.y,32,32);
}

  //在游戏类里面实例
  function xiangzi(game){
    this.game = game;
    //人物的 行和列 初始值 四个格
    this.col = 9;
    this.row = 9;
    //自己的位置
    this.x = this.col*16;
    this.y = this.row*16;
    //坦克车方向 0 是下 1左 2右 3上
    this.state = 0;  
    // 跳一个格子
    this.speed = 1;
    //是否在运动
    this.ismoving = false;
 }
 //更新
 xiangzi.prototype.update = function(){
    
 }
 xiangzi.prototype.render = function(){
     //渲染图片
      this.game.ctx.drawImage(this.game.R.box,this.state*32,0,32,32,this.x,this.y,32,32);
      this.game.ctx.drawImage(this.game.R.box,this.state*32,0,32,32,50,66,32,32);
      this.game.ctx.drawImage(this.game.R.box,this.state*32,0,32,32,256,66,32,32);
      this.game.ctx.drawImage(this.game.R.box,this.state*32,0,32,32,256,224,32,32);

 }
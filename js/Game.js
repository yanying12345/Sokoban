function Game() {
    //画布现在也是实例
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.timer = null;
    //读图
    this.R = {
        "b0": "b0.png",
        "b1": "b1.png",
        "b2": "b2.png",
        "b3": "b3.png",
        "tile": "tile.png",
        "Player": "Player.png",
        "box": "box.png"
    }
    //图片的数量
    var pic = Object.keys(this.R).length;
    var picCount = 0
    //实例化玩家类
    this.Player = new Player(this);
    //实例化地图
    this.Map = new Map(this);
    //实例化箱子
    this.xiangzi = new xiangzi(this);
    var self = this;
    //游戏资源加载
    for (var k in this.R) {
        (function (k) {
            picCount++;
            var img = new Image();
            img.src = "images/" + self.R[k];
            img.onload = function () {
                self.R[k] = img;
                if (picCount == pic) {
                    //开始游戏
                    self.start();
                    //绑定监听
                    self.bind();
                }
            }
        })(k)
    }
    //开始游戏的方法  
    Game.prototype.start = function () {
        var self = this;
        //打印帧编号
        this.f = 0;
        this.timer = setInterval(function () {
            self.ctx.clearRect(0, 0, 320, 320);
            //帧编号加加
            self.f++;
            self.ctx.fillStyle = "white";
            self.ctx.fillText(self.f, 10, 20);
            //更新玩家类
            self.Player.update();
            self.Player.render();

            //更新地图类
            self.Map.update();
            self.Map.render();

            //更新箱子类
            self.xiangzi.update();
            self.xiangzi.render();
        }, 20)
    }
}
/*
//绑定键盘监听
Game.prototype.bind = function () {
    //备份this
    var self = this;
    document.onkeydown = function (e) {
        ///坦克车方向 0 是下 1左 2右 3上
        if (e.keyCode == 37) {
            //获取人物的X坐标
            var person_x = Math.round(self.Player.x);
            // var person_y = self.Player.y;
            // var person_lie = Math.round(person_x / 16);
            // var person_hang = Math.round(person_y / 16);
            // var arr = self.Map.code[person_hang];
            // var a = arr[person_lie - 1];
            // console.log(person_lie);
            // console.log(person_hang);
            // if (a == 1) {
            //     self.Player.changeDirection(1);
            //     self.Player.ismoving = false;
            // } else {

            //     self.Player.changeDirection(1);
            //     self.Player.ismoving = true;
            // }
            // self.Map.code.forEach(function(i){
            //     var qiang_line = i[7-1];
            //     if(qiang_line == 1){
            //         self.Player.changeDirection(1);
            //         self.Player.ismoving = false;
            //     }else{

            //         self.Player.changeDirection(1);
            //         self.Player.ismoving = true;
            //     }
            // });
            //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
            //获取箱子的坐标
            // console.log(person_x-144,"判断箱子的距离");
             //获取箱子的x
             var box_x = self.xiangzi.x;
                if (person_x < 48){
                    self.Player.changeDirection(1);
                    self.Player.ismoving = false;
                 }else{
                    self.Player.changeDirection(1);
                    self.Player.ismoving = true;
                }
        }
        if (e.keyCode == 38) {
            var person_y =Math.round(self.Player.y);
            //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
            var box_x = self.xiangzi.x;
            console.log(box_x);
            if (person_y<48){
               self.Player.changeDirection(3);
               self.Player.ismoving = false;
           }else{
               self.Player.changeDirection(3);
               self.Player.ismoving = true;
           }
        }
        if (e.keyCode == 39) {
            var person_x =Math.round(self.Player.x);
             //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
             console.log(person_x);
             if (person_x>250){
                self.Player.changeDirection(2);
                self.Player.ismoving = false;
            }else{
                self.Player.changeDirection(2);
                self.Player.ismoving = true;
            }
            // self.Player.changeDirection(2);
            // self.Player.ismoving = true;
        }
        if (e.keyCode == 40) {
            var person_y =Math.round(self.Player.y);
            //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
            console.log(person_y);
            if (person_y>250){
               self.Player.changeDirection(0);
               self.Player.ismoving = false;
           }else{
               self.Player.changeDirection(0);
               self.Player.ismoving = true;
           }
        }
    }
    //键盘抬起
    document.onkeyup = function (e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            self.Player.ismoving = false;
        }
    }
}
*/
Game.prototype.bind = function () {
    var self = this;
    var number = true;
    document.onkeydown = function (e) {
        if (self.timer != 0) {
            number = true;
        }
    }
    document.onkeyup = function (e) {
        if (self.timer != 0) {
            if (e.keyCode == 40) {
                if (number) {
                    var person_y = Math.round(self.Player.y);
                    //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
                    console.log(person_y);
                    if (person_y > 250) {
                        self.Player.changeDirection(0);
                        self.Player.ismoving = false;
                    } else {
                        self.Player.changeDirection(0);
                        self.Player.ismoving = true;
                    }
                }
            }
            if (e.keyCode == 39) {
                if (number) {
                    var person_y = Math.round(self.Player.x);
                    //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
                    console.log(person_y);
                    if (person_y > 250) {
                        self.Player.changeDirection(2);
                        self.Player.ismoving = false;
                    } else {
                        self.Player.changeDirection(2);
                        self.Player.ismoving = true;
                    }
                }
            }
            if (e.keyCode == 38) {
                if (number) {
                    var person_y = Math.round(self.Player.y);
                    //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
                    console.log(person_y);
                    if (person_y < 48) {
                        self.Player.changeDirection(3);
                        self.Player.ismoving = false;
                    } else {
                        self.Player.changeDirection(3);
                        self.Player.ismoving = true;
                    }
                }
            }
            if (e.keyCode == 37) {
                if (number) {
                    var person_y = Math.round(self.Player.x);
                    //判断当前人物的x坐标减去墙的x坐标（一个格子是16，墙占2个格子，加上人物的一半）是否小于0，小于0则是撞墙
                    console.log(person_y);
                    if (person_y < 48) {
                        self.Player.changeDirection(1);
                        self.Player.ismoving = false;
                    } else {
                        self.Player.changeDirection(1);
                        self.Player.ismoving = true;
                    }
                }
            }
            // number = false;
        }
    }
}
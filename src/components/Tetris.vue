<template>
    <div class="tetris">
        <div class="left">
            <div class="text">Next:</div>
            <canvas id="canvas2" class="left" width="175px" height="175px"></canvas>
            <div class="info">
                <p><label>→</label>right</p>
                <p><label>←</label>left</p>
                <p><label>↓</label>down</p>
                <p><label>↑</label>rotate</p>
                <p><label>space</label>falldown</p>
                <p><label>p</label>pause</p>
            </div>
        </div>
        <canvas id="canvas" width="272px" height="448px"></canvas>
        <div id="dashbord">
            <div class="text">Score</div>
            <div id="score">0</div>
            <div id="prompt">game over!</div>
            <a href="javascript:void(0);" id="start-btn">start</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tetris',
    mounted() {
        var clock;
        var over;
        var level = {
            speed: 500,
            color: "#0088CC",
            num: 0,
            levelMap:[{
              speed: 500,
              color: "#0088CC"
            },{
              speed: 450,
              color: "#9966cc"
            },{
              speed: 400,
              color: "#5bc0de"
            },{
              speed: 350,
              color: "#62c462"
            },{
              speed: 300,
              color: "#fbb450"
            },{
              speed: 200,
              color: "#ee5f5b"
            }],
            levelup: function() {
              this.num++;
              this.num = this.num >= this.levelMap.length ? this.levelMap.length-1 : this.num;
              this.speed = this.levelMap[this.num].speed;
              this.color = this.levelMap[this.num].color;
            },
        };

        document.getElementById('start-btn').addEventListener('click', run);
        function init() {
          level.speed = 500;
          level.color = "#0088CC";
          level.num = 0;
          over = false;
        }

        function run(){
            init();

            document.getElementById("score").innerHTML = "0";
            document.getElementById("prompt").style.display = "none";
            document.getElementById("start-btn").style.display = "none";
            clearInterval(clock);

            var score = 0;
            var canvas = document.getElementById("canvas");
            var ch = canvas.height;
            var cw = canvas.width;
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth = "1"; 
            ctx.clearRect(0,0,cw,ch);

            var canvas2 = document.getElementById("canvas2");
            var ch2 = canvas2.height;
            var cw2 = canvas2.width;
            var ctx2 = canvas2.getContext("2d");
            ctx2.beginPath();
            ctx2.lineWidth = "1"; 

            function pause(){
                if(clock){
                    clearInterval(clock);
                    clock = null;
                }
                else
                    clock = setInterval(main, level.speed);
            }

            function preview(tetrimino){
                var bak_offset = tetrimino.offset;
                tetrimino.offset = {x:2, y:2}
                tetrimino.cal_body();

                ctx2.clearRect(0,0,cw2,ch2);
                ctx2.fillStyle = level.color;
                for (var i in tetrimino.body){
                    ctx2.fillRect(tetrimino.body[i].x * 22+5, tetrimino.body[i].y * 22+5, 20, 20);
                    ctx2.stroke();
                }

                tetrimino.offset = bak_offset;
            }

            function game_over(){
                clearInterval(clock);
                document.getElementById("prompt").style.display = "block";
                document.getElementById("start-btn").style.display = "";
                document.getElementById("start-btn").innerHTML = "restart";
                ctx2.clearRect(0,0,cw2,ch2);
                over = true;
            }

            var pool = {
                body : [],
                put  : function(arr){
                    this.body = this.body.concat(arr);
                    this.clean();
                },
                draw : function(){
                    ctx.fillStyle = level.color;
                    for (var i in this.body){
                        ctx.fillRect(this.body[i].x * 22+5, this.body[i].y * 22+5, 20, 20);
                        ctx.stroke();
                    }
                },
                clean: function(){
                    var map = this.map();
                    if(map === false){
                        return;
                    }
                    var count = 0;
                    for(var i=0; i<20; i++){
                        if(map[i] == 4095){
                            var new_body = [];
                            for (var k in this.body){
                                if(this.body[k].y == i){
                                    ctx.clearRect(this.body[k].x * 22+5, this.body[k].y * 22+5, 20, 20);
                                }
                                else {
                                    new_body.push(this.body[k]);
                                }
                            }

                            this.body = new_body;
                            for (var k in this.body){
                                if(this.body[k].y < i){
                                    ctx.clearRect(this.body[k].x * 22+5, this.body[k].y * 22+5, 20, 20);
                                    this.body[k].y++;
                                }
                            }
                            count++;
                        }
                    }
                    if (count>0){
                        score += (2*count-1) * 10;
                        document.getElementById("score").innerHTML = score;
                        if (Math.floor(score/300) > level.num) {
                          level.levelup();
                          clearInterval(clock);
                          clock = setInterval(main, level.speed);
                        }
                    }

                    this.draw();
                },
                map  : function(){
                    var map = [];
                    for (var i in this.body){
                        if (this.body[i].y == 0){
                            game_over();
                            return false;
                        }
                        map[this.body[i].y] |= 1<<this.body[i].x;
                    }
                    return map;
                }
            };

            var type_list = ["o", "i", "l", "j", "z", "s", "t"]
            var Tetriminos = function(type, offset){
                if (!type || type_list.indexOf(type) == -1)
                    return null;

                var tetrimino = {};
                tetrimino.shape = 0;
                switch(type) {
                    case "o":
                        tetrimino.offset = offset ? offset : {x:5,y:0};
                        tetrimino.cal_body = function(){
                            tetrimino.body = [
                                {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1}
                            ];
                        };
                        break;
                    case "i":
                        tetrimino.offset = offset ? offset : {x:4,y:0};
                        tetrimino.cal_body = function(){
                            var s = tetrimino.shape % 2;
                            if (s == 0){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+2, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+3, y:tetrimino.offset.y}
                                ];
                            }
                            else{
                                tetrimino.body = [
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+2},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+3}
                                ];
                            }
                        };
                        break;
                    case "l":
                        tetrimino.offset = offset ? offset : {x:5,y:0};
                        tetrimino.cal_body = function(){
                            var s = tetrimino.shape % 4;
                            if(s == 0){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+2},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+2}
                                ];
                            }
                            else if(s==1){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y}
                                ];
                            }
                            else if(s==2){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+2}
                                ];
                            }
                            else {
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+2, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1}
                                ];
                            }
                        };
                        break;
                    case "j":
                        tetrimino.offset = offset ? offset : {x:5,y:0};
                        tetrimino.cal_body = function(){
                            var s = tetrimino.shape % 4;
                            if (s==0){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+2},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+2}
                                ];
                            }
                            else if(s==1){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1}
                                ];
                            }
                            else if(s==2){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+2}
                                ];
                            }
                            else{
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+2, y:tetrimino.offset.y+1}
                                ];
                            }
                        };
                        break;
                    case "z":
                        tetrimino.offset = offset ? offset : {x:6,y:0};
                        tetrimino.cal_body = function(){
                            var s = tetrimino.shape % 2;
                            if(s == 0){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y+2}
                                ];
                            }
                            else {
                                tetrimino.body = [
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1}
                                ];
                            }
                        };
                        break;
                    case "s":
                        tetrimino.offset = offset ? offset : {x:5,y:0};
                        tetrimino.cal_body = function(){
                            var s = tetrimino.shape % 2;
                            if (s==0){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+2}
                                ];
                            }
                            else {
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y+1}
                                ];
                            }
                        };
                        break;
                    case "t":
                        tetrimino.offset = offset ? offset : {x:5,y:0};
                        tetrimino.cal_body = function(){
                            var s = tetrimino.shape % 4;
                            if (s==0){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1}
                                ];
                            }
                            else if(s==1){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+2},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1}
                                ];
                            }
                            else if(s==2){
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x+1, y:tetrimino.offset.y+1}
                                ];
                            }
                            else{
                                tetrimino.body = [
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+1},
                                    {x:tetrimino.offset.x, y:tetrimino.offset.y+2},
                                    {x:tetrimino.offset.x-1, y:tetrimino.offset.y+1}
                                ];
                            }
                        };
                        break;
                }

                tetrimino.draw = function(){
                    this.clear();
                    this.cal_body();
                    ctx.fillStyle = level.color;
                    for (var i in this.body){
                        ctx.fillRect(this.body[i].x * 22+5, this.body[i].y * 22+5, 20, 20);
                        ctx.stroke();
                    }
                };

                tetrimino.clear = function(){
                    for (var i in this.body){
                        ctx.clearRect(this.body[i].x * 22+5, this.body[i].y * 22+5, 20, 20);
                    }
                }

                tetrimino.check = function(){
                    var body_bak = this.body;
                    this.cal_body();
                    for (var i in this.body){
                        if(this.body[i].x < 0 || this.body[i].x > 11 || this.body[i].y > 19){
                            this.body = body_bak;
                            return false;
                        }
                        if (pool.body != []){
                            for (var j in pool.body){
                                if(this.body[i].y == pool.body[j].y && this.body[i].x == pool.body[j].x ){
                                    this.body = body_bak;
                                    return false;
                                }
                            }
                        }
                    }
                    this.body = body_bak;
                    return true;
                }

                tetrimino.check_bottom = function(){
                    for (var i in this.body){
                        if(this.body[i].y+1 > 19){
                            return false;
                        }
                        if (pool.body != []){
                            for (var j in pool.body){
                                if(this.body[i].y+1 == pool.body[j].y && this.body[i].x == pool.body[j].x )
                                    return false;
                            }
                        }
                    }
                    return true;
                }


                return tetrimino;
            }

            var random_one = function(){
                var random_num = Math.random() * 7 >>> 0;
                return Tetriminos(type_list[random_num]);
            }

            var tetrimino = random_one();
            var next_t = random_one();
            tetrimino.draw();

            document.onkeydown = function(event){
                if(!tetrimino || over)
                    return false;

                switch(event.keyCode){
                    case 37:
                        tetrimino.offset.x--;
                        if(!tetrimino.check()){
                            tetrimino.offset.x++;
                        }
                        tetrimino.draw();
                        break;
                    case 39:
                        tetrimino.offset.x++;
                        if(!tetrimino.check()){
                            tetrimino.offset.x--;
                        }
                        tetrimino.draw();
                        break;
                    case 40:
                        if(tetrimino.check_bottom()){
                            tetrimino.offset.y++;
                            tetrimino.draw();
                        }
                        break;
                    case 38:
                        tetrimino.shape++;
                        if(!tetrimino.check() ){
                            tetrimino.shape--;
                        }
                        tetrimino.draw();
                        break;
                    case 32:
                        tetrimino.clear();
                        while(tetrimino.check_bottom() ){
                            tetrimino.offset.y++;
                            tetrimino.cal_body();
                        }
                        tetrimino.draw();
                        pool.put(tetrimino.body);
                        tetrimino = next_t;
                        next_t = random_one();
                        preview(next_t);
                        break;
                    case 80:
                        pause();
                        break;
                }
            }

            var main = function(){
                if (tetrimino != null){
                    tetrimino.offset.y++;
                }

                if(!tetrimino.check_bottom()){
                    pool.put(tetrimino.body);
                    tetrimino = next_t;
                    next_t = random_one();
                    preview(next_t);
                }
                tetrimino.draw();
            };

            clock = setInterval(main, level.speed);
        }
    }
}
</script>

<style lang="less" scoped>
    .tetris {width:700px;margin:60px auto;}
    #canvas {position:relative;box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);border-radius:2px;float:left;margin-right:10px;}
    #canvas2 {margin-bottom:50px;}
    #dashbord {float:left;margin-left:30px;}
    .text {color:#0088cc;font-size:20px;}
    #score {color:#999;font-size:34px;margin:10px 0 60px;}
    #prompt {color:#999;font-size:34px;margin:10px 0 30px;display:none;}
    #start-btn {display:inline-block;text-decoration:none;width:50px;height:20px;padding:4px;line-height:20px;background:#0088cc;color:#fff;text-align:center;border-radius:2px;}
    .left {float:left;}
    p {padding-left:30px;}
    p label {display:inline-block;width:25px;text-align:center;margin-right:20px;}
</style>

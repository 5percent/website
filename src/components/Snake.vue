<template>
    <div class="snake">
        <canvas id="canvas" width="200px" height="300px"></canvas>
        <div id="dashbord">
            <div id="text">Score</div>
            <div id="score">0</div>
            <div id="prompt">game over!</div>
            <a href="javascript:void(0);" id="start-btn">start</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'snake',
    mounted() {
        var clock;
        document.getElementById('start-btn').addEventListener('click', run);
        function run(){
            document.getElementById("score").innerHTML = "0";
            document.getElementById("prompt").style.display = "none";
            document.getElementById("start-btn").style.display = "none";
            clearInterval(clock);
            var speed = 150;
            var canvas = document.getElementById("canvas");
            var ch = canvas.height;
            var cw = canvas.width;
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth = "1"; 

            var bean = {
                count  : 0,
                cursor : {x : 0, y : 0},
                draw   : function(){
                    ctx.fillStyle = "#b94a48";
                    ctx.fillRect(this.cursor.x * 10, this.cursor.y * 10, 10, 10);
                    ctx.stroke();
                }
            };

            var snake = {
                direction : [3],
                body : [{x:3,y:4}, {x:3,y:3}, {x:3,y:2}],
                draw : function(){
                    ctx.fillStyle = "#0088CC";
                    for (var i in this.body){
                        ctx.fillRect(this.body[i].x * 10, this.body[i].y * 10, 10, 10);
                        ctx.stroke();
                    }
                },
                check : function(){
                    if (this.body[0].x<0 || this.body[0].x>(cw/10-1) || this.body[0].y<0 || this.body[0].y > (ch/10-1))
                        return false;
                    for (var i in this.body){
                        if (i!=0 && this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y){
                            return false;
                        }
                    }

                    return true;
                }
            };

            bean.another = function(){
                this.cursor.x = Math.random() * (cw/10-1) >>> 0;
                this.cursor.y = Math.random() * (ch/10-1) >>> 0;

                for (var i in snake.body){
                    if (this.cursor.x == snake.body[i].x && this.cursor.y == snake.body[i].y){
                        this.another();
                        break;
                    }
                }
            }
            bean.another();


            document.onkeyup = function(event){
                var ld = snake.direction[snake.direction.length-1];
                switch(event.keyCode) {
                    case 37: if (ld != 2 && ld != 4) snake.direction.push(4);break;
                    case 38: if (ld != 3 && ld != 1) snake.direction.push(1);break;
                    case 39: if (ld != 2 && ld != 4) snake.direction.push(2);break;
                    case 40: if (ld != 1 && ld != 3) snake.direction.push(3);break;
                    case 13: run();break;
                }
            }

            function main(){
                var node;
                if (snake.body[0].x == bean.cursor.x && snake.body[0].y == bean.cursor.y){
                    node = {
                        x : snake.body[0].x,
                        y : snake.body[0].y,
                    };

                    bean.count++;
                    document.getElementById("score").innerHTML = bean.count;
                    if (bean.count % 5 == 0){
                        speed = 150 - bean.count*4;
                        speed = speed < 50 ? 50 : speed;
                        clearInterval(clock);
                        clock = setInterval(main, speed);
                    }
                        
                    bean.another();
                }
                else {
                    node = snake.body.pop();
                }

                if (snake.direction.length != 1)
                    snake.direction.shift();
                var nd = snake.direction[0]; 
                switch(nd) {
                    case 1: node.x = snake.body[0].x; node.y = snake.body[0].y-1; break;
                    case 2: node.x = snake.body[0].x+1; node.y = snake.body[0].y; break;
                    case 3: node.x = snake.body[0].x; node.y = snake.body[0].y+1; break;
                    case 4: node.x = snake.body[0].x-1; node.y = snake.body[0].y; break;
                }
                snake.body.unshift(node);

                if (!snake.check()) {
                    clearInterval(clock);
                    document.getElementById("prompt").style.display = "block";
                    document.getElementById("start-btn").style.display = "";
                    document.getElementById("start-btn").innerHTML = "restart";
                }

                ctx.clearRect(0,0,cw,ch);
                bean.draw();
                snake.draw();

            }
            clock = setInterval(main, speed);
        }
    }
}
</script>

<style lang="less" scoped>
    .snake {width:450px;margin:60px auto;}
    #canvas {position:relative;box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);border-radius:2px;float:left;}
    #dashbord {float:left;margin-left:30px;}
    #text {color:#0088cc;font-size:20px;}
    #score {color:#999;font-size:34px;margin:10px 0 60px;}
    #prompt {color:#999;font-size:34px;margin:10px 0 30px;display:none;}
    #start-btn {display:inline-block;text-decoration:none;width:50px;height:20px;padding:4px;line-height:20px;background:#0088cc;color:#fff;text-align:center;border-radius:2px;}
</style>

var can = new Canvas();
can.resize(400, 500);

var bird = {width: 26, height: 26},
    pipeNorth = {width: 52, height: 250},
    pipeSouth = {width: 52, height: 400},
    fg = {width: can.width(), height: 100};

var score = 0, gap = 90, bx = 20, by = 150, gravity = 1.3, velocity = 1, distance = can.width() - 250, pipe = [], isGameOver = false;

document.addEventListener('keydown', function(a){
  if(a.keyCode == 38 || a.keyCode == 32){
    by -= 25;
  }else if(a.keyCode == 40){
    by += 3;
  }
  if(isGameOver == true){
    isGameOver = false;
    score = 0;
    by = 150;
    gravity = 1.3;
    velocity = 1;
    pipe = [{x: can.width(), y: 0}];
  }
});

pipe[0] = {x: can.width(), y: 0};

var draw = function(){
  can.rect(can.width(), can.height(), {fill: '#90caf9'});

  for(var i=0; i<pipe.length; i++){
    if(pipe[i].x+pipeNorth.width >= 0){
      can.rect(pipeNorth.width, pipeNorth.height, {fill: '#4caf50', x: pipe[i].x, y: pipe[i].y});
      can.rect(pipeSouth.width, pipeSouth.height, {fill: '#4caf50', x: pipe[i].x, y: pipe[i].y+(242+gap)});

      if(isGameOver == false){pipe[i].x -= velocity;}

      if(Math.floor(pipe[i].x) == distance){
        pipe.push({x: can.width(), y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height});
      }

      if(bx+bird.width >= pipe[i].x && bx <= pipe[i].x+pipeNorth.width && (by <= pipe[i].y+pipeNorth.height || by+bird.height >= pipe[i].y+pipeNorth.height+gap) || by+bird.height >= can.height()-fg.height){
        isGameOver = true;
        //location.reload();
      }

      if(Math.floor(pipe[i].x) == pipeNorth.width-(bx+bird.width)){
        score += 1;
        if(score > 0 && score%5 == 0){
          velocity += 0.3;
          //distance += velocity;
        }
      }
    }else{
      pipe = pipe.slice(1, pipe.length);
    }
  }

  can.rect(fg.width, fg.height, {fill: '#795548', y: can.height() - fg.height});
  can.circle(bird.width, bird.height, {fill: '#E91E63', x: bx, y: by});

  can.text('Score : '+score, {x: 10, y: can.height()-20, fill: '#eceff1', font: '20px Verdana'});

  if(isGameOver == true){
    can.rect(can.width(), can.height(), {fill: 'rgba(236,239,241,0.7)'});
    can.text('Game Over', {x: can.width()/2, y: can.height()/2, fill: '#f44336', font: 'bold 40px Verdana', align: 'center'});
    can.text('Score : '+score, {x: can.width()/2, y: (can.height()/2)+40, fill: '#2196F3', font: '20px Verdana', align: 'center'});
    gravity = 0;
  }else{
    by += gravity;
  }

  gravity = gravity;

  requestAnimationFrame(draw);
}

draw();
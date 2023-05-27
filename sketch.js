let points = [[0,7], [1,5], [2, 5],[2,3],[3,2],[3,1],[4,0],[5,1],[5,2],[6,3],[6,5],[7,5],[8,7],[5,6],[6,7],[7,7],[8,8],[8,10],[7,11],[6,10],[7,10],[7,9],[6,9],[5,10],[5,9],[6,8],[5,8],[5,7],[3,7],[3,8],[2,8],[3,9],[3,10],[2,9],[1,9],[1,10],[2,10],[1,11],[0,10],[0,8],[1,7],[2,7],[3,6]];
var stroke_colors = "2d00f7-6a00f4-8900f2-a100f2-b100e8-bc00dd-d100b6-e500a4-f20089".split("-").map(a=>"#"+a)
var fill_colors = "ffbf8cc-fde4cf-ffcfd2-f1c0e8-cfbaf0".split("-").map(a=>"#"+a)

class Obj{  //一隻某某物件的設定
  constructor(args){  //預設值，基本資料(顏色位置大小速度)
  this.p = args.p || createVector(random(width),random(height))
  this.v = createVector(random(-1,1),random(-1,1))
  this.size = random(5,10) 
  this.color = random(fill_colors)
  this.stroke = random(stroke_colors)
  }
  draw() //把物件畫出來的函數
  {
  push()
  translate(this.p.x,this.p.y)
  scale((this.v.x<0?1:-1),-1)
  fill(this.color)
  stroke(this.stroke)
  strokeWeight(3)
  beginShape()
  for(var i =0;i<points.length;i=i+1){
  curveVertex(points[i][0]*this.size,points[i][1]*this.size)
  }
     endShape()
  pop()
  }
  update(){
  
  this.p.add(this.v)
  
  //算出滑鼠位置的向量
  let mouseV = createVector(mouseX,mouseY) //將目前滑鼠位置轉成向量值
  let delta = mouseV.sub(this.p).limit(this.v.mag()*2)
  this.p.add(delta)
  
  //碰壁的處理程式碼
  if(this.p.x<=0 || this.p.x >= width) //<0碰到左邊，>width為碰到右邊
  {
    this.v.x = -this.v.x
  }
  if(this.p.y<=0 || this.p.y >= height) //<0碰到左邊，>width為碰到右邊
  {
    this.v.y = -this.v.y
  }
  }
  isBallInRanger(x,y){
    let d =dist(x,y,this.p.x,this.p.y)
    if(d<this.size*8){
      return true
    }else{
      return false
    }
  }
  }

  class Bullet{
    constructor(args){
        this.r = args.r || 10
        this.p = args.p ||  createVector(width/2,height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(6)
        this.color = args.color || "red"

    }
    draw(){
        push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
        

        pop()
    }
    update(){
        this.p.add(this.v)
    }
}

var ball //代表單一個物件，利用這個變數來做正在處理的物件
var balls = [] //陣列，放所有的物件資料，物件倉庫，裡面儲存所有的物件資料
var bullet
var bullets = []
var score = 0

function setup(){ //設定某某物件倉庫內的資料
createCanvas(windowWidth,windowHeight)

for(j=0;j<20;j=j+1) //產生幾個物件
{
ball = new Obj({})
balls.push(ball)

}
}

function draw(){
  background(220);

  for(let ball of balls){
  ball.draw()
  ball.update()
  for(let bullet of bullets){
    if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
    {
      score = score +1
      balls.splice(balls.indexOf(ball),1)
      bullets.splice(bullets.indexOf(bullet),1)

    }
  }
  }

  for(let ballet of bullets){
    ballet.draw()
    ballet.update()
  }

    textSize(50)
    text(score,50,50)

    push()
    let dx = mouseX-width/2
    let dy = mouseY-height/2
    let angle = atan2(dy,dx)


    translate(width/2,height/2)
    rotate(angle)
    noStroke()
    fill("#FF5809")
    ellipse(0,0,60)
    fill("#84C1FF")
    triangle(50,0,-25,-25,-25,25)
    
    pop()
 
}

function mousePressed(){



bullet = new Bullet({})
bullets.push(bullet)
}
var displayLine = false;
var xLoc = 0;
var yLoc = 0;
var numerator = "1";
var denominator = "1";
var over0 = false;
var lastSlope = 0;
var lastDenomVal = "1";

function setup() {
    createCanvas(1280,700);
    //var input = createInput();
    
    input1 = createInput();
    input1.position(405, 620);
    
    input2 = createInput();
    input2.position(405, 650);
    
    button = createButton('submit');
    button.position(550, 633);
    button.mousePressed(reDefine);
    
    
    
}

function draw() {
  background(0, 150,200);
    prepare();
    slopeField();
    
    if(displayLine)
        {
            curveLine();
        }
    
    
    noStroke();
    textFont("Palatino");
    textSize(24);
    
    if(mouseX <1200 && mouseY < 600)
        {
            text("x : " + ((int)((mouseX/20)-30)), 950, 640);
            text("y : " + ((int)((-mouseY/20)+15)), 950, 660);
        }
    else{
            text("x : Nah", 950, 640);
            text("y : Nah", 950, 660);
        }
    
    
    textSize(32);
    text("Equation Dy/Dx : ", 140,650);
    text("Coordinates : ", 750, 650);
    
    textSize(10);
    text("Functions:                                 Trig Funcs sin(), asin(), cos(), acos(), tan(), atan() ", 1210,50,65 ,650);
    text("Absolute Val  abs()", 1210,135,65 ,650);
    text("Eulers #   exp(n) returns e^nth", 1210,185,65 ,650);
    text("Log        Log(n)/log(x) returns log(n) with a base of x", 1210,240,65 ,650);
    text("Natural Log log(n)    returns ln(n)", 1210,310,65 ,650);
    text("Squared     sq(n)    returns n^2", 1210,365,65 ,650);
    text("Square Root  sqrt(n)    returns √n", 1210,420,65 ,650);
    text("Constants  QUARTER_PI HALF_PI      PI         TWO_PI", 1210,475,65 ,650);
    
    
}

function prepare()
{  
    strokeWeight(2);
    stroke(255,255,255);
    line(600,0,600,600);
    line(0,300,1200,300);
    
    stroke(0);
    strokeWeight(3);
    line(405,645,535,645);
    
    strokeWeight(2);
    
    ellipseMode(CENTER);
    stroke(200);
    for(var x = -30; x <= 30; x++)
        {
            for(var y = -15; y <= 15; y++)
                {
            ellipse(600+(20*x),300+(20*y),2,2);
                }
        }
}

function slopeField()
{
    strokeWeight(2);
    stroke(200,200,200,150);
    for(var x = -30; x <= 30; x++)
        {
            for(var y = -15; y <= 15; y++)
                {
                    line(
                         600+ (20*x)-(6*cos(slopeAt((x),(-y)))),
                         300+ (20*y)+(6*sin(slopeAt((x),(-y)))), 
                         600+ (20*x)+(6*cos(slopeAt((x),(-y)))),
                         300+ (20*y)-(6*sin(slopeAt((x),(-y))))
                    );
                }
        }
}

function slopeAt(x,y)
{  
    var scope = {
    x: x,
    y: y,   
    };
    
    var func = "(" + numerator + ")" + "/" + "(" + denominator + ")";
    
    var slope = eval(func, scope);
    slope = atan(slope);
    
    var denomVal = eval(denominator);
    
    if(((slope > 0 && lastSlope < 0) || (slope < 0 && lastSlope > 0)) && ((denomVal < 0 && lastDenomVal > 0) || (denomVal > 0 && lastDenomVal < 0)))
        {
            over0 = true;
            
        }
    else
        {
            over0 = false;
        }
    lastDenomVal = denomVal;
    lastSlope = slope;
    return slope;
}

function mousePressed()
{
    if(mouseX < 1200 && mouseX > 0 && mouseY < 600 && mouseY > 0)
    {
    xLoc = mouseX;
    yLoc = mouseY;
    displayLine = true;
    }
    else
        {
            displayLine = false;
        }
}

function curveLine()
{
    stroke(255);
    strokeWeight(3);
    ellipse(xLoc, yLoc, 8 ,8);
    
    var x1 = xLoc;
    var y1 = yLoc;
    
    var x2 = 0;
    var y2 = 0;
    
    var count = 0;
    var count2 = 0; 
    
   while(x1 < 1200 && count < 10000)
        {   
            count++;
            //text(count + "" , 500,500);
            
            x2 = x1 + (1*cos(slopeAt((x1/20) -30,(-(y1/20)) + 15)));
            y2 = y1 - (1*sin(slopeAt((x1/20) -30,(-(y1/20)) + 15)));
                                     
            line(x1, y1, x2, y2);
            
            x1 = x2 + (1*cos(slopeAt((x2/20) -30,(-(y2/20)) + 15)));
            
            if(over0)
                {
                    stroke(200,0,0);
                    ellipse(x1,y1,20,20);
                    x1 = 1200;
                    stroke(255);
                }
            else{
            y1 = y2 - (1*sin(slopeAt((x2/20) -30,(-(y2/20)) + 15)));                      
            line(x2, y2, x1, y1);
                }
            
        }
    
    var x1 = xLoc;
    var y1 = yLoc;
    over0 = false;
  
    while(x1 > 0 && count2 < 10000)
        {
            count2++;
            
            //text(count2 + "" , 800,500);
            
            x2 = x1 - (1*cos(slopeAt((x1/20) -30,(-(y1/20)) + 15)));
            y2 = y1 + (1*sin(slopeAt((x1/20) -30,(-(y1/20)) + 15)));
                                     
            line(x1, y1, x2, y2);
            
            x1 = x2 - (1*cos(slopeAt((x2/20) -30,(-(y2/20)) + 15)));
            
            if(over0)
                {
                    stroke(200,0,0);
                    ellipse(x2,y2,20,20);
                     x1 = 0;
                    stroke(255);
                }
            else
                {
            y1 = y2 + (1*sin(slopeAt((x2/20) -30,(-(y2/20)) + 15)));
            line(x2, y2, x1, y1);
                }
            
            
            
        }
    
    
    over0 = false;
    
    
    
}

function reDefine()
{
    numerator = input1.value();  
    denominator = input2.value();  
}


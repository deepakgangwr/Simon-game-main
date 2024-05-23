var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

$(".btn").click(function(){
    userChosencolor=$(this).attr("id");
    userClickedPattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);

    checkAnswer(userClickedPattern.length-1);
});

checkAnswer();
var level=0;
var started=false;

$("body").keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});

function checkAnswer(currLevel){
    if(gamePattern[currLevel]===userClickedPattern[currLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 100);
        $("h1").text("Press any key to restart!");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    
    var randomNum=Math.random() * 4;
    randomNum=Math.floor(randomNum);
    var randomChosenColor=buttonColors[randomNum];

    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
    level++;
    $("h1").text("Level "+level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




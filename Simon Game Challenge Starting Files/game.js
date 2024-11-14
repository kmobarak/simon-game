let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;
let started = false;


function nextSequence(){
   let randomNum = Math.floor(Math.random() * 4);
   let randomChosenColor = buttonColors[randomNum];
   gamePattern.push(randomChosenColor);
   
   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   
   playSound(randomChosenColor);
   level++;
   $("#level-title").html("level " + level);


}

$(".btn").click(function(){
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
  
    console.log(userClickedPattern);

    playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); 
    }, 100);
}

$(document).keydown(function(){
    if(!started){
        $("#level-title").html("level " + level);
        nextSequence();
        started = true;
    }
});


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []; 
            }, 1000);
        }
    }
    else {
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 1000);
        startOver();
        
    }
    

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;

}

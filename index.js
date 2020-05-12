//Global Variables

const tiles = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen"];
const gamePattern = [];
const playerPattern = [];

var started = false;
var level = 0;

//Caption Behaviour b4 game starts

$("#caption").mouseenter(() => {
    if(!started)
        $("#caption").addClass("mouse-on-caption pointer");
});

$("#caption").mouseleave(() => {
    $("#caption").removeClass("mouse-on-caption pointer");
});

$("#caption").click(() => {
    if(!started) {
        started = true;
        nextLevel();
    }
});

//Tile behaviour

$(".piano > div").click((e) => {
    let audio = new Audio("./audio/"+$(e.target).attr("id")+".mp3");
    audio.play();
    $(e.target).fadeOut(100).fadeIn(100);
    if(started) {
        playerPattern.push($(e.target).attr("id"));
        check(playerPattern.length-1);
    }
});

//Utility functions

function reset() { 
    level = 0;
    gamePattern.length = 0;
    playerPattern.length = 0;
    started = false;
}

function check(index) {
    if(playerPattern[index] === gamePattern[index]) {
        if(playerPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextLevel();
            }, 1000);
        }
    } else {
        //audio
        let audio = new Audio("./audio/error.mp3");
        audio.play();

        //flash
        $("body").addClass("wrong-answer");
        setTimeout(() => {
            $("body").removeClass("wrong-answer");
        }, 100); 

        //Show score
        $("#caption").animate({"opacity":0},400,() => {
            $("#caption").text("Score: "+(level*10)).animate({"opacity":1},400,() => {
                setTimeout(() => {
                    reset();
                    //Play again
                    $("#caption").animate({"opacity":0},400,() => {
                        $("#caption").text("Play Again").animate({"opacity":1},400);
                    });
                }, 2000);
            });
        });
    }
}

function nextLevel() {
    //Update level & clear player's pattern
    level++;
    playerPattern.length = 0;

    //Re-render Caption
    $("#caption").animate({"opacity":0},400,() => {
        $("#caption").text("Level "+level).animate({"opacity":1},400);
    });

    //Add new tile to game pattern
    const newTile = tiles[Math.floor(Math.random()*13)];
    gamePattern.push(newTile);

    //Let player know new tile
    let audio = new Audio("./audio/"+newTile+".mp3");
    audio.play();
    $("#"+newTile).addClass("new-tile");
    setTimeout(() => {
        $("#"+newTile).removeClass("new-tile");
    }, 500);
}
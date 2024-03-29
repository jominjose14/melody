//Global Variables

const tiles = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
];
const keymap = {
  a: "one",
  w: "two",
  s: "three",
  e: "four",
  d: "five",
  f: "six",
  t: "seven",
  g: "eight",
  y: "nine",
  h: "ten",
  u: "eleven",
  j: "twelve",
  k: "thirteen",
};
const gamePattern = [];
const playerPattern = [];

var mode = 0;
const modes = [
  { diff: "Easy", name: "B", hs: 0 },
  { diff: "Hard", name: "W", hs: 0 },
  { diff: "Pro", name: "<BW>", hs: 0 },
];
var started = false;
var clickedOnce = false;
var level = 0;

//Caching Audio

tiles.forEach((note) => {
  new Audio("./audio/" + note + ".mp3");
});

//Caption Behaviour b4 game starts

$("#caption").mouseenter(() => {
  if (!started) $("#caption").addClass("mouse-on-caption pointer");
});

$("#caption").mouseleave(() => {
  $("#caption").removeClass("mouse-on-caption pointer");
});

$("#caption").click(() => {
  if (!clickedOnce) {
    new Audio("./audio/intro.mp3").play();
    $("#caption").animate({ opacity: 0 }, 500, () => {
      $("#caption")
        .text("😄 Welcome 😃")
        .animate({ opacity: 1 }, 1000, () => {
          $("#caption").animate({ opacity: 0 }, 500, () => {
            $("#caption")
              .text("🧐 Follow the pattern 🤯")
              .animate({ opacity: 1 }, 500);
          });
        });
    });
    clickedOnce = true;
    setTimeout(() => {
      started = true;
      nextLevel();
    }, 6000);
  } else if (!started) {
    started = true;
    nextLevel();
  }
});

//Tile behaviour

$(".piano > div").click((e) => {
  new Audio("./audio/" + $(e.target).attr("id") + ".mp3").play();
  $(e.target).fadeOut(100).fadeIn(100);
  if (started) {
    playerPattern.push($(e.target).attr("id"));
    check(playerPattern.length - 1);
  }
});

$(document).keypress((e) => {
  const pressedTile = keymap[e.key];
  new Audio("./audio/" + pressedTile + ".mp3").play();
  $("#" + pressedTile)
    .fadeOut(100)
    .fadeIn(100);
  if (started) {
    playerPattern.push($("#" + pressedTile).attr("id"));
    check(playerPattern.length - 1);
  }
});

//Heading behaviour
$(".heading").click(() => {
  if (!started) {
    new Audio("./audio/mode.mp3").play();
    mode = (mode + 1) % 3;
    $(".heading").animate({ opacity: 0 }, 200, () => {
      $(".heading")
        .html(
          "<span></span><span>" +
            modes[mode].diff +
            "</span><span> " +
            modes[mode].hs +
            "</span>"
        )
        .animate({ opacity: 1 }, 200, () => {
          setTimeout(() => {
            $(".heading").animate({ opacity: 0 }, 200, () => {
              $(".heading")
                .html(
                  "<span id='m'>M</span><span id='e'>e</span><span id='l'>l</span><span id='o'>o</span><span id='d'>d</span><span id='y'>y</span>"
                )
                .animate({ opacity: 1 }, 200);
            });
          }, 500);
        });
    });
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
  if (playerPattern[index] === gamePattern[index]) {
    if (playerPattern.length === gamePattern.length) {
      setTimeout(() => {
        level++;
        nextLevel();
      }, 1000);
    }
  } else {
    //audio
    new Audio("./audio/error.mp3").play();

    //Message
    let message = "";
    if (level <= 3) {
      message = "Game over! Your score is too low ☹️";
    } else if (
      (mode === 0 && level >= 9) ||
      (mode === 1 && level >= 7) ||
      (mode === 3 && level >= 5)
    ) {
      message = "Game over! Your score is amazing 😎";
    } else if (mode === 3 && level >= 10) {
      message = "Game over! Your score is exceptional...are you an Alien 👽 ?";
    } else {
      message = "Game over! Your score could have been better 🥱";
    }
    $(".popup").text(message).addClass('grid').fadeIn(500);
    setTimeout(() => {
      $(".popup").removeClass('grid').fadeOut(500);
    }, 1500);

    //flash
    $("body").addClass("wrong-answer");
    setTimeout(() => {
      $("body").removeClass("wrong-answer");
    }, 100);

    //Update highscore
    modes[mode].hs =
      level * 100 > modes[mode].hs ? level * 100 : modes[mode].hs;

    //Show score
    $("#caption").animate({ opacity: 0 }, 400, () => {
      $("#caption")
        .text("Score: " + level * 100 + " in " + modes[mode].diff + " Mode")
        .animate({ opacity: 1 }, 400, () => {
          setTimeout(() => {
            reset();
            //Play again
            $("#caption").animate({ opacity: 0 }, 400, () => {
              $("#caption").text("Play Again").animate({ opacity: 1 }, 400);
            });
          }, 2500);
        });
    });
  }
}

function nextLevel() {
  //Clear player's pattern
  playerPattern.length = 0;

  //Re-render Caption
  $("#caption").animate({ opacity: 0 }, 400, () => {
    $("#caption")
      .text("Level " + level)
      .animate({ opacity: 1 }, 400);
  });

  //Add new tile to game pattern
  let newTile = "";
  if (mode === 2)
    //Pro Mode - Black & White
    newTile = tiles[Math.floor(Math.random() * 13)];
  else if (mode === 1) {
    //Hard Mode - White only
    let index = 1;
    while (index in { 1: 1, 3: 3, 6: 6, 8: 8, 10: 10 }) {
      index = Math.floor(Math.random() * 13);
    }
    newTile = tiles[index];
  } else if (mode === 0) {
    //Easy Mode - Black only
    let index = 0;
    while (index in { 0: 0, 2: 2, 4: 4, 5: 5, 7: 7, 9: 9, 11: 11, 12: 12 }) {
      index = Math.floor(Math.random() * 13);
    }
    newTile = tiles[index];
  }
  gamePattern.push(newTile);

  //Let player know new tile
  new Audio("./audio/" + newTile + ".mp3").play();
  $("#" + newTile).addClass("new-tile");
  setTimeout(() => {
    $("#" + newTile).removeClass("new-tile");
  }, 500);
}

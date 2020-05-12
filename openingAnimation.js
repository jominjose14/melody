let audio = new Audio("./audio/intro.mp3");
audio.play();

$(".heading > span").css("opacity",0);

$("#m").animate({"opacity":1},300,() => {
    $("#e").animate({"opacity":1},300,() => {
        $("#l").animate({"opacity":1},300,() => {
            $("#o").animate({"opacity":1},300,() => {
                $("#d").animate({"opacity":1},300,() => {
                    $("#y").animate({"opacity":1},300);
                });
            });
        });
    });
});

setTimeout(() => {
    $("#m").css("color","#fff");
    $("#e").css("color","#b30909");
    $("#l").css("color","#fff");
    $("#o").css("color","#b30909");
    $("#d").css("color","#fff");
    $("#y").css("color","#b30909");
},2500);
    
setTimeout(() => {
    $("#m").css("color","#b30909");
    $("#e").css("color","#fff");
    $("#l").css("color","#b30909");
    $("#o").css("color","#fff");
    $("#d").css("color","#b30909");
    $("#y").css("color","#fff");
},2700);

setTimeout(() => {
    $("#caption").animate({"opacity":0},400,() => {
        $("#caption").text("Click here to start").animate({"opacity":1},400);
    });
}, 3000);

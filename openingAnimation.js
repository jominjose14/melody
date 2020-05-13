$(".heading").removeClass("hide");
$(".heading").css("opacity",0).animate({"opacity":1},1500);

$("#seven").css("opacity",0).animate({"opacity":1},200,() => {
    $(".piano > :nth-child(6), .piano > :nth-child(8)").css("opacity",0).animate({"opacity":1},200,() => {
        $(".piano > :nth-child(5), .piano > :nth-child(9)").css("opacity",0).animate({"opacity":1},200,() => {
            $(".piano > :nth-child(4), .piano > :nth-child(10)").css("opacity",0).animate({"opacity":1},200,() => {
                $(".piano > :nth-child(3), .piano > :nth-child(11)").css("opacity",0).animate({"opacity":1},200,() => {
                    $(".piano > :nth-child(2), .piano > :nth-child(12)").css("opacity",0).animate({"opacity":1},200,() => {
                        $(".piano > :nth-child(1), .piano > :nth-child(13)").css("opacity",0).animate({"opacity":1},200);
                    });
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
},1500);
    
setTimeout(() => {
    $("#m").css("color","#b30909");
    $("#e").css("color","#fff");
    $("#l").css("color","#b30909");
    $("#o").css("color","#fff");
    $("#d").css("color","#b30909");
    $("#y").css("color","#fff");
},1600);

setTimeout(() => {
    $("#caption").animate({"opacity":0},400,() => {
        $("#caption").text("Click here to start").animate({"opacity":1},400);
    });
}, 1600);

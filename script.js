var the_number = pick_number(); // not sure why the instructions want to to be assigned in null then assigning it to the return value of pickNumber
var tried = 0;
var level;
var difficulty = {
    "Easy" : 6,
    "Medium" : 4,
    "Hard" : 3
};


function pick_number(){
    return Math.floor((Math.random() * 10) + 1);
}

function make_guess() {
    var the_guess = parseInt($("#guess_input").val());
    console.log(the_number , the_guess);

    if(tried >= 1) {
        $("#difficultyChoice").attr("disabled", "disabled");
    }
    if (the_number === the_guess) {
        $("#response_div").text("You Guessed it!");
        $("#submit").attr("disabled", "disabled");
        $("#statistics").remove();
    }
    if (the_guess > the_number) {
        $("#response_div").text("Too High!");
    } else if (the_guess < the_number) {
        $("#response_div").text("Too Low!");
    } if(isNaN(the_guess)){
        $("#response_div").text("Invalid Input! You Just wasted a turn :(");
    }
    tried++;
    if(tried === difficulty[level]) {
        $("#response_div").text("Game Over!").css("color","red");
        $("#submit").attr("disabled", "disabled");
        $("body").css("background-color","red");
    }
}

function stats() {
    var tryLeft = difficulty[level] - tried;
    var percentWinChance = ((tryLeft / difficulty[level]) * 100).toFixed(2);
    $("#statistics").text(tryLeft + " tries left & " + percentWinChance + " % chance of winning");
}

function getLevel() {
    level = $("#difficultyChoice :selected").text();
}

$(document).ready(function () {
    $("#submit").click(function () {
        getLevel();
        if (tried <= difficulty[level]) {
            make_guess();
            stats();
        } else {
            $("#response_div").text("Please Select Difficulty!").css("color","red");
        }
    })
});
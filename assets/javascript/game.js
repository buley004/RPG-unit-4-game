var heroChosen = false;
var enemyChosen = false;
var heroDiv;
var enemyDiv
var hero;
var heroHp;
var enemyHp;
var enemy;
var heroAp;
var winCount = 0;
var gamePlayed = false;
var alive = true;

//store span here to update hp
var enemyScore;
var heroScore

//write messages with this variable
var message = $("#message");
var messageb = $("#message2");

var fighters = [
    { name: "John", hp: 120, ap: 8, cap: 10, photo: "assets/images/john.jpg" },
    { name: "Paul", hp: 100, ap: 10, cap: 15, photo: "assets/images/paul.jpg" },
    { name: "George", hp: 150, ap: 8, cap: 7, photo: "assets/images/george.jpg" },
    { name: "Ringo", hp: 130, ap: 9, cap: 100, photo: "assets/images/ringo.jpg" }
]


//hide restart button
$("#restart").hide();

heroChosen = false;
enemyChosen = false;

//add content to fighters
for (let i = 0; i < fighters.length; i++) {
    var fighterDiv = $("#" + i);

    //add total hp
    var totalHp = $("<span>");
    totalHp.attr("class", "hp");
    totalHp.attr("id", fighters[i].name + "hp");
    totalHp.text(fighters[i].hp);

    //add image
    var fighterPic = $("<img>");
    fighterPic.attr("class", "fighter-pic");
    fighterPic.attr("src", fighters[i].photo);

    fighterDiv.append(fighterPic);
    fighterDiv.append(totalHp);

}



$(".fighter").on("click", function () {

    //move selected character to the hero div if none chosen yet
    if (heroChosen === false) {
        heroDiv = this;
        $("#you").append(heroDiv);
        heroChosen = true;
        $(this).attr("data-hero", true);
        hero = fighters[$(this).attr("id")];
        heroAp = hero.ap;
        heroHp = hero.hp;
        heroScore = $("#" + hero.name + "hp");

        //change background color
        $(heroDiv).css({ "background-color": "#5E7C53", "color": "white", "border-color": "#0c8191" });
        $("#character-bank>div").css({ "background-color": "#8C5452", "border-color": "#E1C96C", "color": "white" });

        //move other characters to enemy bank
        $("#enemy-bank").append($("#character-bank"));

    }
    //move selected enemy to enemy div
    else if (enemyChosen === false && $(this).data("hero") == false) {
        enemyDiv = this;
        $("#enemy").append(enemyDiv);
        enemyChosen = true;
        enemy = fighters[$(this).attr("id")];
        enemyScore = $("#" + enemy.name + "hp");
        enemyHp = enemy.hp;

        //change background color
        $(enemyDiv).css({ "background-color": "#E1C96C", "border-color": "#8C5452", "color": "black" });

        //clear message text
        message.text("");
    };

    console.log(enemyScore);
});

//attack button
$("#attack").on("click", function () {
    if (enemyChosen && heroChosen && alive) {
        //reduce enemy's hp
        enemyHp -= heroAp;
        enemyScore.text(enemyHp);

        //check if enemy hp is <=0
        if (enemyHp <= 0) {
            winCount++;
            $(enemyDiv).hide();
            //check if all fighters have been defeated
            if (winCount === (fighters.length - 1)) {
                message.text("You won!!!");
                messageb.text("");
                enemyChosen = false;
                $("#restart").show();
                return
            }
            message.text("You defeated " + enemy.name + "! Choose another enemy.");
            messageb.text("");
            enemyChosen = false;
            return
        }

        //reduce hero's hp
        heroHp -= enemy.cap;
        heroScore.text(heroHp);

        if (heroHp > 0) {
        
        //display message with attacks
        message.text("You attacked " + enemy.name + " for " + heroAp + " damage.");
        messageb.text(enemy.name + " counter-attacked for " + enemy.cap + " damage.");

        //increase hero's attack power
        heroAp += hero.ap;
        }
        else {
            message.text("You have been defeated!");
            messageb.text("");
            alive = false;
            $("#restart").show();
        }
    }
    else if (winCount < (fighters.length -1) && alive) {
        message.text("No enemy to fight!");
    }
});

//reset button
$("#restart").on("click", function () {
    heroChosen = false;
    winCount = 0;
    
    //move fighters to selection div
    for (let i = 0; i < fighters.length; i++) {
        var fighterDiv = $("#" + i);
        $(fighterDiv).show();
        $("#character-bank").append(fighterDiv); 
        
        fighterDiv.data("hero", false);
        
        //reset hp
        $("#" + fighters[i].name + "hp").text(fighters[i].hp);
    }
    $("#select-char").append($("#character-bank"));

    //hide messages and restart button
    message.text("");
    messageb.text("");
    $("#restart").hide();
    //location.reload();
});
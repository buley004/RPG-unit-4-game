var heroChosen = false;
var enemyChosen = false;
var heroDiv;
var hero;
var enemy;
var heroHp;
var enemyHp;

var fighters = [
    { name: "John Lennon", hp: 120, ap: 8, cap: 10, photo: "assets/images/john.jpg" },
    { name: "Paul McCartney", hp: 100, ap: 10, cap: 15, photo: "assets/images/paul.jpg" },
    { name: "George Harrison", hp: 150, ap: 8, cap: 7, photo: "assets/images/george.jpg" },
    { name: "Ringo Starr", hp: 130, ap: 9, cap: 8, photo: "assets/images/ringo.jpg" }
]

$("#1").attr("data-stats", fighters[1]); 


$(".fighter").on("click", function () {

    //move selected character to the hero div if none chosen yet
    if (heroChosen === false) {
        heroDiv = this;
        $("#you").append(this);
        heroChosen = true;
        $(this).attr("data-hero", true);
        hero = fighters[$(this).attr("id")];
        console.log(hero);
        console.log(hero.hp + " " + hero.name);
        

        //move other characters to enemy bank
        $("#enemy-bank").append($("#character-bank"));
    }
    //move selected enemy to enemy div
    else if (enemyChosen === false && $(this).data("hero") == false) {
        $("#enemy").append(this);
        enemyChosen = true;
    }
});
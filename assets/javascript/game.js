var heroChosen = false;
var enemyChosen = false;
var heroDiv;
var enemyDiv
var hero;
var heroHp;
var enemyHp;
var enemy;
var heroAp;

//store span here to update hp
var enemyScore;
var heroScore

//write messages with this variable
var message = $("#message");

var fighters = [
    { name: "john", hp: 120, ap: 8, cap: 10, photo: "assets/images/john.jpg" },
    { name: "paul", hp: 100, ap: 10, cap: 15, photo: "assets/images/paul.jpg" },
    { name: "george", hp: 150, ap: 8, cap: 7, photo: "assets/images/george.jpg" },
    { name: "ringo", hp: 130, ap: 9, cap: 8, photo: "assets/images/ringo.jpg" }
]

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
    };

    console.log(enemyScore);
});

//attack button
$("#attack").on("click", function(){
    if(enemyChosen && heroChosen){
        //reduce enemy's hp
        enemyHp -= heroAp; 
        enemyScore.text(enemyHp);

        //check if enemy hp is <=0
        if (enemyHp <= 0) {
            $(enemyDiv).hide();
            message.text("You defeated ");
            enemyChosen = false; 
        }
        
        //reduce hero's hp
        heroHp -= enemy.cap;
        console.log(heroHp);
        console.log(hero.hp);
        heroScore.text(heroHp);
        
        //increase hero's attack power
        heroAp += hero.ap; 
    }
    else {
        message.text("No enemy to fight!");
    }
});
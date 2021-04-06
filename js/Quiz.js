class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    question.hide();

    background("yellow");

    var heading = createElement('h1'); 
    heading.html("Result of the quiz" );
    heading.position(300, 0);

    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("*Note: Contestant who answered correctly are highlighted in green colour!",130,220);
    }
    var display_position=260;
    for(var plr in allContestants){
      
      display_position+=20;

      var correctAns="2";
      if(correctAns === allContestants[plr].answer){
        fill("green");
        text(allContestants[plr].name + " : " + allContestants[plr].answer,135,display_position);
      }

      else{
        fill("red");
        text(allContestants[plr].name + " : " + allContestants[plr].answer,135,display_position);
      }
    }
  }

}

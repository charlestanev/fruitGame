var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

$(function () {

  //click on start reset button
  $("#startReset").click(function () {

    //we are playing
    if (playing == true) {
      //reload page
      location.reload();
    } else {

      //we are not playing
      playing = true;

      score = 0; //set score to 0
      $("#scoreValue").html(score);

      //show trial left
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts();

      //hide game over box
      $("#gameOver").hide();

      //change button to reset game
      $("#startReset").html("Reset Game");

      //start sending fruits
      startAction();
    }
  });

  $("#fruit1").mouseover(function () {
    score++;
    $("#scoreValue").html(score); //update score
    // document.getElementById("sliceSound").play();
    $("#sliceSound")[0].play(); //play sound

    //stop fruit
    clearInterval(action);

    //hide fruit  
    $("#fruit1").hide("explode", 500); //slice fruit

    //send new fruit
    setTimeout(startAction, 600);
  });

  //functions

  function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
  }

  //start sending fruits
  function startAction() {

    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({
      'left': Math.round(500 * Math.random()),
      'top': -50
    });

    //generate a radom step
    step = 1 + Math.round(5 * Math.random()); //change step

    //move fruit down by one step every 10ms
    action = setInterval(function () {
      //move fruit by one step
      $("#fruit1").css('top', $("#fruit1").position().top + step);

      //check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitContainer").height()) {
        //check if we have trials left
        if (trialsLeft > 1) {
          //generate a fruit
          $("#fruit1").show();
          chooseFruit(); //choose a random fruit
          $("#fruit1").css({
            'left': Math.round(500 * Math.random()),
            'top': -50
          });

          //generate a radom step
          step = 1 + Math.round(5 * Math.random()); //change step

          //reduce trials by one
          trialsLeft--;

          //populate trialsLeft box
          addHearts();

        } else { //game over
          playing = false;
          $("#startReset").html("Start Game"); //change button to start game
          $("#gameOver").show();
          $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  //generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
  }

  //stop dropping fruits
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }

});
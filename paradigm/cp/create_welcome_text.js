

function create_welcome_text (){

  welcome_timeline = [];

  /*Present welcome text*/
  var welcome_text = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>Welcome to our experiment and thanks for accepting our HIT! In the next page, we kindly ask you to give your consent to your participation in this study. Afterwards, you will read the instructions of the game you will play with another participant. At the end of the instructions, you will be assigned one of two roles and will play with the other participant who has been assigned the opposite role.</p>"+
    "<p><strong>IMPORTANT:</strong> if you know you cannot complete this HIT <strong>right now</strong>, please do not proceed and close it now. This will allow other participants to join and will allow you to play this game later on in a future batch from our lab, as we will run many batches of this type in the coming months. On the contrary, if you decide to proceed to the next page but are not able to complete this HIT, you won't have another opportunity to complete it.</p>"+
    "<p>Press C to continue or close the browser to exit.</p>",
    choices: continue_key,
    data : {trial: 'start', task: 'welcome'},
    on_finish: function(data){
      data.key_resp = data.response;
      data.response = 999;
      check_exclusion();
    }
  }
  welcome_timeline.push(welcome_text);

  return welcome_timeline
}  
  
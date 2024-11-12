function instructions_cpd(){

  var instr_timeline=[];

  var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function (){
      message = "<p>Thanks again for participating in our experiment! Please be aware that for technical reasons we have set a time limit to these instructions. This will allow us to reduce the waiting period for the other participants and successfully connect you with them at the end of the instructions.</p>"
      message += "<p>On each page you have a <strong>maximum time of 1 minute</strong>. Afterwards, we will move on to the next page. Please read the instructions carefully and try to proceed as soon as you are ready.</p>"
      message += "<p>You do not have to rush to the next page. If you stay focused and do not take breaks, the allotted time should be enough.</p>"
      message += "<p>Press C to continue.</p>";
      return message},
        trial_duration : dur_instr,
    choices: continue_key,
    post_trial_gap: 250,
    data : {trial: 'instructions_cpd', task: 'assignment'},
    on_finish(data){
      data.key_resp = data.response;
      data.response = 999;
    }
    }
    instr_timeline.push(instructions);


    var instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function (){
        message = "<p>In this experiment, you will be paired with another participant on Prolific and play a decision-making game with the partner.</p>"
        message += "<div><img src='./stimulus/instructions/cpd1.jpg'></img></div>"
        message += "<p>Press C to continue.</p>";
        return message},
          trial_duration : dur_instr,
      choices: continue_key,
      post_trial_gap: 250,
      data : {trial: 'instructions_cpd', task: 'assignment'},
      on_finish(data){
        data.key_resp = data.response;
        data.response = 999;
      }
      }
      instr_timeline.push(instructions);


      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function (){
          message = "<p>You and your partner each decide how many points they would like to send to their partner. Importantly, each point they sent will be doubled before it is given to their partner.</p>"
          message += "<p>In the following example, they both send 5 points.</p>"
          message += "<div><img src='./stimulus/instructions/cpd2.jpg'></img></div>"
          message += "<p>Press C to continue.</p>";
          return message},
            trial_duration : dur_instr,
        choices: continue_key,
        post_trial_gap: 250,
        data : {trial: 'instructions_cpd', task: 'assignment'},
        on_finish(data){
          data.key_resp = data.response;
          data.response = 999;
        }
        }
        instr_timeline.push(instructions);


        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: function (){
            message = "<p>In this example, since they both sent 5 points, they both end up with 15 points</p>"
            message += "<div><img src='./stimulus/instructions/cpd3.jpg'></img></div>"
            message += "<p>Press C to continue.</p>";
            return message},
              trial_duration : dur_instr,
          choices: continue_key,
          post_trial_gap: 250,
          data : {trial: 'instructions_cpd', task: 'assignment'},
          on_finish(data){
            data.key_resp = data.response;
            data.response = 999;
          }
          }
          instr_timeline.push(instructions);


          var instructions = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function (){
              message = "<p>You will be asked to play the decision-making game with several different participants.</p>"
              message += "<p>In each game, please carefully check whom you are paired with</p>"
              message += "<p>Every time you will collect points that will be added to your account.</p>"
              message += "<p>The total number of points you have collected during the game will be converted into real pounds and will be paid to you at the end of the experiment in the form of an additional bonus.</p>"
              message += "<p>Press C to continue.</p>";
              return message},
                trial_duration : dur_instr,
            choices: continue_key,
            post_trial_gap: 250,
            data : {trial: 'instructions_cpd', task: 'assignment'},
            on_finish(data){
              data.key_resp = data.response;
              data.response = 999;
            }
            }
            instr_timeline.push(instructions);

    
      return instr_timeline
    }
    

    
  
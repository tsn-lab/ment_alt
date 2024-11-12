



function general_instructions(){

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
    data : {trial: 'general_instructions', task: 'assignment'},
    on_finish(data){
      data.key_resp = data.response;
      data.response = 999;
    }
    }
    instr_timeline.push(instructions);


    var instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function (){
        message = "<p>In this experiment, you will be randomly assigned to a role and play a decision-making game with another participant on Prolific over multiple trials.</p>"
        message += "<p>In this game, you must choose whether you would like to travel to either <strong><font color='blue'>Planet Blue</font></strong> or <strong><font color='red'>Planet Red</font></strong>.</p>"
          message += "<div><img src='./stimulus/instructions/slide01.jpg' style='width:575px'></img></div>"
        message += "<p>Press C to continue.</p>";
        return message},
          trial_duration : dur_instr,
      choices: continue_key,
      post_trial_gap: 250,
      data : {trial: 'general_instructions', task: 'assignment'},
      on_finish(data){
        data.key_resp = data.response;
        data.response = 999;
      }
      }
      instr_timeline.push(instructions);


      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function (){
          message = "<p><strong><font color='blue'>Planet Blue</font></strong> and <strong><font color='red'>Planet Red</font></strong> contain different resources. However, these resources are limited and their allocation depends on yours and your partner's choices.</p>"
          message += "<p>At the beginning of each round, you and your partner will simultaneously choose to travel to either <strong><font color='blue'>Planet Blue</font></strong> or <strong><font color='red'>Planet Red</font></strong>.</p>"
          message += "<p>To do so, use your mouse and click on the planet you would like to travel to.</p>"
          message += "<div><img src='./stimulus/instructions/slide02.jpg' style='width:575px'></img></div>"
          message += "<p>Press C to continue.</p>";
          return message},
            trial_duration : dur_instr,
        choices: continue_key,
        post_trial_gap: 250,
        data : {trial: 'general_instructions', task: 'assignment'},
        on_finish(data){
          data.key_resp = data.response;
          data.response = 999;
        }
        }
        instr_timeline.push(instructions);


        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: function (){
            message = "<p><strong><font color='blue'>Planet Blue</font></strong> has lots of resources. If you both decide to travel to <strong><font color='blue'>Planet Blue</font></strong>, you both receive <strong><font color='green'>5 points</font></strong>.</p>"
            message += "<div><img src='./stimulus/instructions/slide03.jpg' style='width:575px'></img></div>"
            message += "<p>Press C to continue.</p>";
            return message},
              trial_duration : dur_instr,
          choices: continue_key,
          post_trial_gap: 250,
          data : {trial: 'general_instructions', task: 'assignment'},
          on_finish(data){
            data.key_resp = data.response;
            data.response = 999;
          }
          }
          instr_timeline.push(instructions);


          var instructions = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function (){
              message = "<p>However, if only you decide to travel to <strong><font color='blue'>Planet Blue</font></strong> while your partner decides to travel to <strong><font color='red'>Planet Red</font></strong>, you will be able to extract less resources from <strong><font color='blue'>Planet Blue</font></strong> and receive <strong><font color='green'>1 point</font></strong>.</p>"
              message += "<p>On the contrary, your partner will be able to extract all <strong><font color='red'>Planet Red</font></strong>'s resources and receive <strong><font color='green'>8 points</font></strong>.</p>"
              message += "<div><img src='./stimulus/instructions/slide04.jpg' style='width:575px'></img></div>"
              message += "<p>Press C to continue.</p>";
              return message},
                trial_duration : dur_instr,
            choices: continue_key,
            post_trial_gap: 250,
            data : {trial: 'general_instructions', task: 'assignment'},
            on_finish(data){
              data.key_resp = data.response;
              data.response = 999;
            }
            }
            instr_timeline.push(instructions);


          var instructions = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function (){
              message = "<p>Similarly, if you decide to travel to <strong><font color='red'>Planet Red</font></strong> while your partner decides to travel to <strong><font color='blue'>Planet Blue</font></strong>, you will extract all <strong><font color='red'>Planet Red</font></strong>'s resources and receive <strong><font color='green'>8 points</font></strong>.</p>"
              message += "<p>On the contrary, your partner will have to extract <strong><font color='blue'>Planet Blue</font></strong>'s resources by themselves and receive <strong><font color='green'>1 point</font></strong>.</p>"
              message += "<div><img src='./stimulus/instructions/slide05.jpg' style='width:575px'></img></div>"
              message += "<p>Press C to continue.</p>";
              return message},
                trial_duration : dur_instr,
            choices: continue_key,
            post_trial_gap: 250,
            data : {trial: 'general_instructions', task: 'assignment'},
            on_finish(data){
              data.key_resp = data.response;
              data.response = 999;
            }
            }
            instr_timeline.push(instructions);


            var instructions = {
              type: jsPsychHtmlKeyboardResponse,
              stimulus: function (){
                message = "<p>However, if you both decide to travel to <strong><font color='red'>Planet Red</font></strong>, you'll be able to extract less resources for both of you and you both receive <strong><font color='green'>2 points</font></strong>.</p>"
                message += "<div><img src='./stimulus/instructions/slide06.jpg' style='width:575px'></img></div>"
                message += "<p>Press C to continue.</p>";
                return message},
                  trial_duration : dur_instr,
              choices: continue_key,
              post_trial_gap: 250,
              data : {trial: 'general_instructions', task: 'assignment'},
              on_finish(data){
                data.key_resp = data.response;
                data.response = 999;
              }
              }
              instr_timeline.push(instructions);


              var instructions = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: function (){
                  message = "<p>To recap:</p>"
                  message += "<p>You will get <strong><font color='green'>5 points</font></strong> if you travel to <strong><font color='blue'>Planet Blue</font></strong> together with your partner.</p>"
                  message += "<p>You will get <strong><font color='green'>1 point</font></strong> if you travel to <strong><font color='blue'>Planet Blue</font></strong> alone.</p>"
                  message += "<p>You will get <strong><font color='green'>8 points</font></strong> if you travel to <strong><font color='red'>Planet Red</font></strong> alone.</p>"
                  message += "<p>You will get <strong><font color='green'>2 points</font></strong> if you travel to <strong><font color='red'>Planet Red</font></strong> together with your partner.</p>"
                  message += "<p>Press C to continue.</p>";
                  return message},
                    trial_duration : dur_instr,
                choices: continue_key,
                post_trial_gap: 250,
                data : {trial: 'general_instructions', task: 'assignment'},
                on_finish(data){
                  data.key_resp = data.response;
                  data.response = 999;
                }
                }
                instr_timeline.push(instructions);


                var instructions = {
                  type: jsPsychHtmlKeyboardResponse,
                  stimulus: function (){
                    message = "<p>You and your partner will make this traveling choice multiple times during the game.</p>"
                    message += "<p>Every time you will collect points that will be added to your account.</p>"
                    message += "<p>The total number of points you have collected during the game will be converted into real pounds and will be paid to you at the end of the experiment in the form of an additional bonus.</p>"
                    message += "<p>You can win an additional bonus of up to <strong><font color='green'>&pound;2</font></strong>.</p>"
                    message += "<p>Please try to stay focussed during the game and not to take breaks to avoid that your participant waits too long for you to make a choice.</p>"
                    message += "<p>Press C to continue.</p>";
                    return message},
                      trial_duration : dur_instr,
                  choices: continue_key,
                  post_trial_gap: 250,
                  data : {trial: 'general_instructions', task: 'assignment'},
                  on_finish(data){
                    data.key_resp = data.response;
                    data.response = 999;
                  }
                  }
                  instr_timeline.push(instructions);





    
      return instr_timeline
    }
    

    
  


function instructions_tg(){

  var instr_timeline=[];
    
    var instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function (){
        var role = jsPsych.data.get().select('role').values[0];
        if (role=='1'){var player = 'A'; var player2 = 'B'} else {var player = 'B'; var player2 = 'A'}

        message = "<p>Now, you will play the second game with the other participant.</p>"
        message += "<p>You have been assigned the role of <strong>Player "+player+ "</strong> and the other one will play as <strong>Player "+player2+ "</strong>.</p>"
        message += "<p>Press C to continue.</p>"
        return message},
      trial_duration : dur_instr,
      choices: continue_key,
      post_trial_gap: 250,
      data : {trial: 'general_instructions_tg', task: 'assignment'},
      on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;
      }
      }
      instr_timeline.push(instructions);
    
      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>At the beginning of each trial, Player A will receive an endowment of <strong>10 points</strong>.</p>"+
        "<div style='float: center; width: 100%;'><img src='./stimulus/instructions/tg/slide01.jpg' style='width:575px'></img></div>"+
        "<p>Player A will need to decide whether to keep or share any of this amount with Player B.</p>"+
        "<p>Player A can hence decide to keep the whole amount by choosing to share nothing or share any sum between 1 and 10 points with Player B.</p>"+
        "<p>Press C to continue.</p>",
        trial_duration : dur_instr,
        choices: continue_key,
        post_trial_gap: 250,
        data : {trial: 'general_instructions_tg', task: 'assignment'},
        on_finish: function(data){
          data.key_resp = data.response;
          data.response = 999;
        }
      }
      instr_timeline.push(instructions);


      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function (){
          var role = jsPsych.data.get().select('role').values[0];
        if (role=='1'){ player1 = "you, as Player A, decide"; player2 = "Player B"}
        else {player1 = "Player A decides"; player2 = "you"}

          return "<p>If "+player1+" to share any amount, this amount will be tripled by the experimenter and passed on to "+player2+".</p>"+
        "<div style='float: right; width: 100%;'><img src='./stimulus/instructions/tg/slide02.jpg' style='width:575px'></img></div>"+
            "<p>Press C to continue.</p>"},
        trial_duration : dur_instr,
        choices: continue_key,
        post_trial_gap: 250,
        data : {event: 'instruction_tg_trustee', task: 'instructions'},
        on_finish: function(data){
          data.key_resp = data.response;
          data.response = 999;
        }
      }
      
      instr_timeline.push(instructions);


    
var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function(){
    var role = jsPsych.data.get().select('role').values[0];
        if (role=='1'){ player2 = "Player B"; player1 = "you"}
        else {player2 = "you"; player1 = "Player A"}
    
    return "<p>Afterwards, "+player2+" can make a decision: "+player2+" will decide whether to keep or share back any of the tripled amount received.</p>"+
  "<p>Hence, "+player2+" can decide to keep the whole tripled amount by choosing to share nothing or share any sum from 1 to the all points with "+player1+".</p>"+
  "<div style='float: right; width: 100%;'><img src='./stimulus/instructions/tg/slide03.jpg' style='width:575px'></img></div>" +
      "<p>Press C to continue.</p>"},
    trial_duration : dur_instr,
    choices: continue_key,
  post_trial_gap: 250,
  data : {event: 'instruction_tg_trustee', task: 'instructions'},
  on_finish: function(data){
    data.key_resp = data.response;
    data.response = 999;
  }
}

instr_timeline.push(instructions);
    

var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function(){
    var role = jsPsych.data.get().select('role').values[0];
        if (role=='1'){ player1 = "your"; player2 = "Player B's"; player1_2="you decide"; player2_2="Player B decides"}
        else {player1 = "Player A's"; player2 = "your"; player1_2="Player A decides"; player2_2="you decide"}

  return "<p>After "+player2+" decision, both players will receive feedback and see how much they have earned in that trial.</p>"+
  "<p>"+player1+" payoffs consist of what "+player1_2+" to keep and what "+player2_2+" to share back; "+player2+" payoffs consist of what "+player2_2+" to keep from the received tripled amount.</p>"+
      "<p>Press C to continue.</p>"},
      choices: continue_key,
      trial_duration : dur_instr,
  post_trial_gap: 250,
  data : {event: 'instruction_tg_trustee', task: 'instructions'},
  on_finish: function(data){
    data.key_resp = data.response;
    data.response = 999;
  }
}

instr_timeline.push(instructions);
    
      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>This ends the trial and starts a new trial. At the beginning of every new trial, Player A will receive a new endowment of 10 points and the procedure will repeat for each trial.</p>"+
        "<p>For your decisions in the game, please click on the button corresponding to the amount you would like to share (see below an example).</p>"+
        "<div style='float: right; width: 100%;'><img src='./stimulus/instructions/response_bar.jpg'></img></div>" +
        "<p><strong>The amount that you earn in every trial will be added to your account</strong>. At the end of the experiment, the whole amount you earned across trials will be translated into real pounds.</p>"+
        "<p> The points will be converted to real pounds at the rate of <strong>a cent for every point</strong> you earn.</p>"+
            "<p>Press C to continue.</p>",
        trial_duration : dur_instr,
        choices: continue_key,
        post_trial_gap: 250,
        data : {trial: 'general_instructions_tg', task: 'assignment'},
        on_finish: function(data){
          data.key_resp = data.response;
          data.response = 999;
        }
      }
      instr_timeline.push(instructions);
    
      return instr_timeline
    }
    
  
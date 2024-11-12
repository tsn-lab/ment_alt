

function create_role_assignment(){
  
var wait_timeline = [];
  
var wait_load = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : function (){message="<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
  "<div style='width: 100%;'><img src='./stimulus/loading.gif'></img>"
    var type_game = jsPsych.data.get().select('tot_players').values[0];
  if (type_game==1){
    var role_pl = String(Math.round(Math.random()));
    jsPsych.data.addProperties({role: role_pl});}
  return message},
  choices : "NO_KEYS",
  prompt: "<p>Please wait.</p><p>We are assigning you a role and connecting you with another participant.</p>",
  trial_duration : 5000,
    data : {trial: 'assignment_start', task: 'assignment', event_duration: 5000}
}
wait_timeline.push(wait_load);

var be_patient_msg = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : "<p>Please, be patient.</p>",
  choices : "NO_KEYS",
  trial_duration : fb_dur,
  data : {trial: 'assignment_start', task: 'assignment', event_duration: fb_dur}
}
wait_timeline.push(be_patient_msg);

var wait_load2 = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : function (){message="<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
  "<div style='width: 100%;'><img src='./stimulus/loading.gif'></img>"
  return message},
  choices : "NO_KEYS",
  prompt: "<p>We are almost done!</p><p>Please be ready!</p>",
  trial_duration : 5000,
    data : {trial: 'assignment_start', task: 'assignment', event_duration: 5000}
}
wait_timeline.push(wait_load2);


var start_message = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p>You have now been paired with another participant to make multiple space travel choices.</p>"+
          "<p>Remember, you and your partner will simultaneously choose which planet each of you wants to travel to.</p>" +
          "<p>At the end of each trial, you will see what you and your partner have chosen and how many resources you have gathered.</p>" +
        "<p>Press C to start.</p>",
  choices: continue_key,
  trial_duration : dur_instr,
  post_trial_gap: 250,
  data :  {trial: 'instructions_role', task: 'instructions'},
  on_finish: function(data){
  data.key_resp = data.response;
  data.response = 999;}
}
wait_timeline.push(start_message);

for (var i=0;i<3;i++){
  var count_down = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : "<p>We are ready!</p><p>You will start in "+String(3-i)+ ".</p>",
  choices : "NO_KEYS",
  trial_duration : 1000,
    data : {event: 'count_down', event_duration: 1000, alpha:1.5,  beta:1.5, alpha_mover1:20,  beta_mover1:10, alpha_mover2:20,  beta_mover2:10}
}
wait_timeline.push(count_down);
}

return wait_timeline
}

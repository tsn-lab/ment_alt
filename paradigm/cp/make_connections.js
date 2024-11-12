

function make_connection(){
    var wait_timeline = [];

    for (var i=0;i<1;i++){
    var game_start = {
    type : jsPsychHtmlKeyboardResponse,
    stimulus : function (){message="<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
    "<div style='width: 100%;'><img src='./stimulus/loading.gif'></img>";
    //get_responses();
    return message},
    choices : "NO_KEYS",
    prompt: "<p>Please wait until your coplayer makes a decision.</p>",
    trial_duration : wait_for_start,
      data : {trial: 'waiting', task: 'cpd', event_duration: wait_for_start, index_cpd: jsPsych.data.get().select('cur_trial_dec').values[0]}
}

wait_timeline.push(game_start);
}

return wait_timeline
}


function make_connection_ug(){
  var wait_timeline = [];

  for (var i=0;i<1;i++){
  var game_start = {
  type : jsPsychHtmlKeyboardResponse,
  stimulus : function (){message="<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
  "<div style='width: 100%;'><img src='./stimulus/loading.gif'></img>";
  //get_responses();
  return message},
  choices : "NO_KEYS",
  prompt: "<p>Please wait until your coplayer makes a decision.</p>",
  trial_duration : wait_for_start,
    data : {trial: 'waiting', task: 'tg', event_duration: wait_for_start, index_tg: jsPsych.data.get().select('cur_trial_dec').values[0]}
}

wait_timeline.push(game_start);
}

return wait_timeline
}

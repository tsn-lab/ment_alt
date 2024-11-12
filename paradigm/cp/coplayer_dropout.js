


function coplayer_dropout(){

    timeline_dropout=[];

    var dropout_message = {
        type: jsPsychHtmlKeyboardResponse,
        choices: continue_key,
        stimulus: "<p>We are very sorry but it seems like your coplayer dropped out. But no worries, you will be paid for your work anyhow. Please fill in the following questionnaires and submit your work with your personal code, so we can bonus you. Press C to continue.</p>",
        data: {trial: 'coplayer_dropout', task: 'dropout_message'},
    }
    timeline_dropout.push(dropout_message);


    var droupout_questionnaires = {
        timeline: create_questionnaires()
      };
    timeline_dropout.push(droupout_questionnaires);


    var thanks_dropout_message = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function (){
            message = "<p>Thank you for your participation! This experiment is now over. Please press the space bar to receive your personal code.</p>";
            saveDataToDb();
            return message;
        },
        trial_duration: dur_instr,
        data: {trial: 'thanks_msg', task: 'thanks_message', experiment_completed: 2}
    };
    timeline_dropout.push(thanks_dropout_message);


    var dropout_code = {
        type: jsPsychHtmlKeyboardResponse,
        choices: end_key,
        stimulus: "<p>Your personal code is <strong>" + subjnum + "</strong>. Thank you again for your participation! Now you can close the browser.</p>",
    }
    timeline_dropout.push(dropout_code);


    return timeline_dropout
}

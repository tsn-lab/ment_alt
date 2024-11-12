
function create_quiz_instructions() {

    var timeline_quiz_test = [];
    var corr_key = ['C','B','D','C'];

    var instruct_quiz = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>Now, to make sure you've understood the instructions of the game well, you will be tested on them. You will be able to play the game with the other participant ONLY if you get AT LEAST <strong>3 out of 4</strong> answers correct.</p>" +
            "<p>Press the space bar to proceed.</p>",
        choices: [" "],
        trial_duration: dur_instr,
        post_trial_gap: 100,
        data: { trial: 'quiz_instructions', task: 'quiz' },
        on_finish(data){
          data.key_resp = data.response;
          data.response = 999;
        }
    }


    var quest_num1 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>How many points do you earn if both you and your partner send 5 points to each other?</p>" + "<p>Press one of the corresponding letters</p>" +
            "<p><strong>A)</strong>   You receive 0 points</p>" +
            "<p><strong>B)</strong>   You receive 10 points</p>" +
            "<p><strong>C)</strong>   You receive 15 points</p>" +
            "<p><strong>D)</strong>   You receive 20 points</p>",
        choices: ['A', 'B', 'C', 'D'],
        trial_duration: dur_instr,
        data: { trial: 'quiz_question', task: 'quiz', question_count: 1 },

        on_finish: function (data) {
            if (jsPsych.pluginAPI.compareKeys(data.response, corr_key[0])) {
                data.quiz_test_correct = 1; data.quiz_test_performance = 1;
            } else { data.quiz_test_incorrect = 1; data.quiz_test_performance = 0; }
            data.key_resp = data.response;
            data.response = 999;
        }
    }


    var quest_num2 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>How many points do you earn if both you and your partner send 0 points to each other?</p>" + "<p>Press one of the corresponding letters</p>" +
            "<p><strong>A)</strong>   You receive 0 point</p>" +
            "<p><strong>B)</strong>   You receive 10 points</p>" +
            "<p><strong>C)</strong>   You receive 15 points</p>" +
            "<p><strong>D)</strong>   You receive 20 points</p>",
        choices: ['A', 'B', 'C', 'D'],
        trial_duration: dur_instr,
        data: { trial: 'quiz_question', task: 'quiz', question_count: 1 },

        on_finish: function (data) {
            if (jsPsych.pluginAPI.compareKeys(data.response, corr_key[1])) {
                data.quiz_test_correct = 1; data.quiz_test_performance = 1;
            } else { data.quiz_test_incorrect = 1; data.quiz_test_performance = 0; }
            data.key_resp = data.response;
            data.response = 999;            
        }
    }


    var quest_num3 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>How many points do you earn if both you and your partner send 10 points to each other?</p>" + "<p>Press one of the corresponding letters</p>" +
            "<p><strong>A)</strong>   You receive 0 points</p>" +
            "<p><strong>B)</strong>   You receive 10 points</p>" +
            "<p><strong>C)</strong>   You receive 15 points</p>" +
            "<p><strong>D)</strong>   You receive 20 point</p>",
        choices: ['A', 'B', 'C', 'D'],
        trial_duration: dur_instr,
        data: { trial: 'quiz_question', task: 'quiz', question_count: 1 },

        on_finish: function (data) {
            if (jsPsych.pluginAPI.compareKeys(data.response, corr_key[2])) {
                data.quiz_test_correct = 1; data.quiz_test_performance = 1;
            } else { data.quiz_test_incorrect = 1; data.quiz_test_performance = 0; }
            data.key_resp = data.response;
            data.response = 999;
        }
    }


    var quest_num4 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>How many points do you earn if you send 0 points but your partner sends you 10 points?</p>" + "<p>Press one of the corresponding letters</p>" +
            "<p><strong>A)</strong>   You receive 10 points</p>" +
            "<p><strong>B)</strong>   You receive 20 points</p>" +
            "<p><strong>C)</strong>   You receive 30 points</p>" +
            "<p><strong>D)</strong>   You receive 40 point</p>",
        choices: ['A', 'B', 'C', 'D'],
        trial_duration: dur_instr,
        data: { trial: 'quiz_question', task: 'quiz', question_count: 1 },

        on_finish: function (data) {
            if (jsPsych.pluginAPI.compareKeys(data.response, corr_key[3])) {
                data.quiz_test_correct = 1; data.quiz_test_performance = 1;
            } else { data.quiz_test_incorrect = 1; data.quiz_test_performance = 0; }
            data.key_resp = data.response;
            data.response = 999;
        }
    }

    timeline_quiz_test.push(instruct_quiz);
    timeline_quiz_test.push(quest_num1);
    timeline_quiz_test.push(quest_num2);
    timeline_quiz_test.push(quest_num3);
    timeline_quiz_test.push(quest_num4);


    return timeline_quiz_test

}


function create_show_quiz_mistakes() {

    var timeline_quiz_mistakes = [];

    error_quiz1 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>Your answer on the following question was <font color='red'>incorrect</font>:</p>" +
		"<p>How many points do you earn if both you and your partner send 5 points to each other?</p>"  +
		"<p>The correct answer was <strong>C</strong>. You receive <strong>15 points</strong>.</p>" + 
		"<p>Remember, your final earning is: (the amount of points you keep for yourself) + (the doubled amount of points your partner sends)</p>" +
        "<p>Press the space bar to proceed.</p>",
        trial_duration: dur_instr,
        data: { trial: 'quiz_question_mistaken1', task: 'quiz_mistakes' },
        on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;}
    }

    var pres_error_quiz1 = {
        timeline: [error_quiz1],

        conditional_function: function () {
            resp = jsPsych.data.get().select('quiz_test_performance').values;
            if (resp[0] == 0) { return true; } else { return false; }
        }
    }

    timeline_quiz_mistakes.push(pres_error_quiz1);

    var error_quiz2 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>Your answer on the following question was <font color='red'>incorrect</font>:</p>"+
        "<p>How many points do you earn if both you and your partner send 0 points to each other?</p>" + 
        "<p>The correct answer was <strong>B</strong>. You receive <strong>10 points</strong>.</p>" +
		"<p>Remember, your final earning is: (the amount of points you keep for yourself) + (the doubled amount of points your partner sends)</p>" +
        "<p>Press the space bar to proceed.</p>",
        trial_duration: dur_instr,
        data: { trial: 'quiz_question_mistaken2', task: 'quiz_mistakes' },
        on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;}
    }

    var pres_error_quiz2 = {
        timeline: [error_quiz2],

        conditional_function: function () {
            resp = jsPsych.data.get().select('quiz_test_performance').values;
            if (resp[1] == 0) { return true; } else { return false; }
        }
    }

    timeline_quiz_mistakes.push(pres_error_quiz2);

    var error_quiz3 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>Your answer on the following question was <font color='red'>incorrect</font>:</p>"+
        "<p>How many points do you earn if both you and your partner send 10 points to each other?</p>" + 
        "<p>The correct answer was <strong>D</strong>. You receive <strong>20 points</strong>.</p>" +
		"<p>Remember, your final earning is: (the amount of points you keep for yourself) + (the doubled amount of points your partner sends)</p>" +
        "<p>Press the space bar to proceed.</p>",
        trial_duration: dur_instr,
        data: { trial: 'quiz_question_mistaken3', task: 'quiz_mistakes' },
        on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;}
    }

    var pres_error_quiz3 = {
        timeline: [error_quiz3],

        conditional_function: function () {
            resp = jsPsych.data.get().select('quiz_test_performance').values;
            if (resp[2] == 0) { return true; } else { return false; }
        }
    }

    timeline_quiz_mistakes.push(pres_error_quiz3);


    var error_quiz4 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>Your answer on the following question was <font color='red'>incorrect</font>:</p>"+
        "<p>How many points do you earn if you send 0 points but your partner sends you 10 points?</p>" + 
        "<p>The correct answer was <strong>C</strong>. You receive <strong>30 points</strong>.</p>" +
		"<p>Remember, your final earning is: (the amount of points you keep for yourself) + (the doubled amount of points your partner sends)</p>" +
        "<p>Press the space bar to proceed.</p>",
        trial_duration: dur_instr,
        data: { trial: 'quiz_question_mistaken4', task: 'quiz_mistakes' },
        on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;}
    }
    var pres_error_quiz4 = {
        timeline: [error_quiz4],

        conditional_function: function () {
            resp = jsPsych.data.get().select('quiz_test_performance').values;
            if (resp[3] == 0) { return true; } else { return false; }
        }
    }

    timeline_quiz_mistakes.push(pres_error_quiz4);


    var message_game_start = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>You passed the test and can hence start the game shortly. We will now connect you with the other participant.</p><p>Please be patient.</p>",
        trial_duration: wait_for_start*5,
        choices : "NO_KEYS",
        data: {trial: 'game_start_message', event_duration: wait_for_start*5, task: 'quiz_mistakes'}
    }
    var message_game_start_pres = {
        timeline: [message_game_start],
        conditional_function: function(){
            return check_test()},
        on_finish: function (){
            return saveDataToDb_summary()}
    }
    timeline_quiz_mistakes.push(message_game_start_pres);

    var message_game_end = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>Unfortunately, you did not pass the test.</p>",
        trial_duration: wait_for_start*5,
        choices : "NO_KEYS",
        data: { trial: 'game_end_message', event_duration: wait_for_start*5, task: 'quiz_mistakes'}
    }
    var message_game_end_pres = {
        timeline: [message_game_end],
        conditional_function: function(){
            if (check_test()){return false}
            else {return true}},
        on_finish: function (){
            return saveDataToDb_summary()}
    }
    timeline_quiz_mistakes.push(message_game_end_pres);

    return timeline_quiz_mistakes
}

    
// plugin for UCLA Loneliness, state loneliness, social craving, Locus of Control Scale, HEXACO Personality Scale and demographics 

function UCLA_scale(quest_n){

  var trait_lone_time = [];

  var options_UCLA = ["Often", "Sometimes", "Rarely", "Never"];
    
  var UCLA_questions = ["How often do you feel that you are 'in tune' with the people around you?",
    "How often do you feel that you lack companionship?",
    "How often do you feel that there is no one you can turn to?",
    "How often do you feel alone?",
    "How often do you feel part of a group of friends?",
    "How often do you feel that you have a lot in common with the people around you?",
    "How often do you feel that you are no longer close to anyone?",
    "How often do you feel that your interests and ideas are not shared by those around you?",
    "How often do you feel outgoing and friendly?",
    "How often do you feel close to people?",
    "How often do you feel left out?",
    "How often do you feel that your relationships with others are not meaningful?",
    "How often do you feel that no one really knows you well?",
    "How often do you feel isolated from others?",
    "How often do you feel you can find companionship when you want it?",
    "How often do you feel that there are people who really understand you?",
    "How often do you feel shy?",
    "How often do you feel that people are around you but not with you?",
    "How often do you feel that there are people you can talk to?",
    "How often do you feel that there are people you can turn to?"]

    npages = 4;
    ends = [UCLA_questions.length/npages, 2* (UCLA_questions.length/npages),3* (UCLA_questions.length/npages), UCLA_questions.length];
    testpage1 = [];
    for(var q=0; q<ends[0];q++){
      testpage1.push({prompt: "<p>" + UCLA_questions[q] + "</p>", labels: options_UCLA, required:true});
    }
    testpage2 = [];
      for(var q=ends[0]; q<ends[1]; q++){
        testpage2.push({prompt: "<p>" + UCLA_questions[q] + "</p>", labels: options_UCLA, required:true});
    }
    testpage3 = [];
      for(var q=ends[1]; q<ends[2]; q++){
        testpage3.push({prompt: "<p>" + UCLA_questions[q] + "</p>", labels: options_UCLA, required:true});
    }
    testpage4 = [];
      for(var q=ends[2]; q<ends[3]; q++){
        testpage4.push({prompt: "<p>" + UCLA_questions[q] + "</p>", labels: options_UCLA, required:true});
    }

    // create the 4 pages with questions in likert style 
    instructions = "<p style='font-size:25px'>For each question, please say how often you feel that way.</p>"

    var pres_instr = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "<p>"+quest_n+"</p>"+
      "<p>The next questions are about relationships with others. For each one, please say how often you feel that way.</p>"+
      "<p>Please press the space bar</p>",
      choices : " ",
      trial_duration : dur_instr,
      data : {trial: 'UCLA_instructions', task:'UCLA'},
      on_finish: function(data){
        data.key_resp = data.response;
          data.response = 999;
      }
    }

    var UCLA1 = {
      timeline: [{
        type: jsPsychSurveyLikert,
        questions: testpage1,
        preamble: instructions,
        scale_width: 900,
        data: {trial: 'UCLA_items1', task:'UCLA'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'UCLA_items1'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          data.key_resp = data.response;
          data.response = 999;
          /*for(i=0;i<resp.length;i++){
            long_string += String(resp[i]);
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');*/
          //saveDataToDb_trial();
        }
      }
      var UCLA2 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: testpage2,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'UCLA_items2', task:'UCLA'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'UCLA_items2'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          data.key_resp = data.response;
          data.response = 999;
          //saveDataToDb_trial();
        }
      }
      var UCLA3 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: testpage3,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'UCLA_items3', task:'UCLA'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'UCLA_items3'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          data.key_resp = data.response;
          data.response = 999;
          //saveDataToDb_trial();
        }
      }
      var UCLA4 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: testpage4,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'UCLA_items4', task:'UCLA'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'UCLA_items4'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          data.key_resp = data.response;
          data.response = 999;
          //saveDataToDb_trial();
        }
      }

  trait_lone_time.push(pres_instr);
  trait_lone_time.push(UCLA1);
  trait_lone_time.push(UCLA2);
  trait_lone_time.push(UCLA3);
  trait_lone_time.push(UCLA4);

  return trait_lone_time
  
};




function SN_scale(quest_n){

  var sn = [];

  var options_SN = ["Extremely uncharacteristic", "Somewhat uncharacteristic", "Uncertain", "Somewhat characteristic", "Extremely characteristic"];
    
  var SN_questions = ["I go out of my way to follow social norms.",
"We shouldn't always have to follow a set of social rules.",
"People should always be able to behave as they wish rather than trying to fit the norm.",
"There is a correct way to behave in every situation.",
"If more people followed society's rules, the world would be a better place.",
"People need to follow life's unwritten rules every bit as strictly as they follow the written rules.",
"There are lots of vital customs that people should follow as members of society.",
"The standards that society expects us to meet are far too restrictive.",
"People who do what society expects of them lead happier lives.",
"Our society is built on unwritten rules that members need to follow.",
"I am at ease only when everyone around me is adhering to society's norms.",
"We would be happier if we didn't try to follow society's norms.",
"My idea of a perfect world would be one with few social expectations.",
"I always do my best to follow society's rules."]

    npages = 3;
    ends = [6, 11, SN_questions.length];
    testpage1 = [];
    for(var q=0; q<ends[0];q++){
      testpage1.push({prompt: "<p>" + SN_questions[q] + "</p>", labels: options_SN, required:true});
    }
    testpage2 = [];
      for(var q=ends[0]; q<ends[1]; q++){
        testpage2.push({prompt: "<p>" + SN_questions[q] + "</p>", labels: options_SN, required:true});
    }
    testpage3 = [];
      for(var q=ends[1]; q<ends[2]; q++){
        testpage3.push({prompt: "<p>" + SN_questions[q] + "</p>", labels: options_SN, required:true});
    }

    // create the 4 pages with questions in likert style 
    instructions = "<p style='font-size:25px'>Please rate the extent to which these items are characteristic of you or what you believe.</p>"

    var pres_instr = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "<p>"+quest_n+"</p>"+
      "<p>The next questions are about your beliefs. Please rate the extent to which the next items are characteristic of you or what you believe.</p>"+
      "<p>Please press the space bar</p>",
      choices : " ",
      trial_duration : dur_instr,
      data : {trial: 'SN_instructions', task:'SN'},
      on_finish: function(data){
        data.key_resp = data.response;
          data.response = 999;
      }
    }

    var SN1 = {
      timeline: [{
        type: jsPsychSurveyLikert,
        questions: testpage1,
        preamble: instructions,
        scale_width: 900,
        data: {trial: 'SN_items1', task:'social_norms'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'SN_items1'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          data.key_resp = data.response;
          data.response = 999;
          /*for(i=0;i<resp.length;i++){
            long_string += String(resp[i]);
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');*/
          //saveDataToDb_trial();
        }
      }
      var SN2 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: testpage2,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'SN_items2', task:'social_norms'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'SN_items2'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          data.key_resp = data.response;
          data.response = 999;
          //saveDataToDb_trial();
        }
      }
      var SN3 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: testpage3,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'SN_items3', task:'social_norms'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'SN_items3'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          data.key_resp = data.response;
          data.response = 999;
          //saveDataToDb_trial();
        }
      }

  sn.push(pres_instr);
  sn.push(SN1);
  sn.push(SN2);
  sn.push(SN3);

  return sn
  
};



// plugin for state loneliness (3 Item measure adopted to measure state loneliness) and Social Craving Question
function state_loneliness(quest_n){

  var state_lone_time = [];

  var options_state = ["No, not at all", "Somewhat", "Yes, definitely"];
    
  var state_questions = [
      "Right now, do you feel isolated from others?",
      "Right now, do you feel that you lack companionship?",
      "Right now, do you feel left out?"
  ]

  var all_questions = [];
  all_questions = [];
  for(var q=0; q<state_questions.length; q++){
      all_questions.push({prompt: "<p>" + state_questions[q] + "</p>", labels: options_state, required:true});
  }

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>The next questions are about your current situation and feelings.</p>"+
    "<p>Please press the space bar</p>",
    trial_duration : dur_instr,
    choices : " ",
    data : {trial: 'state_loneliness_instructions', task:'state_loneliness'},
    on_finish: function(data){
      data.key_resp = data.response;
        data.response = 999;
    }
  }

  var state = {
      timeline: [{
        type:jsPsychSurveyLikert,
        preamble: "<p style='font-size:25px'>How do you feel right now?</p>",
        questions: all_questions,
        scale_width: 900, 
        data: {trial: 'state_loneliness_items', task:'state_loneliness'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'state_loneliness_items'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }  
  
  state_lone_time.push(pres_instr);
  state_lone_time.push(state);

  return state_lone_time
}

// General Trust
function general_trust(quest_n){

  var gt_time =[];

  var statements = [
    "Most people are basically honest.",
    "Most people are trustworthy.",
    "Most people are basically good and kind.",
    "Most people are trustful of others.",
    "I am trustful.",
    "Most people will respond in kind when they are trusted by others."
  ];

  var options = [
      "Strongly disagree","Disagree","Neutral","Agree","Strongly agree"
  ]

  var all_statements = [];
  all_statements = [];
  for(var q=0; q<statements.length; q++){
      all_statements.push({prompt: "<p>" + statements[q] + "</p>", labels: options, required:true});
  }

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>In the next questions, please indicate how much you agree or disagree with each statement.</p>"+
    "<p>Please press the space bar</p>",
    trial_duration : dur_instr,
    data: {trial: 'general_trust_instructions', task:'general_trust'},
    on_finish: function(data){
      data.key_resp = data.response;
      data.response = 999;
    }
  }

  var gt = {
      timeline: [{
          type: jsPsychSurveyLikert,
          preamble: "<p style='font-size:25px'>Using the following scale, please indicate how much you agree or disagree with the following statements.</p>",
        questions: all_statements,
        scale_width: 900, 
        data: {trial: 'general_trust_items', task:'general_trust'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'general_trust_items'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }

  gt_time.push(pres_instr);
  gt_time.push(gt);

  return gt_time
}


// Social Craving
function social_craving(quest_n){

  var crave_time= [];

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>Please think about the social activities you enjoy doing with other people." + 
    " Think about a <strong>specific</strong> social activity you typically really enjoy" + 
    " (examples might include: conversation with your best friend, dinner with a group of friends," + 
    " a concert with thousands of people dancing, a romantic evening with your partner, playing with your child, etc.)</p>"+
    "<p>When ready, press the space bar.</p>",
    data: {trial: 'social_craving_instructions', task:'social_craving'}
  }

  var craving1 = {
      timeline: [{
          type: jsPsychHtmlSliderResponse,
          stimulus:  "<p>Please indicate with the slider how much do you want to engage in this social activity right now. (0: minimum, 100: maximum)</p>",
          labels: ['0', '100'],
          slider_width: 900,
          require_movement:true,
          data: {trial: 'social_activity_craving', task:'social_craving'}
      }],
      on_finish: function(){
        //saveDataToDb_trial();
      }
  }

  var craving2 = {
    timeline: [{
        type: jsPsychHtmlSliderResponse,
        stimulus:  "<p>Please indicate with the slider how much social contact you lost in the last <strong>2 weeks</strong>. (0: none, 100: all)</p>",
        labels: ['0', '100'],
        slider_width: 900,
        require_movement:true,
        data: {trial: 'social_loss', task:'social_craving'}
    }],
    on_finish: function(){
      //saveDataToDb_trial();
    }
}


var options = ["every day", "more than twice a week", "once or twice a week", "less than once a week", "never"];

  //var standards = {options: options, required:false, horizontal:true};
  var question_list = ["Please indicate how frequent you had contact with people close to you (for example, family, closest friends) in the last <strong>2 weeks</strong>.",
    "Please indicate how frequent you had contact with people you know but who are less close to you (for example, colleagues, acquaintances) in the last <strong>2 weeks</strong>.",
  "Please indicate how frequent you had contact with your neighborhood in the last <strong>2 weeks</strong>."]

    ends = [question_list.length];
    soc_contact = [];
    for(var q=0; q<ends[0]; q++){
      soc_contact.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
    }

var craving3 = {
  timeline: [{
    type: jsPsychSurveyLikert,
    questions: soc_contact,
    scale_width: 900,
    data: {trial: 'social_contact', task:'social_craving'}
  }],
  on_finish: function (data){
    resp = jsPsych.data.get().filter({trial: 'social_contact'}).select('response').values[0];
    long_string = [];
    for (const property in resp) {
      long_string += `${property}`+'_';
      long_string += `${resp[property]}`+'_';
    }
    data.key_resp = data.response;
    data.response = 999;
    data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
    //saveDataToDb_trial();
  }
}

var craving4 = {
  timeline: [{
      type: jsPsychHtmlSliderResponse,
      stimulus:  "<p>Please indicate with the slider how much you feel that the support you get from other people has changed over the last <strong>2 weeks</strong>. (0: not at all, 100: completely)</p>",
      labels: ['0', '100'],
      slider_width: 900,
      require_movement:true,
      data: {trial: 'social_support', task:'social_craving'}
  }],
  on_finish: function(){
    //saveDataToDb_trial();
  }
}

var opts1 = ["I'm not self-isolating", "two weeks or less", "three-four weeks", "five-six weeks", "seven-eight weeks", "nine-ten weeks", "more than ten weeks"];
var opts2 = ["I'm not self-isolating", "two weeks or less", "three-four weeks", "five-six weeks", "seven-eight weeks", "nine-ten weeks", "more than ten weeks"];
  //var standards = {options: options, required:false, horizontal:true};
  var iso_quest = ["Please indicate whether and how long you have been self-isolating (e.g., limiting the time you have contact with others, working from home)",
"Please indicate whether and how long you have been social-distancing (e.g., if you go out, staying approximately 2 meters (6ft) away from others)"];

  var self_isolation = [];
  self_isolation.push({prompt: "<p>" + iso_quest[0] + "</p>", labels: opts1, required:true});
  self_isolation.push({prompt: "<p>" + iso_quest[1] + "</p>", labels: opts2, required:true});

var craving5 = {
  timeline: [{
    type: jsPsychSurveyLikert,
    questions: self_isolation,
    scale_width: 900,
    data: {trial: 'social_isolation', task:'social_craving'}
  }],
  on_finish: function (data){
    resp = jsPsych.data.get().filter({trial: 'social_isolation'}).select('response').values[0];
    long_string = [];
    for (const property in resp) {
      long_string += `${property}`+'_';
      long_string += `${resp[property]}`+'_';
    }
    data.key_resp = data.response;
    data.response = 999;
    data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
    //saveDataToDb_trial();
  }
}

  crave_time.push(pres_instr);
  crave_time.push(craving1);
  crave_time.push(craving2);
  crave_time.push(craving3);
  crave_time.push(craving4);
  crave_time.push(craving5);

return crave_time
}

// Self-Esteem Scale
function ses(quest_n){

  var ses_time = [];

  instructions = "<p style='font-size:25px'>Please indicate how strongly you agree or disagree with each statement.</p>"

  var options = ["strongly disagree", "disagree", "agree","strongly agree"];

  //var standards = {options: options, required:false, horizontal:true};
  var esteem_list = [
      "On the whole, I am satisfied with myself.", 
      "At times I think I am no good at all.",
      "I feel that I have a number of good qualities.", 
      "I am able to do things as well as most other people.",
      "I feel I do not have much to be proud of.",
      "I certainly feel useless at times.",
      "I feel that I'm a person of worth, at least on an equal plane with others.",
      "I wish I could have more respect for myself.",
      "All in all, I am inclined to feel that I am a failure.",
      "I take a positive attitude toward myself."
  ]

  npages = 2;
  ends = [esteem_list.length/npages, esteem_list.length];

  ros1 = [];
  
  for (var q=0; q<ends[0]; q++){
      ros1.push({prompt: "<p>" + esteem_list[q] + "</p>", labels: options, required:true});
  }
  ros2 = [];
  for(var q=ends[0]; q<ends[1]; q++){
      ros2.push({prompt: "<p>" + esteem_list[q] + "</p>", labels: options, required:true});
  }

  // create 2 pages with questions in likert style 
  // 1 minute per page 

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>The next list of statements deals with your general feelings and yourself." +
    " Please indicate how strongly you agree or disagree with each statement.</p>"+
    "<p>Please press the space bar</p>",
    choices : " ",
    trial_duration : dur_instr,
    data: {trial: 'self_esteem_instructions', task:'self_esteem'},
    on_finish: function(data){
      data.key_resp = data.response;
      data.response = 999;
    }
  }

  var self1 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: ros1,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'self_esteem_items1', task:'self_esteem'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'self_esteem_items1'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }
  
  var self2 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: ros2,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'self_esteem_items2', task:'self_esteem'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'self_esteem_items2'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }

  ses_time.push(pres_instr);
  ses_time.push(self1);
  ses_time.push(self2);

return ses_time
}

// Happiness
function shs(quest_n){

  var shs_time =[];

  var statements = [
      "In general, I consider myself: <p></p> (1: not a very happy person, 7: a very happy person)",
      "Compared with most of my peers, I consider myself:  <p></p> (1: less happy, 7: more happy)",
      "Some people are generally very happy.  They enjoy life regardless of what is going on, getting the most out of everything.  To what extent does this characterization describe you?  <p></p> (1: not at all, 7: a great deal)",
      "Some people are generally not very happy.  Although they are not depressed, they never seem as happy as they might be.  To what extent does this characterization describe you? <p></p> (1: not at all, 7: a great deal)"
  ];

  var options = [
      "1","2","3","4","5","6","7"
  ]

  var all_statements = [];
  all_statements = [];
  for(var q=0; q<statements.length; q++){
      all_statements.push({prompt: "<p>" + statements[q] + "</p>", labels: options, required:true});
  }

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>For each of the next statements and/or questions,"+
    " please indicate the point on the scale that you feel is most appropriate in describing you.</p>"+
    "<p>Please press the space bar</p>",
    trial_duration : dur_instr,
    choices: " ",
    data: {trial: 'subjective_happiness_instructions', task:'subjective_happiness'},
    on_finish: function(data){
      data.key_resp = data.response;
      data.response = 999;
    }
  }

  var happy = {
      timeline: [{
          type: jsPsychSurveyLikert,
          preamble: "<p style='font-size:25px'>Please click the point on the scale that you feel is most appropriate in describing you.</p>",
        questions: all_statements,
        scale_width: 900, 
        data: {trial: 'subjective_happiness_items', task:'subjective_happiness'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'subjective_happiness_items'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }

  shs_time.push(pres_instr);
  shs_time.push(happy);

  return shs_time
}


// Need to belong
function need_belong(quest_n){

  var ntb_time=[];

  var instructions = "<p style='font-size:25px'>Please indicate how strongly you agree or disagree with each statement.</p>"

  var options = ["strongly disagree", "disagree", "neutral", "agree","strongly agree"];

  //var standards = {options: options, required:false, horizontal:true};
  var belong_list = [
      "If other people do not seem to accept me, I do not let it bother me.", 
      "I try hard not to do things that will make other people avoid or reject me.",
      "I seldom worry about whether other people care about me. ", 
      "I need to feel that there are people I can turn to in times of need.",
      "I want other people to accept me.",
      "I do not like being alone.",
      "Being apart from my friends for long periods of time does not bother me.",
      "I have a strong 'need to belong'.",
      "It bothers me a great deal when I am not included in other people's plans.",
      "My feelings are easily hurt when I feel that others do not accept me."]

  npages = 2;
  ends = [belong_list.length/npages,belong_list.length];

  testpage1 = [];
  
  for (var q=0; q<ends[0]; q++){
      testpage1.push({prompt: "<p>" + belong_list[q] + "</p>", labels: options, required:true});
  }
  testpage2 = [];
  for(var q=ends[0]; q<ends[1]; q++){
      testpage2.push({prompt: "<p>" + belong_list[q] + "</p>", labels: options, required:true});
  }

  // create 2 pages with questions in likert style 
  // 1 minute per page 

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>Next is a list of statements." +
    " Please indicate how strongly you agree or disagree with each statement.</p>"+
    "<p>Please press the space bar</p>",
    trial_duration : dur_instr,
    choices: " ",
    data: {trial: 'need_to_belong_instructions', task:'need_to_belong'},
    on_finish: function(data){
      data.key_resp = data.response;
      data.response = 999;
    }
  }

  var ntb1 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: testpage1,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'need_to_belong_items1', task:'need_to_belong'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'need_to_belong_items1'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }
  
  var ntb2 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: testpage2,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'need_to_belong_items2', task:'need_to_belong'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'need_to_belong_items2'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }

  ntb_time.push(pres_instr);
  ntb_time.push(ntb1);
  ntb_time.push(ntb2);

  return ntb_time
}

//A Brief Measure for Assessing Generalized Anxiety Disorder, Spitzer et al., Arch Intern Med. 2006;166:1092-1097
//The GAD-7
function worry(quest_n){

  var w_time=[];

  var instructions = "<p style='font-size:25px'>Over the last <strong>2 weeks</strong>, how often have you been bothered by the following problems?</p>"

  var options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

  //var standards = {options: options, required:false, horizontal:true};
  var worry_list = [
    "Feeling nervous, anxious or on edge.",
    "Not being able to stop or control worrying.",
    "Worrying too much about different things.",
    "Trouble relaxing.",
    "Being so restless that it is hard to sit still.",
    "Becoming easily annoyed or irritable.",
    "Feeling afraid as if something awful might happen."]

  npages = 2;
  ends = [5,worry_list.length];

  testpage1 = [];
  
  for (var q=0; q<ends[0]; q++){
      testpage1.push({prompt: "<p>" + worry_list[q] + "</p>", labels: options, required:true});
  }
  testpage2 = [];
  for(var q=ends[0]; q<ends[1]; q++){
      testpage2.push({prompt: "<p>" + worry_list[q] + "</p>", labels: options, required:true});
  }

  // create 2 pages with questions in likert style 
  // 1 minute per page 

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>For the next list of questions, please indicate how often you have been bothered by the described problems over the last <strong>2 weeks</strong>.</p>"+
    "<p>Please press the space bar</p>",
    trial_duration : dur_instr,
    data: {trial: 'generalized_anxiety_disorder_instructions', task:'generalized_anxiety_disorder'},
    on_finish: function(data){
      data.key_resp = data.response;
      data.response = 999;
    }
  }

  var w1 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: testpage1,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'GAD_items1', task:'generalized_anxiety_disorder'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'GAD_items1'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }
  
  var w2 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: testpage2,
          preamble: instructions,
          scale_width: 900,
          data: {trial: 'GAD_items2', task:'generalized_anxiety_disorder'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'GAD_items2'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
  }

  w_time.push(pres_instr);
  w_time.push(w1);
  w_time.push(w2);

  return w_time
}

// Locus of Control
function control(quest_n){

  control_time = [];
  
  instructs = "<p style='font-size:25px'> Please indicate to what extent you agree with the following statements</p>"
  var options = ["strongly disagree", "disagree", "slighlty disagree", "slighlty agree", "agree","strongly agree"];

  //var standards = {options: options, required:false, horizontal:true};
  var question_list = ["Whether or not I get to be a leader depends mostly on my ability.",
    "To a great extent my life is controlled by accidental happenings.",
    "I feel like what happens in my life is mostly determined by powerful people.",
    "Whether or not I get into a car accident depends mostly on how good a driver I am.",
    "When I make plans, I am almost certain to make them work.",
    "Often there is no chance of protecting my personal interests from bad luck happenings.",
    "When I get what I want, it is usually because I am lucky.",
    "Although I might have good ability, I will not be given leadership responsibility without appealing to those in positions of power.",
    "How many friends I have depends on how nice a person I am.",
    "I have often found that what is going to happen will happen.",
    "My life is chiefly controlled by powerful others.",
    "Whether or not I get into a car accident is mostly a matter of luck.",
    "People like myself have very little chance of protecting our personal interests when they conflict with those of strong pressure groups.",
    "It is not always wise for me to plan too far ahead because many things turn out to be a matter of good or bad fortune.",
    "Getting what I want requires pleasing those people above me.",
    "Whether or not I get to be a leader depends on whether I am lucky enough to be in the right place at the right time.",
    "If important people were to decide they did not like me, I probably would not make many friends",
    "I can pretty much determine what will happen in my life.",
    "I am usually able to protect my personal interests.",
    "Whether or not I get into a car accident depends mostly on the other driver.",
    "When I get what I want, it is usually because I worked hard for it.",
    "In order to have my plans work, I make sure that they fit in with the desires of other people who have power over me.",
    "My life is determined by my own actions.",
    "It is chiefly a matter of fate whether or not I have a few friends or many friends."]

    // change required to true later!
    npages = 4;  
    ends = [question_list.length/npages, 2*(question_list.length/npages), 3*(question_list.length/npages), question_list.length];
    formattedqs1 = [];
    for(var q=0; q<ends[0]; q++){
      formattedqs1.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
    }
    formattedqs2 = [];
    for(var q=ends[0]; q<ends[1]; q++){
      formattedqs2.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
    }
    formattedqs3 = [];
    for(var q=ends[1]; q<ends[2]; q++){
      formattedqs3.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
    }
    formattedqs4 = [];
    for(var q=ends[2]; q<ends[3]; q++){
      formattedqs4.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
    }

    // create the 4 pages with questions in likert style 
    var pres_instr = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "<p>"+quest_n+"</p>"+
      "<p>Please indicate to what extent you agree with the next statements.</p>"+
      "<p>Please press the space bar</p>",
      trial_duration : dur_instr,
      data: {trial: 'locus_of_control_instructions', task:'locus_of_control'},
      on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;
      }
    }

    var L1 = {
      timeline: [{
        type: jsPsychSurveyLikert,
        questions: formattedqs1,
        preamble: instructs,
        scale_width: 900,
        data: {trial: 'LOC_items1', task:'locus_of_control'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'LOC_items1'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
    }
    var L2 = {
      timeline: [{
        type: jsPsychSurveyLikert,
        questions: formattedqs2,
        preamble: instructs,
        scale_width: 900,
        data: {trial: 'LOC_items2', task:'locus_of_control'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'LOC_items2'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
    }
    var L3 = {
      timeline: [{
        type: jsPsychSurveyLikert,
        questions: formattedqs3,
        preamble: instructs,
        scale_width: 900,
        data: {trial: 'LOC_items3', task:'locus_of_control'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'LOC_items3'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
    }
    var L4 = {
      timeline: [{
        type: jsPsychSurveyLikert,
        questions: formattedqs4,
        preamble: instructs,
        scale_width: 900,
        data: {trial: 'LOC_items4', task:'locus_of_control'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({trial: 'LOC_items4'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        //saveDataToDb_trial();
      }
    }

    control_time.push(pres_instr);
    control_time.push(L1);
    control_time.push(L2);
    control_time.push(L3);
    control_time.push(L4);
    
    return control_time 
}; 


/* Create Personality Scale
/* The 24-item Brief HEXACO Inventory (BHI)
/* Available from: https://www.researchgate.net/publication/257430902_The_24-item_Brief_HEXACO_Inventory_BHI [accessed Apr 07 2020].*/
function hexaco_personality(quest_n){
  
  var hex_time = [];

    instructs = "<p style='font-size:25px'>Please indicate to what extent you agree with the following statement</p>"
    var options = ["strongly disagree", "disagree", "neutral", "agree","strongly agree"];
  
    //var standards = {options: options, required:false, horizontal:true};
    var question_list = ["I can look at a painting for a long time.",
      "I make sure that things are in the right spot.",
      "I remain unfriendly to someone who was mean to me.",
      "Nobody likes talking with me.",
      "I am afraid of feeling pain.",
      "I find it difficult to lie.",
      "I think science is boring.",
      "I postpone complicated tasks as long as possible.",
      "I often express criticism.",
      "I easily approach strangers.",
      "I worry less than others.",
      "I would like to know how to make lots of money in a dishonest manner.",
      "I have a lot of imagination.",
      "I work very precisely.",
      "I tend to quickly agree with others.",
      "I like to talk with others.",
      "I can easily overcome difficulties on my own.",
      "I want to be famous.",
      "I like people with strange ideas.",
      "I often do things without really thinking.",
      "Even when I am treated badly, I remain calm.",
      "I am seldom cheerful.",
      "I have to cry during sad or romantic movies.",
      "I am entitled to special treatment."]

      // change required to true to force answer
      npages = 4;  
      ends = [question_list.length/npages, 2*(question_list.length/npages), 3*(question_list.length/npages), question_list.length];
      formattedqs1 = [];
      for(var q=0; q<ends[0]; q++){
        formattedqs1.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
      }
      formattedqs2 = [];
      for(var q=ends[0]; q<ends[1]; q++){
        formattedqs2.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
      }
      formattedqs3 = [];
      for(var q=ends[1]; q<ends[2]; q++){
        formattedqs3.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
      }
      formattedqs4 = [];
      for(var q=ends[2]; q<ends[3]; q++){
        formattedqs4.push({prompt: "<p>" + question_list[q] + "</p>", labels: options, required:true});
      }

      // create the 4 pages with questions in likert style 
      var pres_instr = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p>"+quest_n+"</p>"+
        "<p>Please indicate to what extent you agree with the next statements.</p>"+
        "<p>Please press the space bar</p>",
        trial_duration : dur_instr,
        data: {trial: 'hexaco_instructions', task:'hexaco'},
        on_finish: function(data){
          data.key_resp = data.response;
          data.response = 999;
        }
      }

      var P1 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: formattedqs1,
          preamble: instructs,
          scale_width: 900,
          data: {trial: 'hexaco_items1', task:'hexaco'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'hexaco_items1'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.key_resp = data.response;
          data.response = 999;
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          //saveDataToDb_trial();
        }
      }
      var P2 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: formattedqs2,
          preamble: instructs,
          scale_width: 900,
          data: {trial: 'hexaco_items2', task:'hexaco'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'hexaco_items2'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.key_resp = data.response;
          data.response = 999;
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          //saveDataToDb_trial();
        }
      }
      var P3 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: formattedqs3,
          preamble: instructs,
          scale_width: 900,
          data: {trial: 'hexaco_items3', task:'hexaco'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'hexaco_items3'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.key_resp = data.response;
          data.response = 999;
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          //saveDataToDb_trial();
        }
      }
      var P4 = {
        timeline: [{
          type: jsPsychSurveyLikert,
          questions: formattedqs4,
          preamble: instructs,
          scale_width: 900,
          data: {trial: 'hexaco_items4', task:'hexaco'}
        }],
        on_finish: function (data){
          resp = jsPsych.data.get().filter({trial: 'hexaco_items4'}).select('response').values[0];
          long_string = [];
          for (const property in resp) {
            long_string += `${property}`+'_';
            long_string += `${resp[property]}`+'_';
          }
          data.key_resp = data.response;
          data.response = 999;
          data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
          //saveDataToDb_trial();
        }
      }
    
      hex_time.push(pres_instr);
      hex_time.push(P1);
      hex_time.push(P2);
      hex_time.push(P3);
      hex_time.push(P4);

      return hex_time
    
    };


// Paranoid Thoughts Scale
function paranoia_scale(quest_n){

  var pts_time=[];

  var instructions = "<p style='font-size:25px'>Please read each of the statements carefully." +
  " They refer to thoughts and feelings you may have had about others over the <strong>last month</strong>.</p>"

  var options = ["not at all", " ", " ", " ", "totally"];

  //var standards = {options: options, required:false, horizontal:true};
  var paranoia_list = [
    "I spent time thinking about friends gossiping about me.",
    "I often heard people referring to me.",
    "I have been upset by friends and colleagues judging me critically.",
    "People definitely laughed at me behind my back.",
    "I have been thinking a lot about people avoiding me.",
    "People have been dropping hints for me.",
    "I believed that certain people were not what they seemed.",
    "People talking about me behind my back upset me.",
    "Certain individuals have had it in for me.",
    "People wanted me to feel threatened, so they stared at me.",
    "I was certain people did things in order to annoy me.",
    "I was convinced there was a conspiracy against me.",
    "I was sure someone wanted to hurt me.",
    "I couldn't stop thinking about people wanting to confuse me.",
    "I was distressed by being persecuted.",
    "It was difficult to stop thinking about people wanting to make me feel bad.",
    "People have been hostile towards me on purpose.",
    "I was angry that someone wanted to hurt me."]

  npages = 3;
  ends = [paranoia_list.length/npages, 2*(paranoia_list.length/npages), paranoia_list.length];

  paranoiapage1 = [];  
  for (var q=0; q<ends[0]; q++){
    paranoiapage1.push({prompt: "<p>" + paranoia_list[q] + "</p>", labels: options, required:true});
  }

  paranoiapage2 = [];
  for(var q=ends[0]; q<ends[1]; q++){
    paranoiapage2.push({prompt: "<p>" + paranoia_list[q] + "</p>", labels: options, required:true});
  }

  paranoiapage3 = [];
  for(var q=ends[1]; q<ends[2]; q++){
    paranoiapage3.push({prompt: "<p>" + paranoia_list[q] + "</p>", labels: options, required:true});
  }


  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>"+quest_n+"</p>"+
    "<p>Next is a list of statements." +
    " Please read each of the statements carefully." +
    " They refer to thoughts and feelings you may have had about others over the <strong>last month</strong>.</p>"+
    "<p>Please press the space bar</p>",
    trial_duration : dur_instr,
    data: {event: 'paranoia_instructions', task:'paranoia'},
    on_finish: function(data){
      data.key_resp = data.response;
      data.response = 999;
    }
  }

  var pts1 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: paranoiapage1,
          preamble: instructions,
          scale_width: 900,
          data: {event: 'paranoia_items1', task:'paranoia'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({event: 'paranoia_items1'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      }
  }
  
  var pts2 = {
      timeline:[{
          type: jsPsychSurveyLikert,
          questions: paranoiapage2,
          preamble: instructions,
          scale_width: 900,
          data: {event: 'paranoia_items2', task:'paranoia'}
      }],
      on_finish: function (data){
        resp = jsPsych.data.get().filter({event: 'paranoia_items2'}).select('response').values[0];
        long_string = [];
        for (const property in resp) {
          long_string += `${property}`+'_';
          long_string += `${resp[property]}`+'_';
        }
        data.key_resp = data.response;
        data.response = 999;
        data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      }
  }


  var pts3 = {
    timeline:[{
        type: jsPsychSurveyLikert,
        questions: paranoiapage3,
        preamble: instructions,
        scale_width: 900,
        data: {event: 'paranoia_items3', task:'paranoia'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({event: 'paranoia_items3'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
    }
}


  pts_time.push(pres_instr);
  pts_time.push(pts1);
  pts_time.push(pts2);
  pts_time.push(pts3);

  return pts_time
};

    // Demo
function create_demographics(){
  var bio_time = [];
  
  var question_list = [
      {prompt: "How much education do you have?", options: ["Some elementary or middle school","Some high school","Graduated high school","Some college","Associate's degree","Bachelor's degree","Started higher education (MA, PhD, MD, etc)","Completed higher education (MA, PhD, MD, etc.)"], name: "education"},
      {prompt: "What sex are you?", options: ["Male","Female","Other","Prefer not to state"],name: "sex"},
      {prompt: "Are you colorblind?", options: ["Yes","No","I don\'t know","Prefer not to state"], name: "colorblindness"},
      {prompt: "How hard was this task for you?", options: ["Very Easy", "Easy","Okay","Hard","Very Hard"], name: "difficulty"},
      {prompt: "Are you right- or left-handed?", options: ["Right-handed","Left-handed","Ambidextrous"],name: "handedness"},
      {prompt: "With how many people do you currenly live (partner or flatmates but excluding children)", options: ["alone", "1", "2","3","4 or more"], name: "household"},
      {prompt: "If you have children, do you currently live with them?", options: ["Yes, living with children.", "No, not living with children or not applicable"]}
  ]

  var all_questions = [];
  all_questions = [];
  for(var q=0; q<question_list.length; q++){
    all_questions.push({prompt: "<p>" + question_list[q]['prompt'] + "</p>", options: question_list[q]['options'], required:true, horizontal: false});
  }

  var pres_instr = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>Please answer the next questions about yourself.</p>"+
    "<p>Please press the space bar</p>",
    trial_duration : dur_instr,
    data: {trial: 'demo_instructions', task:'demo'},
    on_finish: function(data){data.key_resp = data.response;
      data.response = 999;}
  }

  var demo = {
    timeline: [{
      type: jsPsychSurveyMultiChoice,
      questions: all_questions,
      data: {trial: 'bio', task:'demo'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({trial: 'bio'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //saveDataToDb_trial();
    }
  }

  var econ = {
    timeline: [{
        type: jsPsychHtmlSliderResponse,
        stimulus:  "<p>Imagine a ladder with 100 rungs that describes the economic classes of society. On this ladder, the first rung (1) represents the lowest class and the last rung (100) represents the highest class. Where would you position yourself on this ladder? (1: minimum, 100: maximum)</p>",
        labels: ['1', '100'],
        slider_width: 900,
        require_movement:true,
        data: {trial: 'econ_status', task:'demo'}
    }],
    on_finish: function(){
      //saveDataToDb_trial();
    }
}

  open_questions1 = [{prompt: "<p>How old are you?</p>",rows: 1,name: "age",required: true}]

  var free_ans1 = {
    timeline: [{
      type: jsPsychSurveyText,
      questions: open_questions1,
      data: {trial: 'age', task:'demo'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({trial: 'age'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //saveDataToDb_trial();
    }
  }

  open_questions3 = [{prompt: "<p>Did you use any strategy <strong>in the planet game</strong>? Please indicate if yes or no, and describe your strategy.</p>", rows: 20, name: "hd_strategy",required: true}]

  var free_ans3 = {
    timeline: [{
      type: jsPsychSurveyText,
      questions: open_questions3,
      data: {trial: 'hd_strategy', task:'demo'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({trial: 'hd_strategy'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //saveDataToDb_trial();
    }
  }

  open_questions4 = [{prompt: "<p>Did you use any strategy to decide whether <strong>to share and how much</strong> in the second game? Please indicate if yes or no, and describe your strategy.</p>", rows: 20, name: "tg_strategy",required: true}]

  var free_ans4 = {
    timeline: [{
      type: jsPsychSurveyText,
      questions: open_questions4,
      data: {trial: 'tg_strategy', task:'demo'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({trial: 'tg_strategy'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //saveDataToDb_trial();
    }
  }


  open_questions6 = [{prompt: "<p>Do you have any comments on the <strong>behavior of the other participant</strong>? Please explain.</p>", rows: 20, name: "coplayer_behavior",required: true}]

  var free_ans6 = {
    timeline: [{
      type: jsPsychSurveyText,
      questions: open_questions6,
      data: {trial: 'coplayer_behavior_quest', task:'demo'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({trial: 'coplayer_behavior_quest'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //saveDataToDb_trial();
    }
  }
  
  open_questions8 = [{prompt: "<p>What was in your opinion the goal of this study? Please explain.</p>", rows: 20, name: "study_aim", required: true}]

  var free_ans8 = {
    timeline: [{
      type: jsPsychSurveyText,
      questions: open_questions8,
      data: {trial: 'study_aim', task:'demo'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({trial: 'study_aim'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //saveDataToDb_trial();
    }
  }

  var options = ["Yes", "No", "Not Sure"];
  var game_known = ["Did you already know the game or have you participated in experiments with similar games?"];
  var open_questions9 = [];
  open_questions9.push({prompt: "<p>" + game_known[0] + "</p>", options: options, required:true});

var free_ans9 = {
  timeline: [{
    type: jsPsychSurveyMultiChoice,
    questions: open_questions9,
    data: {trial: 'game_knowledge', task:'demo'}
  }],
  on_finish: function (data){
    resp = jsPsych.data.get().filter({trial: 'game_knowledge'}).select('response').values[0];
    long_string = [];
    for (const property in resp) {
      long_string += `${property}`+'_';
      long_string += `${resp[property]}`+'_';
    }
    data.key_resp = data.response;
    data.response = 999;
    data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
    //saveDataToDb_trial();
  }
}

open_questions10 = [{prompt: "<p>Do you have any further comments? In particular, have you come across any technical issues?</p>", rows: 20, name: "free_comment", required: true}]

  var free_ans10 = {
    timeline: [{
      type: jsPsychSurveyText,
      questions: open_questions10,
      data: {trial: 'free_comment', task:'demo'}
    }],
    on_finish: function (data){
      resp = jsPsych.data.get().filter({trial: 'free_comment'}).select('response').values[0];
      long_string = [];
      for (const property in resp) {
        long_string += `${property}`+'_';
        long_string += `${resp[property]}`+'_';
      }
      data.key_resp = data.response;
      data.response = 999;
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //saveDataToDb_trial();
    }
  }

  bio_time.push(pres_instr);
  bio_time.push(demo);
  bio_time.push(econ);
  bio_time.push(free_ans1);
  bio_time.push(free_ans3);
  bio_time.push(free_ans4);
  bio_time.push(free_ans6);
  bio_time.push(free_ans8);
  bio_time.push(free_ans9);
  bio_time.push(free_ans10);

  return bio_time

};




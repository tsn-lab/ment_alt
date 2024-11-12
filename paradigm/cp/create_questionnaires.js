

/* MAKE QUESTIONNAIRES */
function create_questionnaires (){
    var quest_lone_timeline = [];

var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>You will now fill in a few questionnaires. Try to answer as truly and spontaneously as possible to each question.</p><p>There is no <strong>right</strong> or <strong>wrong</strong> answer.</p>"+
                "<p>Press the space bar to proceed.</p>",
    trial_duration : dur_instr,
    choices : " ",
    post_trial_gap: 100,
    data : {event: 'instruction_questionnaires', task: 'instructions'},
    on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;
    }
      };
      quest_lone_timeline.push(instructions);

var tot_quest = 5;

var quest_n = 1;
var lone_trait = {
    timeline: UCLA_scale(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(lone_trait);

var quest_n = quest_n+1;
var lone_state = {
    timeline: state_loneliness(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(lone_state);

var quest_n = quest_n+1;
var trust_preferences = {
    timeline: general_trust(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(trust_preferences);

/*var quest_n = quest_n+1;
var soc_craving = {
    timeline: social_craving(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(soc_craving);*/

    /*var quest_n = quest_n+1;
var self_esteem = {
    timeline: ses(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(self_esteem);*/

    /*var quest_n = quest_n+1;
var happiness = {
    timeline: shs(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(happiness);*/ 

    /*var quest_n = quest_n+1;
var need_to_belong = {
    timeline: need_belong(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(need_to_belong);*/
        
    /*var quest_n = quest_n+1;
var worrisome_scale = {
    timeline: worry(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(worrisome_scale);*/

    /*var quest_n = quest_n+1;
var hexaco_perso = {
    timeline: hexaco_personality(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(hexaco_perso);*/

/*var quest_n = quest_n+1; // Paranoid Thoughts Scale
var pts = {
    timeline: paranoia_scale(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(pts);*/


/*var quest_n = quest_n+1; // Social Norms Scale
var pts = {
    timeline: SN_scale(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(pts);*/
        
    /*var quest_n = quest_n+1;
var locus_control = {
    timeline: control(['Questionnaire ' +String(quest_n)+ ' of ' +String(tot_quest)])};
    quest_lone_timeline.push(locus_control);*/

var bio = {
    timeline: create_demographics()};
    quest_lone_timeline.push(bio);
  

return quest_lone_timeline

}

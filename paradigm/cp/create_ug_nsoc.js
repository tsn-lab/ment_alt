


function create_ug_nsoc() {

    var timeline_ug = [];
    jsPsych.data.addProperties({cur_waiting_length: 0})

    /* ====================== */
    /* Instructions ug */
    /* ====================== */
    var instruc_ug = {
        timeline: instructions_ug()}
    timeline_ug.push(instruc_ug);


    /* Loop through trials*/
    var i=0;
    if (i==0){var role = jsPsych.data.get().select('role').values[0]; saveDataToDb_dropouts(); i=i+1;
            if (role=='1'){jsPsych.data.addProperties({cur_trial_dec: 1});}
            else {jsPsych.data.addProperties({cur_trial_dec: 0});}}
        
        

    /*================================*/
    /*Matching*/
    /*================================*/
        var wait_period1 = {
            timeline : make_connection_ug()};
    
        var wait_loop1 = {
            timeline: [wait_period1],
            conditional_function: function(){
                var role = jsPsych.data.get().select('role').values[0];
                return role=='0';
            },
            loop_function: function(){
                var wl = jsPsych.data.get().select('cur_trial_coplayer_dec_dur').values;
                //console.log(wl);
                var cur_max_waiting_length  = wl[wl.length-1];
                var cur_waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
                var waiting_length=cur_waiting_length+wait_for_start_nsoc;
                //console.log('TIMINGS LOOPS');
                //console.log(cur_max_waiting_length);
                //console.log(cur_waiting_length);
                //console.log(waiting_length);

                jsPsych.data.addDataToLastTrial({cur_trial_coplayer_dec_dur: cur_max_waiting_length});
                jsPsych.data.addProperties({cur_waiting_length: waiting_length});
                if (waiting_length>cur_max_waiting_length){return false} else {return true}
            }
        }


    /*================================*/
    /*Proposer's Previous Decisions*/
    /*================================*/
        var proposer_pres = {
            type : jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: "NO_KEYS",
            prompt : function(){"<p>You have been paired with the above player</p>"
            },
            data: {trial: 'proposer_pres', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug'),proposer_pres_dur: jsPsych.timelineVariable('proposer_pres_dur')},
        }

        var proposer_backg1 = {
            type : jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: "NO_KEYS",
            prompt : function(){
                
                var shared2 = jsPsych.timelineVariable('shared2');
                var shared5 = jsPsych.timelineVariable('shared5');
                
                "<p>This player has previously shared</p>"+
                "<p><font color='white'><strong>2</strong>: " +String(shared2)+ " time(s)</font></p>"+
                "<p><font color='white'><strong>5</strong>: " +String(shared5)+ " time(s)</font></p>"+
            "<p><font color='white'>WHITE SPACE</font></p>"+
            "<p><font color='white'>Could they share any amount from 0 to 10 points, how much do you think this participant would share?</font></p>"+
            "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
            },
            data: {trial: 'proposer_background1', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug'),proposer_backg1_dur: jsPsych.timelineVariable('proposer_pres_dur')},
        }

        var proposer_backg2 = {
            type : jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: "NO_KEYS",
            prompt : function(){
                
                var shared2 = jsPsych.timelineVariable('shared2');
                var shared5 = jsPsych.timelineVariable('shared5');
                
                "<p>This player has previously shared</p>"+
                "<p><strong>2</strong>: " +String(shared2)+ " time(s)</p>"+
                "<p><strong>5</strong>: " +String(shared5)+ " time(s)</p>"+
            "<p><font color='white'>WHITE SPACE</font></p>"+
            "<p><font color='white'>Could they share any amount from 0 to 10 points, how much do you think this participant would share?</font></p>"+
            "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
            },
            data: {trial: 'proposer_background2', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug'),proposer_backg2_dur: jsPsych.timelineVariable('proposer_backg_dur')},
        }


    /*===============================================*/
    /*Estimation of Proposer's Current Decision*/
    /*===============================================*/
        var proposer_est_dec = {
            type : jsPsychImageButtonResponse,
            stimulus : jsPsych.timelineVariable('stimulus'),
            choices : function(){
                off_ch = [];
                for (i=0; i<11; i++){
                    off_ch[i] = String(i);}
            },
            prompt : function(){
                
                var shared2 = jsPsych.timelineVariable('shared2');
                var shared5 = jsPsych.timelineVariable('shared5');
                
                "<p>This player has previously shared</p>"+
                "<p><strong>2</strong>: " +String(shared2)+ " time(s)</p>"+
                "<p><strong>5</strong>: " +String(shared5)+ " time(s)</p>"+
            "<p><font color='white'>WHITE SPACE</font></p>"+
            "<p><font color='white'>Could they share any amount from 0 to 10 points, how much do you think this participant would share?</font></p>"+
            "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
            },
            data: {trial: 'proposer_est_dec', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug')},
    
        on_finish: function(data){
            data.est_off = data.response;
            data.player_dec_dur = data.rt;
            //console.log (data);
            jsPsych.data.addProperties({cur_trial_dec: data.index_ug})
            jsPsych.data.addProperties({cur_waiting_length: 0});
        }}



    /*================================*/
    /*Proposer's Current Decision*/
    /*================================*/
        var proposer_wait_dec = {
            type : jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: "NO_KEYS",
            prompt : function(){
                
                "<p>This player is offerring...</p>"+
                "<p><strong><font color='white'>You get</strong>: ... </font></p>"+
                "<p><strong><font color='white'>They keep</strong>: ... </font></p>"+
            "<p><font color='white'>WHITE SPACE</font></p>"+
            "<p><font color='white'>Would you like to accept the offer?</font></p>"+
            "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
        },
            data: {trial: 'proposer_dec', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug'),proposer_wait_dec_dur: jsPsych.timelineVariable('coplayer_dec_dur_ug'),
                offer: jsPsych.timelineVariable('offer')  },
    
        on_finish: function(data){
            data.accept = data.response;
            //console.log (data);
        }}

        var proposer_dec = {
            type : jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: "NO_KEYS",
            prompt : function(){
                
                var offer = jsPsych.timelineVariable('offer');
                var kept = 10-offer;

                "<p>This player has offerred</p>"+
                "<p><strong>You get</strong>: " +String(offer)+ " </p>"+
                "<p><strong>They keep</strong>: " +String(kept)+ " </p>"+
            "<p><font color='white'>WHITE SPACE</font></p>"+
            "<p><font color='white'>Would you like to accept the offer?</font></p>"+
            "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
        },
            data: {trial: 'proposer_dec', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug'),proposer_dec_dur: jsPsych.timelineVariable('proposer_dec_dur'),
                offer: jsPsych.timelineVariable('offer')  },
    
        on_finish: function(data){
            data.accept = data.response;
            //console.log (data);
        }}


    /*========================*/
    /*Responder's Decision*/
    /*========================*/
        var responder_dec = {
            type : jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: ['reject','accept'],
            prompt : function(){
                
                var offer = jsPsych.timelineVariable('offer');
                var kept = 10-offer;

                "<p>This player has offerred</p>"+
                "<p><strong>You get</strong>: " +String(offer)+ " </p>"+
                "<p><strong>They keep</strong>: " +String(kept)+ " </p>"+
            "<p><font color='white'>WHITE SPACE</font></p>"+
            "<p><strong>Would you like to accept the offer?</strong></p>"+
            "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
        },
            data: {trial: 'responder_dec', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug')},
    
        on_finish: function(data){
            data.accept = data.response;
            //console.log (data);
        }}



    /*========================*/
    /*Feedback*/
    /*========================*/
        var fb_pres = {
            type : jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: "NO_KEYS",
            prompt : function(){

                var wl = jsPsych.data.getLastTrialData();
                var cur_accep  = wl.accept;                
                var offer = jsPsych.timelineVariable('offer');
                var kept = 10-offer;

                if (cur_accep==1){
                    "<p>You accepted the offer</p>"+
                    "<p><strong>You get</strong>: " +String(offer)+ " </p>"+
                    "<p><strong>Your coplayer gets</strong>: " +String(kept)+ " </p>"+
                    "<p><font color='white'>WHITE SPACE</font></p>"+
                    "<p><font color='white'>WHITE SPACE</font></p>"+
                    "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
                } else {
                    "<p>You did not accept the offer</p>"+
                    "<p><strong>You get</strong>: 0 </p>"+
                    "<p><strong>Your coplayer gets</strong>: 0 </p>"+
                    "<p><font color='white'>WHITE SPACE</font></p>"+
                    "<p><font color='white'>WHITE SPACE</font></p>"+
                    "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"
                }
        },
            data: {trial: 'fb_pres', task: 'ug', index_ug: jsPsych.timelineVariable('trial_count_ug'),fb_dur: jsPsych.timelineVariable('fb_dur')},
    
        on_finish: function(data){
            data.accept = data.response;
            //console.log (data);
        }}
        

var task_procedure = {
    timeline: [wait_loop1,proposer_pres,proposer_backg1,proposer_backg2,proposer_est_dec,proposer_wait_dec,proposer_dec,responder_dec,fb_pres],
    timeline_variables: ug_stimuli
}
timeline_ug.push(task_procedure);

    return timeline_ug
}
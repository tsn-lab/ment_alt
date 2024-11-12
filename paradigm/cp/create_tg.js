


function create_tg() {

    var timeline_tg = [];
    jsPsych.data.addProperties({cur_waiting_length: 0})

    /* ====================== */
    /* Instructions TG */
    /* ====================== */
    var instruc_tg = {
        timeline: instructions_tg()}
    timeline_tg.push(instruc_tg);


    /* Loop through trials*/
    for (i=0;i<ntrials_tg;i++){

        if (i==0){var role = jsPsych.data.get().select('role').values[0];
            if (role=='1'){jsPsych.data.addProperties({cur_trial_dec_tg: 1});}
            else {jsPsych.data.addProperties({cur_trial_dec_tg: 0});}}
            
        
        /* =================================== */
        /* WAITING LOOP AT BEGINNING OF TRIAL */
        /* =================================== */
        var wait_period = {
            timeline : make_connection_tg()};
    
        var wait_loop = {
            timeline: [wait_period],
            conditional_function: function(){
                var role = jsPsych.data.get().select('role').values[0];
                return role=='0';
            },
            loop_function: function(data){
                var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
                data.waiting_length=waiting_length+wait_for_start;
                jsPsych.data.addProperties({cur_waiting_length: data.waiting_length});
                
                get_responses_tg();       
                var loc_trial = jsPsych.data.get().select('cur_trial_dec_tg').values[0]; loc_trial=loc_trial+1;
                var cur_trial = jsPsych.data.get().select('cur_index_trial').values[0];
                //console.log(cur_resp);
                if (loc_trial==cur_trial){
                    get_responses_trustor();
                    var cur_resp = jsPsych.data.get().select('cur_trustor_dec').values[0];
                    var cur_trustor_length = jsPsych.data.get().select('cur_trustor_length').values[0];

                    if (Number.isInteger(cur_resp)==true & cur_trustor_length==cur_trial) {
                        return false} else {return true}
                } else if (data.waiting_length>max_waiting_period){return false} else {return true};
            }
        }
        timeline_tg.push(wait_loop);

        var dropout_trial1 = {
            timeline: coplayer_dropout(),
            conditional_function: function (){
                var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
                return waiting_length>max_waiting_period
                }
            }
        timeline_tg.push(dropout_trial1);


        


/* ====================== */
/* INVESTOR */
/* ====================== */
    var trustor_dec = {
        type : jsPsychHtmlButtonResponse2,
        stimulus : "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
        "<p style='text-align:center'>You have <strong>10 points</strong> and can decide whether you want to share any portion of this amount with Player B. You can share nothing (0 points) or any amount up to the maximum amount (10 points).</p>",
        choices: function(){
            var tr_dec = [];
            for (i=0; i<11; i++){
                tr_dec[i] = String(i);}
            return tr_dec},
        data: {trial: 'trustor_decision', task: 'tg', index_tg: i+1},
        extensions: [   {   type: jsPsychExtensionMouseTracking }
        ],

    on_finish: function(data){
        data.trust = data.response;
        /*console.log (data);*/
        jsPsych.data.addProperties({cur_trustor_dec: data.response}),
        jsPsych.data.addProperties({cur_trial_dec_tg: data.index_tg}),

        resp = data.mouse_tracking_data;
        long_string = [];
        for(i=0;i<resp.length;i++){
            long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
        }
        data.mouse = long_string;
        saveDataToDb_trial_trustor()},
    }
    
    var pres_trustor = {
        timeline: [trustor_dec],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='1'){return true} else {return false}},
    }
    timeline_tg.push(pres_trustor);


    var wait_period = {
        timeline : make_connection_tg()};

    var wait_loop = {
        timeline: [wait_period],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            return role=='1';
        },
        loop_function: function(data){
            var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
            data.waiting_length=waiting_length+wait_for_start;
            jsPsych.data.addProperties({cur_waiting_length: data.waiting_length});
            
            get_responses_tg();
            var loc_trial = jsPsych.data.get().select('cur_trial_dec_tg').values[0];
            var cur_trial = jsPsych.data.get().select('cur_index_trial').values[0];
            /*console.log(cur_resp);*/
            if (loc_trial==cur_trial){
                get_responses_trustee();
                var cur_resp = jsPsych.data.get().select('cur_trustee_dec').values[0];
                var cur_trustee_length = jsPsych.data.get().select('cur_trustee_length').values[0];

                if (Number.isInteger(cur_resp)==true & cur_trustee_length==cur_trial) {
                    return false} else {return true};
            } else if(data.waiting_length>max_waiting_period){return false} else {return true}
        }
    }
    timeline_tg.push(wait_loop);

    var dropout_trial2 = {
        timeline: coplayer_dropout(),
        conditional_function: function (){
            var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
            return waiting_length>max_waiting_period
            }
        }
    timeline_tg.push(dropout_trial2);







/*==================*/
/*Trustee Decision*/
/*==================*/
var trustee_dec = {
    type : jsPsychHtmlButtonResponse2,
    stimulus: function (){
        var ret_dec = jsPsych.data.get().select('cur_trustor_dec').values[0];
        //console.log(ret_dec);

        var trust_dec = (ret_dec)*3;

        if (trust_dec==0){
            trustee_possible_acts = "<p>Please press 'Continue' to proceed.</p>"
        }
        else {trustee_possible_acts="<p>How much do you want to share with Player A? You can share between 0 and "+String(trust_dec)+" points.</p>"}

    return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
    "<p>Player A shared <strong>"+String(ret_dec)+"</strong>.</p>" +
    "<p>You have now <strong>"+String(trust_dec)+" points</strong>.</p>"+
    trustee_possible_acts},
    choices: function(){
        var ret_dec = jsPsych.data.get().select('cur_trustor_dec').values[0];
        var trust_dec = (ret_dec)*3;
        if (trust_dec==0){rec_ch = ["Continue"]}
        else {rec_ch = [];
        for (i=0; i<trust_dec+1; i++){
            rec_ch[i] = String(i);}}
        return rec_ch},
    data: {trial: 'trustee_decision',task: 'tg', index_tg: i+1},
    extensions: [   {   type: jsPsychExtensionMouseTracking }
    ],

on_finish: function(data){
    data.trust = jsPsych.data.get().select('cur_trustor_dec').values[0];
    data.reciprocity = data.response;
    jsPsych.data.addProperties({cur_trustee_dec: data.response}),
    jsPsych.data.addProperties({cur_trial_dec_tg: data.index_tg}),

    resp = data.mouse_tracking_data;
        long_string = [];
        for(i=0;i<resp.length;i++){
            long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
        }
        data.mouse = long_string;
    saveDataToDb_trial_trustee()}
}


var pres_trustee = {
    timeline: [trustee_dec],
    conditional_function: function(){
        var role = jsPsych.data.get().select('role').values[0];
        if (role=='0'){return true} else {return false}},
}
timeline_tg.push(pres_trustee);









/* ====================== */
/* FEEDBACK */
/* ====================== */
var fb_trustor = {
    type : jsPsychHtmlKeyboardResponse,
    stimulus : function (){
        var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
        var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
        //console.log(["TRUSTOR'S DECISION: "+String(trust_dec)]);
        //console.log(["TRUSTEE'S DECISION: "+String(rec_dec)]);

        var trustor_payoff = (10 - trust_dec)+rec_dec;
        var trustee_payoff = (trust_dec*3)-rec_dec;
        //console.log(["TRUSTOR'S PAYOFFS: " + String(trustor_payoff)]);
        //console.log(["TRUSTEE'S PAYOFFS: " + String(trustee_payoff)]);

        return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
               "<p>You sent <strong>"+String(trust_dec)+"</strong></p>" +
               "<p>Player B sent back <strong>"+String(rec_dec)+"</strong></p>"+
        "<p><strong><font color='blue'>You earned "+String(trustor_payoff)+"</font></strong></p>"+"<p>Player B earned <strong>"+String(trustee_payoff)+"</strong></p>"
    },
    trial_duration : fb_dur_tg,
    data:{trial: 'feedback_trustor', task: 'tg', index_tg: i+1, fb_trustor_payoff: function (){
        var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
        var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
        var trustor_payoff = (10 - trust_dec)+rec_dec; return trustor_payoff},
        trust: function (){var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]); return trust_dec},
        reciprocity: function (){ var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]); return rec_dec},
        fb_trustee_payoff: function (){ var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
            var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
            var trustee_payoff = (3*trust_dec)-rec_dec; return trustee_payoff}
    },
    on_finish: function(data){
    data.key_resp = data.response;
    data.response = 999;}
}
var pres_fb_trustor = {
    timeline: [fb_trustor],
    conditional_function: function(){
        var role = jsPsych.data.get().select('role').values[0];
        if (role=='1'){return true} else {return false}},
}
timeline_tg.push(pres_fb_trustor);




var fb_trustee = {
    type : jsPsychHtmlKeyboardResponse,
    stimulus : function (){
        var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
        var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
        
        //console.log(["TRUSTOR'S DECISION: "+String(trust_dec)]);
        //console.log(["TRUSTEE'S DECISION: "+String(rec_dec)]);
        
        var trustor_payoff = (10 - trust_dec)+rec_dec;
        var trustee_payoff = (trust_dec*3)-rec_dec;
        
        //console.log(["TRUSTOR'S PAYOFFS: " + String(trustor_payoff)]);
        //console.log(["TRUSTEE'S PAYOFFS: " + String(trustee_payoff)]);
        
        return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
        "<p>Player A sent <strong>"+String(trust_dec)+"</strong></p>" +
        "<p>You sent back <strong>"+String(rec_dec)+"</strong></p>"+
        "<p><strong><font color='blue'>You earned "+String(trustee_payoff)+"</font></strong></p>"+"<p>Player A earned <strong>"+String(trustor_payoff)+"</strong></p>"
    },
    trial_duration : fb_dur_tg,
    data:{trial: 'feedback_trustee',task: 'tg', index_tg: i+1, fb_trustee_payoff: function(){
        var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
        var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
        var trustee_payoff = (trust_dec*3)-rec_dec; return trustee_payoff},
        trust: function (){var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]); return trust_dec},
        reciprocity: function (){var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]); return rec_dec},
        fb_trustor_payoff: function (){ var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
        var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
        var trustor_payoff = (10 - trust_dec)+rec_dec; return trustor_payoff}
    },
    on_finish: function(data){
    data.key_resp = data.response;
    data.response = 999;}
}
var pres_fb_trustee = {
    timeline: [fb_trustee],
    conditional_function: function(){
        var role = jsPsych.data.get().select('role').values[0];
        if (role=='0'){return true} else {return false}},
}
timeline_tg.push(pres_fb_trustee);

}

    return timeline_tg
}
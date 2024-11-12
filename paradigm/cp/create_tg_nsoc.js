


function create_tg_nsoc() {

    var timeline_tg = [];
    jsPsych.data.addProperties({cur_waiting_length: 0})

    /* ====================== */
    /* Instructions TG */
    /* ====================== */
    var instruc_tg = {
        timeline: instructions_tg()}
    timeline_tg.push(instruc_tg);


    /* Loop through trials*/
    var i=0;
    if (i==0){var role = jsPsych.data.get().select('role').values[0]; saveDataToDb_dropouts(); i=i+1;
            if (role=='1'){jsPsych.data.addProperties({cur_trial_dec: 1});}
            else {jsPsych.data.addProperties({cur_trial_dec: 0});}}
        
        
        var wait_period1 = {
            timeline : make_connection_tg()};
    
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


/*==================*/
/*Investor Decision*/
/*==================*/
        var trustor_dec = {
            type : jsPsychHtmlButtonResponse2,
            stimulus : "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
            "<p>You have <strong>10 points</strong> and can decide whether you want to share any portion of this amount with Player B. You can share nothing (0 points) or any amount up to the maximum amount (10 points).</p>",
            choices: function(){
                var tr_dec = [];
                for (i=0; i<11; i++){
                    tr_dec[i] = String(i);}
                return tr_dec},
            data: {trial: 'trustor_decision', task: 'tg', index_tg: jsPsych.timelineVariable('trial_count_tg'),cur_trial_coplayer_dec_dur: jsPsych.timelineVariable('coplayer_dec_dur_tg')},
    
        on_finish: function(data){
            data.trust = data.response;
            //console.log (data);


            var tru_type        = jsPsych.data.get().select('coplayer_type').values[0];
            //console.log(data.trust);
            //console.log(tru_type);

            var alphas          = jsPsych.data.get().select(['alpha']).values;
            var betas           = jsPsych.data.get().select(['beta']).values;
        
            var trust_perc = data.trust/10;
            var shape_par           = update_exp_beliefs([trust_perc,alphas,betas]);
            //console.log(shape_par[0]);
            //console.log(shape_par[1]);

            data.alpha          = shape_par[0];
            data.beta           = shape_par[1];

            get_trustee_dec(tru_type,data.trust,shape_par[0],shape_par[1]);

            jsPsych.data.addProperties({cur_trustor_dec: data.response}),
            jsPsych.data.addProperties({cur_trial_dec: data.index_tg})
            jsPsych.data.addProperties({cur_waiting_length: 0});
        }}
        
        var pres_trustor = {
            timeline: [trustor_dec],
            conditional_function: function(){
                var role = jsPsych.data.get().select('role').values[0];
                if (role=='1'){return true} else {return false}},
        }


    var wait_period2 = {
        timeline : make_connection_tg()};

    var wait_loop2 = {
        timeline: [wait_period2],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            return role=='1';
        },
        loop_function: function(){
                var wl = jsPsych.data.get().select('cur_trial_coplayer_dec_dur').values;
                var cur_max_waiting_length  = wl[wl.length-1];
                var cur_waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
                waiting_length=cur_waiting_length+wait_for_start_nsoc;
                //console.log('TIMINGS LOOPS');
                //console.log(cur_max_waiting_length);
                //console.log(cur_waiting_length);
                //console.log(waiting_length);

                jsPsych.data.addDataToLastTrial({cur_trial_coplayer_dec_dur: cur_max_waiting_length});
                jsPsych.data.addProperties({cur_waiting_length: waiting_length});
                if (waiting_length>cur_max_waiting_length){return false} else {return true}
        }
    }



/*==================*/
/*Trustee Decision*/
/*==================*/
var trustee_dec = {
    type : jsPsychHtmlButtonResponse2,
    stimulus: function (){

        var inv_type        = jsPsych.data.get().select('coplayer_type').values[0];
        //console.log(data.trust);
        //console.log(tru_type);
        var alphas          = jsPsych.data.get().select(['alpha']).values;
        var betas           = jsPsych.data.get().select(['beta']).values;
        var mu_beta         = alphas[alphas.length-1]/(alphas[alphas.length-1]+betas[betas.length-1]);

        //console.log(mu_beta);
        get_trustor_dec(inv_type,mu_beta);
        
        var ret_dec = jsPsych.data.get().select('cur_trustor_dec').values[0];

        var trust_dec = (ret_dec)*3;
    return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
    "<p>Player A shared <strong>"+String(ret_dec)+"</strong>.</p>" +
    "<p>You have now <strong>"+String(trust_dec)+" points</strong>.</p><p>How much do you want to share with with Player A? You can share between 0 and "+String(trust_dec)+" points.</p>"},
    choices: function(){
        var ret_dec = jsPsych.data.get().select('cur_trustor_dec').values[0];
        var trust_dec = (ret_dec)*3;
        rec_ch = [];
        for (i=0; i<trust_dec+1; i++){
            rec_ch[i] = String(i);}
        return rec_ch},
    data: {trial: 'trustee_decision',task: 'tg', index_tg: jsPsych.timelineVariable('trial_count_tg')},

on_finish: function(data){
    data.trust = jsPsych.data.get().select('cur_trustor_dec').values[0];
    data.reciprocity = data.response;

        var alphas          = jsPsych.data.get().select(['alpha']).values;
        var betas           = jsPsych.data.get().select(['beta']).values;
    
        var rec_perc = data.reciprocity/(data.trust*3);
        //console.log(rec_perc);
        var shape_par           = update_exp_beliefs([rec_perc,alphas,betas]);
        //console.log(shape_par[0]);
        //console.log(shape_par[1]);

        data.alpha          = shape_par[0];
        data.beta           = shape_par[1];

        jsPsych.data.addProperties({cur_trustee_dec: data.response}),
        jsPsych.data.addProperties({cur_trial_dec: data.index_tg}),
        jsPsych.data.addProperties({cur_waiting_length: 0})}
}


var pres_trustee = {
    timeline: [trustee_dec],
    conditional_function: function(){
        var role = jsPsych.data.get().select('role').values[0];
        if (role=='0'){return true} else {return false}},
}





/* ====================== */
/* FEEDBACK */
/* ====================== */
var fb_trustor = {
    type : jsPsychHtmlKeyboardResponse,
    stimulus : function (){
        var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
        var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
        var mf = 3;
        var trustor_payoff = (10 - trust_dec)+rec_dec;
        var trustee_payoff = (trust_dec*mf)-rec_dec;
        //console.log(["TRUSTEE'S MULTIPLIER: " + String(mf)]);
        //console.log(["TRUSTOR'S PAYOFFS: " + String(trustor_payoff)]);
        //console.log(["TRUSTEE'S PAYOFFS: " + String(trustee_payoff)]);

        return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
        "<p>Player B sent <strong>"+String(rec_dec)+"</strong></p>"+
        "<p><strong><font color='blue'>You earned "+String(trustor_payoff)+"</font></strong></p>"+"<p>Player B earned <strong>"+String(trustee_payoff)+"</strong></p>"
    },
    trial_duration : fb_dur,
    data:{trial: 'feedback_trustor', task: 'tg', index_tg: jsPsych.timelineVariable('trial_count_tg'),
        trust: function (){var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]); return trust_dec},
        reciprocity: function (){ var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]); return rec_dec},
        fb_trustor_payoff: function (){ var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
            var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
            var trustor_payoff = (10 - trust_dec)+rec_dec; return trustor_payoff},
        fb_trustee_payoff: function (){ var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
            var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
            var trustee_payoff = (3*trust_dec)-rec_dec; return trustee_payoff}
    },
    on_finish: function(data){
    data.key_resp = data.response;
    data.response = 999;}   }

    var pres_fb_trustor = {
        timeline: [fb_trustor],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='1'){return true} else {return false}},
    }


    var fb_trustee = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : function (){
            var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
            var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
            var mf = 3;
            var trustor_payoff = (10 - trust_dec)+rec_dec;
            var trustee_payoff = (trust_dec*mf)-rec_dec;
            //console.log(["TRUSTEE'S MULTIPLIER: " + String(mf)]);
            //console.log(["TRUSTOR'S PAYOFFS: " + String(trustor_payoff)]);
            //console.log(["TRUSTEE'S PAYOFFS: " + String(trustee_payoff)]);
            
            return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
            "<p>Player A sent <strong>"+String(trust_dec)+"</strong></p>"+
            "<p><strong><font color='blue'>You earned "+String(trustee_payoff)+"</font></strong></p>"+"<p>Player A earned "+String(trustor_payoff)+"</p>"
        },
        trial_duration : fb_dur,
        data:{trial: 'feedback_trustee',task: 'tg', index_tg: jsPsych.timelineVariable('trial_count_tg'),
            trust: function (){var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]); return trust_dec},
            reciprocity: function (){var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]); return rec_dec},
            fb_trustor_payoff: function (){ var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
            var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
            var trustor_payoff = (10 - trust_dec)+rec_dec; return trustor_payoff},
            fb_trustee_payoff: function (){ var trust_dec = parseInt(jsPsych.data.get().select('cur_trustor_dec').values[0]);
                var rec_dec = parseInt(jsPsych.data.get().select('cur_trustee_dec').values[0]);
                var trustee_payoff = (3*trust_dec)-rec_dec; return trustee_payoff}
        },
        on_finish: function(data){
        data.key_resp = data.response;
        data.response = 999;}    }
    var pres_fb_trustee = {
        timeline: [fb_trustee],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='0'){return true} else {return false}},
    }

var task_procedure = {
    timeline: [wait_loop1,pres_trustor,wait_loop2,pres_trustee,pres_fb_trustor,pres_fb_trustee],
    timeline_variables: tg_stimuli
}
timeline_tg.push(task_procedure);

    return timeline_tg
}
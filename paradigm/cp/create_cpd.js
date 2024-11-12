
function create_cpd() {

    var timeline_cpd = [];
    jsPsych.data.addProperties({cur_waiting_length: 0})

    for (i=0;i<ntrials;i++){
   

/* ====================== */
/* MOVER 1 */
/* ====================== */
    var mover1 = {
        type : jsPsychHtmlButtonResponse2,
        stimulus : "<p>You have <strong>10 points</strong> and can decide whether you want to share any portion of this amount with your current partner. You can share nothing (0 points) or any amount up to the maximum amount (10 points). How much would you like to send?</p>",
        choices: function(){
            var tr_dec = [];
            for (i=0; i<11; i++){
                tr_dec[i] = String(i);}
            return tr_dec},
        data: {trial: 'mover1', task: 'cpd', index_cpd: i+1},
        extensions: [   {   type: jsPsychExtensionMouseTracking }
          ],

    on_finish: function(data){
        data.mover1 = data.response;
        //console.log (data.response);
        jsPsych.data.addProperties({cur_mover1_dec: data.mover1});
        jsPsych.data.addProperties({cur_trial_dec: data.index_cpd})

        resp = data.mouse_tracking_data;
        //console.log('Mouse tracking:')
        //console.log(resp.length);
        long_string = [];
        for(i=0;i<resp.length;i++){
            long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
        }
        //data.mouse = long_string.replace(/[^a-zA-Z0-9]/g,'_');
        data.mouse = long_string;
        //console.log(data.mouse);
                    saveDataToDb_trial_mover1()},
    }

    var pres_mover1 = {
        timeline: [mover1],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='1'){return true} else {return false}},
    }
    timeline_cpd.push(pres_mover1);




    var wait_period = {
        timeline : make_connection()};

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
            
            get_responses();
            var loc_trial = jsPsych.data.get().select('cur_trial_dec').values[0];
            var cur_trial = jsPsych.data.get().select('cur_index_trial').values[0];
            //console.log(cur_resp);
            if (loc_trial==cur_trial){
                get_responses_mover2();
                var cur_resp = jsPsych.data.get().select('cur_mover2_dec').values[0];
                var cur_mover2_length = jsPsych.data.get().select('cur_mover2_dec_length').values[0];

                if (Number.isInteger(cur_resp)==true & cur_mover2_length==cur_trial) {
                    return false} else {return true};
            } else if(data.waiting_length>max_waiting_period){return false} else {return true}
        }
    }
    timeline_cpd.push(wait_loop);

    var dropout_trial2 = {
        timeline: coplayer_dropout(),
        conditional_function: function (){
            var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
            return waiting_length>max_waiting_period
            }
        }
    timeline_cpd.push(dropout_trial2);





/*==================*/
/* MOVER 2 */
/*==================*/
var mover2 = {
    type : jsPsychHtmlButtonResponse2,
    stimulus : "<p>You have <strong>10 points</strong> and can decide whether you want to share any portion of this amount with your current partner. You can share nothing (0 points) or any amount up to the maximum amount (10 points). How much would you like to send?</p>",
    choices: function(){
        var tr_dec = [];
        for (i=0; i<11; i++){
            tr_dec[i] = String(i);}
        return tr_dec},
    data: {trial: 'mover2', task: 'cpd', index_cpd: i+1},
    extensions: [   {type: jsPsychExtensionMouseTracking}   ],

on_finish: function(data){
    data.mover2 = data.response;
    //console.log (data.response);
    jsPsych.data.addProperties({cur_mover2_dec: data.mover2});
    jsPsych.data.addProperties({cur_trial_dec: data.index_cpd});
    resp = data.mouse_tracking_data;
    long_string = [];
    for(i=0;i<resp.length;i++){
        long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
    }
    data.mouse = long_string;
    //console.log(data.mouse);
    saveDataToDb_trial_mover2()},
}

    var pres_mover2 = {
        timeline: [mover2],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='0'){return true} else {return false}},
    }
    timeline_cpd.push(pres_mover2);



    var wait_period = {
        timeline : make_connection()};

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
                
                get_responses();       
                var loc_trial = jsPsych.data.get().select('cur_trial_dec').values[0];
                var cur_trial = jsPsych.data.get().select('cur_index_trial').values[0];
                //console.log(cur_resp);
                if (loc_trial==cur_trial){
                    get_responses_mover1();
                    var cur_resp = jsPsych.data.get().select('cur_mover1_dec').values[0];
                    var cur_mover1_length = jsPsych.data.get().select('cur_mover1_length').values[0];

                    if (Number.isInteger(cur_resp)==true & cur_mover1_length==cur_trial) {
                        return false} else {return true}
                } else if (data.waiting_length>max_waiting_period){return false} else {return true};
            }
        }
    timeline_cpd.push(wait_loop);

    var dropout_trial1 = {
        timeline: coplayer_dropout(),
        conditional_function: function (){
            var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
            return waiting_length>max_waiting_period
            }
        }
    timeline_cpd.push(dropout_trial1);





/* ====================== */
/* FEEDBACK */
/* ====================== */
    var fb_mover1 = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : function (){
            var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
            var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

            //console.log(cur_mover1_dec);
            //console.log(cur_mover2_dec);

            m1_pi = 10 - cur_mover1_dec + (cur_mover2_dec*2);
            m2_pi = 10 - cur_mover2_dec + (cur_mover1_dec*2);
            
            return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
                "<p>You sent <strong>"+String(cur_mover1_dec)+"</strong></p>" +
                "<p>Your partner sent <strong>"+String(cur_mover2_dec)+"</strong></p>"+
                "<p><strong><font color='blue'>You earned "+String(m1_pi)+"</font></strong></p>"+"<p>Your partner earned <strong>"+String(m2_pi)+"</strong></p>"
        },
        trial_duration : fb_dur_cpd,
        data:{trial: 'feedback_mover1', task: 'cpd', index_cpd: i+1,
            payoff_mover1: function (){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                console.log(cur_mover1_dec);
                
                m1_pi = 10 - cur_mover1_dec + (cur_mover2_dec*2);
                return m1_pi
            },
            payoff_mover2: function(){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                console.log(cur_mover2_dec);

                m2_pi = 10 - cur_mover2_dec + (cur_mover1_dec*2);
                return m2_pi
            }
        },
        extensions: [   {type: jsPsychExtensionMouseTracking}   ],

        on_finish: function(data){
            resp = data.mouse_tracking_data;
            long_string = [];
            for(i=0;i<resp.length;i++){
                long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
            }
            data.mouse = long_string;
            //console.log(data.mouse);
        }
    }
    var pres_fb_mover1 = {
        timeline: [fb_mover1],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='1'){return true} else {return false}},
    }
    timeline_cpd.push(pres_fb_mover1);



    var fb_mover2 = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : function (){
            var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
            var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

            //console.log(cur_mover1_dec);
            //console.log(cur_mover2_dec);
            
            m1_pi = 10 - cur_mover1_dec + (cur_mover2_dec*2);
            m2_pi = 10 - cur_mover2_dec + (cur_mover1_dec*2);
            
            return "<p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p><p><font color='white'>WHITE SPACE</font></p>"+
                "<p>You sent <strong>"+String(cur_mover2_dec)+"</strong></p>" +
                "<p>Your partner sent <strong>"+String(cur_mover1_dec)+"</strong></p>"+
                "<p><strong><font color='blue'>You earned "+String(m2_pi)+"</font></strong></p>"+"<p>Your partner earned <strong>"+String(m1_pi)+"</strong></p>"
        },
        trial_duration : fb_dur_cpd,
        data:{trial: 'feedback_mover2', task: 'cpd', index_cpd: i+1,
            payoff_mover1: function (){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                console.log(cur_mover1_dec);
                
                m1_pi = 10 - cur_mover1_dec + (cur_mover2_dec*2);
                return m1_pi
            },
            payoff_mover2: function(){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                console.log(cur_mover2_dec);

                m2_pi = 10 - cur_mover2_dec + (cur_mover1_dec*2);
                return m2_pi
            }
        },
        extensions: [   {type: jsPsychExtensionMouseTracking}   ],
        
        on_finish: function(data){
            resp = data.mouse_tracking_data;
            long_string = [];
            for(i=0;i<resp.length;i++){
                long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
            }
            data.mouse = long_string;
            //console.log(data.mouse);
        }
    }

    var pres_fb_mover2 = {
        timeline: [fb_mover2],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='0'){return true} else {return false}},
    }
    timeline_cpd.push(pres_fb_mover2);
}

    return timeline_cpd
}



function create_hd_nsoc() {

    var timeline_hd = [];
    jsPsych.data.addProperties({cur_waiting_length: 0})

    for (i=0;i<ntrials;i++){
   

/* ====================== */
/* MOVER 1 */
/* ====================== */
    var mover1 = {
        type : jsPsychHtmlButtonResponse,
        stimulus : "<p>Which planet would you like to travel to?</p><p><font color='white'>WHITE SPACE</font></p>",
        choices: function(){
            if (player_choices[0]==1){
                return ['./stimulus/red_planet.jpg','./stimulus/blue_planet.jpg']}
            else{return ['./stimulus/blue_planet.jpg','./stimulus/red_planet.jpg']}
        },
        button_html: ['<img src=%choice% width="50%"></img>','<img src=%choice% width="50%"></img>'],
        margin_horizontal: '0px',
        data: {trial: 'mover1', task: 'hd', index_hd: i+1, cur_trial_coplayer_dec_dur: copl_dec_dur[i]},
        extensions: [   {   type: jsPsychExtensionMouseTracking }
          ],

    on_finish: function(data){
        data.mover1 = player_choices[data.response];
        //console.log (data.response);
        jsPsych.data.addProperties({cur_mover1_dec: data.mover1});
        jsPsych.data.addProperties({cur_trial_dec: data.index_hd});
        jsPsych.data.addProperties({cur_waiting_length: 0});
        console.log(data.index_hd);

        resp = data.mouse_tracking_data;
        //console.log('Mouse tracking:')
        //console.log(resp.length);
        long_string = [];
        for(i=0;i<resp.length;i++){
            long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
        }
        data.mouse = long_string;
        //console.log(data.mouse);

        var alphas_m1          = jsPsych.data.get().select(['alpha_mover1']).values;
        var betas_m1           = jsPsych.data.get().select(['beta_mover1']).values;
        
        var alphas_m2          = jsPsych.data.get().select(['alpha_mover2']).values;
        var betas_m2           = jsPsych.data.get().select(['beta_mover2']).values;

        var alpha   = [alphas_m2[alphas_m2.length-1],alphas_m1[alphas_m1.length-1]];
        var beta    = [betas_m2[betas_m2.length-1],betas_m1[betas_m1.length-1]];
        console.log('mover 1 beliefs: ');
        console.log(alpha);
        console.log(beta);

        if (data.index_hd==1){ var  beh = []; }
        else {
            var beh_m1          = jsPsych.data.get().select(['mover1']).values;
            var beh_m2          = jsPsych.data.get().select(['mover2']).values;
            console.log(beh_m1);
            console.log(beh_m2);
            var beh             = vec2mat(beh_m2,beh_m1);
        }
        var res = hd_model(beh, alpha, beta, tau);
        console.log(res);
        data.mover2     = res[0]; 
        jsPsych.data.addProperties({cur_mover2_dec: res[0]});
        data.alpha_mover1 = res[2][1];
        console.log(data.alpha_mover1);
        data.alpha_mover2 = res[2][0];
        data.beta_mover1 = res[3][1];
        data.beta_mover2 = res[3][0];
    },
    }

    var pres_mover1 = {
        timeline: [mover1],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='1'){return true} else {return false}},
    }
    timeline_hd.push(pres_mover1);




    var wait_period = {
        timeline : make_connection()};

    var wait_loop = {
        timeline: [wait_period],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            return role=='1';
        },
        loop_function: function(data){
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
    timeline_hd.push(wait_loop);

    var dropout_trial2 = {
        timeline: coplayer_dropout(),
        conditional_function: function (){
            var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
            return waiting_length>max_waiting_period
            }
        }
    timeline_hd.push(dropout_trial2);





/*==================*/
/* MOVER 2 */
/*==================*/
var mover2 = {
    type : jsPsychHtmlButtonResponse,
    stimulus : "<p>Which planet would you like to travel to?</p><p><font color='white'>WHITE SPACE</font></p>",
    choices: function(){
        if (player_choices[0]==1){
            return ['./stimulus/red_planet.jpg','./stimulus/blue_planet.jpg']}
        else{return ['./stimulus/blue_planet.jpg','./stimulus/red_planet.jpg']}
    },
    button_html: ['<img src=%choice% width="50%"></img>','<img src=%choice% width="50%"></img>'],
    margin_horizontal: '0px',
    data: {trial: 'mover2', task: 'hd', index_hd: i+1, cur_trial_coplayer_dec_dur: copl_dec_dur[i]},
    extensions: [   {type: jsPsychExtensionMouseTracking}   ],

on_finish: function(data){
    data.mover2 = player_choices[data.response];
    //console.log (data.response);
    jsPsych.data.addProperties({cur_mover2_dec: data.mover2});
    jsPsych.data.addProperties({cur_trial_dec: data.index_hd});
    jsPsych.data.addProperties({cur_waiting_length: 0});
    console.log(data.index_hd);

    resp = data.mouse_tracking_data;
    long_string = [];
    for(i=0;i<resp.length;i++){
        long_string += ['_x'+String(resp[i].x)+'y'+String(resp[i].y)+'t'+String(resp[i].t)];
    }
    data.mouse = long_string;
    //console.log(data.mouse);

    var alphas_m1          = jsPsych.data.get().select(['alpha_mover1']).values;
    var betas_m1           = jsPsych.data.get().select(['beta_mover1']).values;
    
    var alphas_m2          = jsPsych.data.get().select(['alpha_mover2']).values;
    var betas_m2           = jsPsych.data.get().select(['beta_mover2']).values;

    var alpha   = [alphas_m1[alphas_m1.length-1],alphas_m2[alphas_m2.length-1]];
    var beta    = [betas_m1[betas_m1.length-1],betas_m2[betas_m2.length-1]];
    console.log('mover 2 beliefs: ');
    console.log(alpha);
    console.log(beta);

    if (data.index_hd==1){ var  beh = []; }
    else {
        var beh_m1          = jsPsych.data.get().select(['mover1']).values;
        var beh_m2          = jsPsych.data.get().select(['mover2']).values;
        console.log(beh_m1);
        console.log(beh_m2);
        var beh             = vec2mat(beh_m1,beh_m2);
        console.log(beh);
    }
    var res = hd_model(beh, alpha, beta, tau);
    console.log(res);
    data.mover1     = res[0];
    jsPsych.data.addProperties({cur_mover1_dec: res[0]});
    data.alpha_mover1 = res[2][0];
    console.log(data.alpha_mover1);
    data.alpha_mover2 = res[2][1];
    data.beta_mover1 = res[3][0];
    data.beta_mover2 = res[3][1];
},
}

    var pres_mover2 = {
        timeline: [mover2],
        conditional_function: function(){
            var role = jsPsych.data.get().select('role').values[0];
            if (role=='0'){return true} else {return false}},
    }
    timeline_hd.push(pres_mover2);



    var wait_period = {
        timeline : make_connection()};

        var wait_loop = {
            timeline: [wait_period],
            conditional_function: function(){
                var role = jsPsych.data.get().select('role').values[0];
                return role=='0';
            },
            loop_function: function(data){
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
    timeline_hd.push(wait_loop);

    var dropout_trial1 = {
        timeline: coplayer_dropout(),
        conditional_function: function (){
            var waiting_length = jsPsych.data.get().select('cur_waiting_length').values[0];
            return waiting_length>max_waiting_period
            }
        }
    timeline_hd.push(dropout_trial1);





/* ====================== */
/* FEEDBACK */
/* ====================== */
    var fb_mover1 = {
        type : jsPsychHtmlButtonResponse2,
        stimulus : function (){
            var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
            var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

            //console.log(cur_mover1_dec);
            //console.log(cur_mover2_dec);

            if (cur_mover1_dec==cur_mover2_dec){
                if (cur_mover1_dec==0) // blue planet
                {return "<div width='50%'><p>You both flew to the <strong><font color='blue'>BLUE</font></strong> planet.</p><p>You <strong>earned "+String(points[3])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[3])+" points too.</p>"+
                "<img src='./stimulus/instructions/slide03.jpg' width='50%'></img></div>"
                }
                else // red planet
                {return "<div width='50%'><p>You both flew to the <strong><font color='red'>RED</font></strong> planet.</p><p>You <strong>earned "+String(points[0])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[0])+" points too.</p>" +
                    "<img src='./stimulus/instructions/slide06.jpg' width='50%'></img></div>"}
            }
            else {
                if (cur_mover1_dec==0) // blue planet
                {return "<div width='50%'><p>You flew to the <strong><font color='blue'>BLUE</font></strong> planet while your coplayer flew to the RED planet.</p><p>You <strong>earned "+String(points[2])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[1])+" points.</p>"+
                    "<img src='./stimulus/instructions/slide04.jpg' width='50%'></img></div>"}
                else // red planet
                {return "<div width='50%'><p>You flew to the <strong><font color='red'>RED</font></strong> planet while your coplayer flew to the BLUE planet.</p><p>You <strong>earned "+String(points[1])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[2])+" points.</p>"+
                    "<img src='./stimulus/instructions/slide05.jpg' width='50%'></img></div>"}
            }
        },
        choices: ['./stimulus/spaceship.jpg'],
        button_html: '<img src=%choice%  width="20%"></img>',
        data:{trial: 'feedback_mover1', task: 'hd', index_hd: i+1,
            payoff_mover1: function (){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);
                
                if (cur_mover1_dec==cur_mover2_dec){
                    if (cur_mover1_dec==0) // blue
                    {return points[3]}
                    else // red
                    {return points[0]}
                }
                else {
                    if (cur_mover1_dec==0) // blue
                    {return points[2]}
                    else // red
                    {return points[1]}
                }

            },
            payoff_mover2: function(){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                if (cur_mover1_dec==cur_mover2_dec){
                    if (cur_mover1_dec==0) // blue
                    {return points[3]}
                    else // red
                    {return points[0]}
                }
                else {
                    if (cur_mover1_dec==0) // blue
                    {return points[1]}
                    else // red
                    {return points[2]}
                }
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
    timeline_hd.push(pres_fb_mover1);



    var fb_mover2 = {
        type : jsPsychHtmlButtonResponse2,
        stimulus : function (){
            var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
            var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

            //console.log(cur_mover1_dec);
            //console.log(cur_mover2_dec);

            if (cur_mover1_dec==cur_mover2_dec){
                if (cur_mover1_dec==0) // blue
                {return "<div width='50%'><p>You both flew to the <strong><font color='blue'>BLUE</font></strong> planet.</p><p>You <strong>earned "+String(points[3])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[3])+" points too.</p>"+
                "<img src='./stimulus/instructions/slide03.jpg' width='50%'></img></div>"
                }
                else // red
                {return "<div width='50%'><p>You both flew to the <strong><font color='red'>RED</font></strong> planet.</p><p>You <strong>earned "+String(points[0])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[0])+" points too.</p>" +
                    "<img src='./stimulus/instructions/slide06.jpg' width='50%'></img></div>"}
            }
            else {
                if (cur_mover2_dec==0) // blue
                {return "<div width='50%'><p>You flew to the <strong><font color='blue'>BLUE</font></strong> planet while your coplayer flew to the RED planet.</p><p>You <strong>earned "+String(points[2])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[1])+" points.</p>"+
                    "<img src='./stimulus/instructions/slide04.jpg' width='50%'></img></div>"}
                else // red
                {return "<div width='50%'><p>You flew to the <strong><font color='red'>RED</font></strong> planet while your coplayer flew to the BLUE planet.</p><p>You <strong>earned "+String(points[1])+" points.</strong></p>" +
                "<p>Your coplayer earned "+String(points[2])+" points.</p>"+
                    "<img src='./stimulus/instructions/slide05.jpg' width='50%'></img></div>"}
            }
        },
        choices: ['./stimulus/spaceship.jpg'],
        button_html: '<img src=%choice%  width="20%"></img>',
        data:{trial: 'feedback_mover2', task: 'hd', index_hd: i+1,
            payoff_mover1: function (){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                if (cur_mover1_dec==cur_mover2_dec){
                    if (cur_mover1_dec==0) // blue
                    {return points[3]}
                    else // red
                    {return points[0]}
                }
                else {
                    if (cur_mover1_dec==0) // blue
                    {return points[2]}
                    else // red
                    {return points[1]}
                }

            },
            payoff_mover2: function(){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                if (cur_mover1_dec==cur_mover2_dec){
                    if (cur_mover1_dec==0) // blue
                    {return points[3]}
                    else // red
                    {return points[0]}
                }
                else {
                    if (cur_mover1_dec==0) // blue
                    {return points[1]}
                    else // red
                    {return points[2]}
                }
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
    timeline_hd.push(pres_fb_mover2);
}
console.log(timeline_hd);
    return timeline_hd
}

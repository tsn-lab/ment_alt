

function create_hd() {

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
        data: {trial: 'mover1', task: 'hd', index_hd: i+1},
        extensions: [   {   type: jsPsychExtensionMouseTracking }
          ],

    on_finish: function(data){
        data.mover1 = player_choices[data.response];
        //console.log (data.response);
        jsPsych.data.addProperties({cur_mover1_dec: data.mover1});
        jsPsych.data.addProperties({cur_trial_dec: data.index_hd})

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
    data: {trial: 'mover2', task: 'hd', index_hd: i+1},
    extensions: [   {type: jsPsychExtensionMouseTracking}   ],

on_finish: function(data){
    data.mover2 = player_choices[data.response];
    //console.log (data.response);
    jsPsych.data.addProperties({cur_mover2_dec: data.mover2});
    jsPsych.data.addProperties({cur_trial_dec: data.index_hd});
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

                console.log(cur_mover1_dec);
                console.log(cur_mover2_dec);
                
                if (cur_mover1_dec==cur_mover2_dec){
                    if (cur_mover1_dec==0) // blue
                    {return points[3]}
                    else // red
                    {return points[0]}
                }
                else {
                    if (cur_mover1_dec==0) // blue
                    {return points[2]}
                    else // hawk
                    {return points[1]}
                }

            },
            payoff_mover2: function(){
                var cur_mover1_dec = parseInt(jsPsych.data.get().select('cur_mover1_dec').values[0]);
                var cur_mover2_dec = parseInt(jsPsych.data.get().select('cur_mover2_dec').values[0]);

                
                console.log(cur_mover1_dec);
                console.log(cur_mover2_dec);

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
                else // hawk
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
                    else // hawk
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

    return timeline_hd
}

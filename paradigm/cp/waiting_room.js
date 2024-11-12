


function create_waiting_room(){

    var timeline_waiting_room = [];

    var waiting_room_ins = {
        type: jsPsychHtmlKeyboardResponse,
        choices: "NO_KEYS",
        stimulus : "<p>Thank you for staying with us until now. We request you to wait a bit longer so that the other participant is also ready to start the game. Based on our experience, this might take up to 5 minutes. However, we will let you know if the game can be started earlier. We appreciate your patience.</p>"+"<p><strong>The countdown will start shortly.</strong></p>",
        trial_duration : waiting_room_ins_time,
        data : {trial: 'instructions', task: 'waiting_room'}
    }
    timeline_waiting_room.push(waiting_room_ins);

    var nm=0; var ns=0;

    var first_count_down_pres = {
        type: jsPsychHtmlKeyboardResponse,
        choices: "NO_KEYS",
        stimulus: function (){
            check_status();
            
            return make_count_down([nm,ns])
        },
        trial_duration: wait_waiting_room*2,
        data : {trial: 'first_count_down', task: 'waiting_room'},
        on_finish: function(){
            saveDataToDb_list();
            var this_coplayer = jsPsych.data.get().select('controller').values[0];
            var this_worker_id = jsPsych.data.get().select('worker_ID').values[0];
            jsPsych.data.addProperties({mover1_id: '0', mover2_id: '0'});
            if (this_coplayer=='1'){
                jsPsych.data.addProperties({controller_id: this_worker_id, controlled_id: '0'});
            } else if (this_coplayer=='0'){
                jsPsych.data.addProperties({controlled_id: this_worker_id, controller_id: '0'});
        }}
    }
    timeline_waiting_room.push(first_count_down_pres);


    var count_down_pres = {
        type: jsPsychHtmlKeyboardResponse,
        choices: "NO_KEYS",
        stimulus: function(){
            ns=ns+1;
            if (ns==60){ns=0}
            else if(ns==1){nm=nm+1;};

            return make_count_down([nm,ns])
        },
        trial_duration: wait_waiting_room,
        data : {trial: 'count_down', task: 'waiting_room'}
    }

    var cur_count_down = 0;

    var wait_loop = {
        timeline: [count_down_pres],
        loop_function: function (){
            cur_count_down=cur_count_down+1;
            return check_count_down(cur_count_down)}
    }
    timeline_waiting_room.push(wait_loop);
    

    return timeline_waiting_room
}



function make_count_down ([nm,ns]){

    var tot_sec = 60;
    var tot_min = max_waiting_room_period/(tot_sec*1000); // max_waiting_room_period in milliseconds
    var min_c = String(tot_min-nm);

    if (ns==0){
        var sec_c = '00';
        } else if(ns>50){ var sec_c = '0'+String(tot_sec-ns);
    } else { var sec_c = String(tot_sec-ns);}

    var message = "<p>Thank you for staying with us until now. We request you to wait a bit longer so that the other participant is also ready to start the game. Based on our experience, this might take up to 5 minutes. However, we will let you know if the game can be started earlier. We appreciate your patience.</p>";
        message += "<p><strong>"+min_c+" : "+sec_c+"</strong></p>";

    return message
}




function check_count_down (cur_count_down){
    var coplayer_ready = check_waiting_room();
        if (!coplayer_ready){
            return coplayer_ready                
        } else {return cur_count_down<(max_waiting_room_period/wait_for_start)}
}



function check_waiting_room(){

    var this_coplayer = jsPsych.data.get().select('controller').values[0];
    var coplayer_ready = true;

    if (this_coplayer=='0'){
        // Controlled participant
        check_controller_id();
        var result_check = jsPsych.data.get().select('controller_id').values[0];
        var cur_mover2_id = jsPsych.data.get().select('mover2_id').values[0];

        if (result_check!=0 & cur_mover2_id=='0'){
            get_role();
            var assign_role = jsPsych.data.get().select('role').values[0];
            var this_player = jsPsych.data.get().select('controlled_id').values[0];
            if (assign_role=='1'){
                jsPsych.data.addProperties({mover1_id: this_player, mover2_id: result_check, tot_players: 2});  coplayer_ready=false;
            } else if (assign_role=='0'){jsPsych.data.addProperties({mover2_id: this_player, mover1_id: result_check, tot_players: 2}); coplayer_ready=false;}
        }

    } else if (this_coplayer=='1'){
        // Controller
        check_controlled_id();
        var result_check = jsPsych.data.get().select('controlled_id').values[0];
        if (result_check!=0 & result_check!=undefined & result_check!=null){
            var assign_role = Math.round(Math.random());
            
            var this_player = jsPsych.data.get().select('controller_id').values[0];
            jsPsych.data.addProperties({role: String(assign_role), role_assignment: String(assign_role)});
            if (assign_role==1){
                jsPsych.data.addProperties({mover1_id: this_player, mover2_id: result_check, tot_players: 2});
            } else {jsPsych.data.addProperties({mover2_id: this_player, mover1_id: result_check, tot_players: 2});}

            //console.log(result_check);
            saveDataToDb_pairs();
            coplayer_ready=false;
        }
    }

    return coplayer_ready
}

    
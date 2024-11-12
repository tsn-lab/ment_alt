// build functions to use across tasks

function gaussian(mean, stddev) {
  return function() {
      var V1
      var V2
      var S
      do{
          var U1 = Math.random()
          var U2 = Math.random()
          V1 = 2.0*U1-1.0
          V2 = 2.0*U2-1.0
          S = V1*V1+V2*V2
      }while(S >= 1.0)
      if(S===0) return 0
      return mean+stddev*(V1*Math.sqrt(-2.0*Math.log(S)/S))
  }
}

function generate_rand_card_numb(){
  
  var card_numb = Math.floor(Math.random() * 9) + 1;

  while(card_numb==5){card_numb = Math.floor(Math.random() * 9) + 1;}

  return card_numb
}


/*====================================*/
/*Functions for Modeled Decisions*/
/*====================================*/

function update_exp_beliefs([data,alpha,beta]){
  var N           = 40;
  
  //console.log(data);
  //console.log(alpha[alpha.length-1]);
  //console.log(beta[beta.length-1]);
  //console.log(alpha);
  //console.log(beta);
  var alpha_new   = alpha[alpha.length-1] + N*data;
  var beta_new    = beta[beta.length-1] + N*(1-data);
  if (alpha_new<1){alpha_new=1};
  if (beta_new<1){beta_new=1};

  return [alpha_new,beta_new];
};


function update_exp_bel_tag([data,alpha,beta]){
  
  //console.log(data);
  //console.log(alpha[alpha.length-1]);
  //console.log(beta[beta.length-1]);
  //console.log(alpha);
  //console.log(beta);
  var alpha_new   = alpha[alpha.length-1] + data;
  var beta_new    = beta[beta.length-1] + (1-data);
  if (alpha_new<1){alpha_new=1};
  if (beta_new<1){beta_new=1};

  return [alpha_new,beta_new];
};


// TRUSTOR
function get_trustor_dec(tau_indx,mu_beta){

  taus            = [.3,.5,.7];
  tau             = taus[tau_indx];

  //console.log(tau);
  //console.log(mu_beta);

  // Define game parameters
  var investments = [0,1,2,3,4,5,6,7,8,9,10];
  var endow_inv   = 10;
  var trustee_end = [0,3,6,9,12,15,18,21,24,27,30];

  var temp        = 8;

  var nom_soft   = [];
  var den_soft   = 0;
  var rec        = [];
  var us         = [];
  for (i=0; i<investments.length; i++){
    rec[i]       = mu_beta*trustee_end[i];
    us[i]        = endow_inv - (1-tau)*investments[i] + tau*rec[i];
    nom_soft[i]  = Math.exp(temp * us[i]);
    den_soft     = den_soft + nom_soft[i];
  }
  //console.log(nom_soft);
  //console.log(den_soft);

  var prob      = [];
  for (i=0; i<nom_soft.length; i++){
    prob[i]     = nom_soft[i]/den_soft;
  }
  //console.log(prob);

  if (containNaN(prob)){
    var trust_dec = max_wo_nan(us);}
  else {  var trust_dec = sample_dec(prob); }
  jsPsych.data.addProperties({cur_trustor_dec: trust_dec})
};


function get_trustee_dec(tru_type,trust,alpha,beta){

  temp          = .8;
  plan          = 5;
  chis          = [.3,.4,.5];

  inv_endow     = 10;
  tru_endow     = 0;
  mf            = 3;
  
  eta           = trust*mf + tru_endow;
  chi           = chis[tru_type];

  //console.log(['cur alpha: ' +String(alpha)]);
  //console.log(['cur beta: ' +String(beta)]);
  //console.log(['cur chi: ' + String(chi)]);

  u             = [...Array(31).fill(0)];

  for (np=0; np<plan+1; np++){
    max_endow     = trust*mf + tru_endow +1;
    //console.log(['cur max endow: ' +String(max_endow)]);
    recs          = [];
    for (i=0; i<max_endow; i++){
      recs[i]     = i;
    }

    //console.log(['cur recs: ']);
    //console.log(recs);

    var payoff_inv    = [];
    var payoff_tru    = [];

    for (i=0; i<recs.length; i++){
    payoff_inv[i]    = inv_endow - trust + recs[i];
    payoff_tru[i]    = eta - recs[i];

    //console.log(payoff_diff[i])
    //console.log(tot_endow);
    //console.log(Math.pow(payoff_diff[i]/tot_endow,2));
    u[i]        = eta - chi * Math.max(payoff_inv[i] - payoff_tru[i], payoff_tru[i] - payoff_inv[i]) - (1 - chi) * recs[i];
  }

    trust = Math.round(jStat.beta.sample(alpha,beta) * inv_endow);

    //console.log('utilities and next trust');
    //console.log(u);
    //console.log(trust);
  }

  var nom_soft  = [];
  var den_soft  = 0;
  for (i=0; i<u.length; i++){
    nom_soft[i]             = Math.exp( temp * u[i] );
    den_soft                = den_soft + nom_soft[i];
  }
  //console.log(nom_soft);
  //console.log(den_soft);

  var prob      = [];
  for (i=0; i<nom_soft.length; i++){
    prob[i]     = nom_soft[i]/den_soft;
  }
  //console.log(prob);

  if (containNaN(prob)){
    var rec_dec = max_wo_nan(u);}
  else {  var rec_dec = sample_dec(prob); }
  jsPsych.data.addProperties({cur_trustee_dec: rec_dec});
  //console.log(['rec_dec: '+String(rec_dec)]);

  //return rec_dec
};


function get_advisee_dec(advisee_type,adv_numb,alpha,beta){


  if (adv_numb==0){ if (Math.random()>.5){var act=1;} else {var act=0;}}
  else {

    var rec_endow = 10;
    var cards   = [1,2,3,4,6,7,8,9];
    var chis    = [.5,1,1.5];
    var chi     = chis[advisee_type];

    var p_h     = compute_cvar(chi,alpha,beta);
    var ps_h    = [1-p_h,p_h];

    var ps_win  = softmax(cards);
    var p_win   = ps_win[adv_numb-1];

    var us      = [];
    for (i=0; i<2; i++){
      us[i]     = ps_h[i]*rec_endow * ( p_win*(p_win>.5) + (1-p_win)*(p_win<.5) ); // [ps(dishonesty),ps(honesty)] for k=0
    }
    var ps      = softmax(us);
    var act     = sample_dec(ps);
  }

  //console.log(adv_numb);
  //console.log(act);

  jsPsych.data.addProperties({cur_advisee_dec: act});
}

function get_advisor_dec(adv_type,alpha,beta){

  var adv_win     = 10;
  var taus        = [.1,.5,.9];
  var tau         = taus[adv_type];
  var expect      = [.5,alpha/(alpha+beta)];
  var adv_endow   = 10;
  var cost        = 3;
    
  var us          = [];
  for (i=0; i<2; i++){ 
        us[i]     = adv_endow - (1-tau)*cost + tau*adv_win*expect[i];
      }

  var ps      = softmax(us);
  var act     = sample_dec(ps);

  if (act==0){var advice_dec = 2} else { if (Math.random()>.5) {var advice_dec = 1;} else {var advice_dec = 0;}}
  jsPsych.data.addProperties({cur_advice_dec: advice_dec});
}


function sample_dec(prob){

  var N          = 1000;
  var ap         = [];
  var tot_weights= 0;
  for (i=0; i<prob.length; i++){
    ap[i]        = Math.round(N*prob[i]);
    tot_weights  = tot_weights + ap[i];
  }
  //console.log(ap);
  //console.log(tot_weights);
  var weight_act = new Array;

  for (var i=0; i<ap.length; i++){
    for (var j=0; j<ap[i]; j++){
      weight_act[weight_act.length] = i;
    }
  }
  //console.log(weight_act);

  var rand_ind = Math.round(Math.random()*tot_weights);
  var trust    = weight_act[rand_ind];
  return trust
};


function softmax(qs) {
  var temp = .8;
  const nom_soft = qs.map(function(x){ return Math.exp(temp*x) });
  const den_soft = nom_soft.reduce((a, b) => a + b, 0);
  return nom_soft.map(x => x / den_soft);
}


function compute_cvar(cv_thr,alpha,beta){

    const steps = 10000;
    const dx = Array.from({ length: steps - 1 }, (_, i) => (i + 1) / steps);
    let new_ps = 0;

    if (cv_thr === 0) {
        new_ps = 0;
    } else if (cv_thr === 1) {
        new_ps = alpha / (alpha + beta);
    } else if (cv_thr === 2) {
        new_ps = 1;
    } else if (cv_thr > 0 && cv_thr < 1) {
        const x_var = jStat.beta.inv(cv_thr, alpha, beta);
        const dx_var = dx.filter((val) => val < x_var);
        const y_cvar = dx_var.map((val) => jStat.beta.pdf(val, alpha, beta));
        new_ps = y_cvar.reduce((sum, val, index) => sum + val * dx_var[index] / steps, 0) * (1 / cv_thr);
    } else if (cv_thr > 1 && cv_thr < 2) {
        const x_var = jStat.beta.inv(cv_thr - 1, alpha, beta);
        const dx_var = dx.filter((val) => val > x_var);
        const y_cvar = dx_var.map((val) => jStat.beta.pdf(val, alpha, beta));
        new_ps = y_cvar.reduce((sum, val, index) => sum + val * dx_var[index] / steps, 0) * (1 / (2 - cv_thr));
    }

    return new_ps
}

function vec2mat(other,me) {

  const matrix = [];

  for (let i = 0; i < other.length; i++) {
    matrix.push([other[i], me[i]]);
  }

  return matrix;
}

function containNaN(vector) {
  return vector.some(Number.isNaN);
}

function max_wo_nan(vector){
  // Filter out NaN values
  let filtered_vec = vector.filter(value => !Number.isNaN(value));
  
  // Find the maximum value in the filtered array
  return Math.max(...filtered_vec);
}

/*====================================*/
/*Functions for Single-Player HD*/
/*====================================*/
function hd_model(beh, alpha, beta, tau) {
  let gamma = [];
  let p_irr = [0, 1];
  let p_tru = [0, 1];

  // Game parameters
  const cp = [5, 10]; // cooperation payoff for other's defection-cooperation
  const dp = [0, 25]; // defection payoff for other's defection-cooperation

  if (!beh || beh.length === 0) {
    // Compute action utilities using priors
    var us = [(1 - tau) * mean(dp), tau * mean(cp)];
  } else {
    // Compute partner's cooperation with updated beliefs
    const result = act_probo(beh, alpha, beta);
    const po = result[0];
    alpha = result[1];
    beta = result[2];

    // Compute action utilities
    console.log('beh:')
    console.log(beh);
    console.log(beh[beh.length - 1][1]);
    console.log(beh[beh.length - 1][0]);

    const ui = [(1 - tau) * sum(po.map((p, i) => p * dp[i])), tau * sum(po.map((p, i) => p * cp[i]))];
    gamma = parseFloat(stra_po(alpha[0], beta[0]));
    const alt_a = [-4* (beh[beh.length - 1][1] - .5), 4* (beh[beh.length - 1][1] - .5)];
    us = [ gamma * alt_a[0] + (1 - gamma) * ui[0], gamma * alt_a[1] + (1 - gamma) * ui[1]];

    console.log('ui:')
    console.log(ui);
    console.log('us:')
    console.log(us);
    console.log(gamma);

    // Estimate irritation
    p_irr = it_probo(beh.map(b => b[1]), 0);
    // Estimate trustworthiness
    p_tru = it_probo(beh.map(b => b[1]), 1);
  }
  console.log(p_irr);
  console.log(p_tru);

  // Select an action
  let act, ps;
  if (p_irr[0] > p_tru[0]) {
    if (randsample(p_irr.length, 1, true, p_irr) === 0) {
      act = 0;
      ps = 0;
    } else {
      const policyResult = policy(us);
      act = policyResult[0];
      ps = policyResult[1];
    }
  } else {
    if (randsample(p_tru.length, 1, true, p_tru) === 0) {
      act = 1;
      ps = 0;
    } else {
      const policyResult = policy(us);
      act = policyResult[0];
      ps = policyResult[1];
    }
  }
  console.log(gamma);
  console.log(ps);
  console.log([act, alpha, beta]);

  return [act, ps, alpha, beta];
}

function it_probo(beh, act) {
  // Set exponential starting point and decay
  const N = -2;
  const gamma = 0.9;

  // Eliminate first trial
  beh.shift();
  const nt = beh.length;

  // Find same behavior
  const indx = beh.slice(1).map((b, i) => b - beh[i]);
  console.log('it_probo');
  console.log(indx);

  // Look for same defections/cooperation
  const ds = beh.map((b, i) => (indx[i] === 0 && b === act ? 1 : 0));
  const t = ds.map((d, i) => (d === 1 ? i : null)).filter(i => i !== null);
  console.log(ds);
  console.log(t);

  // Exponential decay
  const decay = t.map(ti => Math.pow(gamma, nt - ti));
  console.log(decay);

  // Determine decayed values for repeated defection/cooperation
  const irr = N + sum(t.map((ti, i) => decay[i] * ds[ti]));

  // Irritation/Trustworthiness probability
  const p_irr = 1 / (1 + Math.exp(-irr));
  return [p_irr, 1 - p_irr];
}

function stra_po(alpha, beta) {
  // Computing the partner's strategy policy
  const cv_thr = 0.5;
  const steps = 10000;
  const dx = Array.from({ length: steps }, (_, i) => (i + 1) / steps);

  const po = alpha / (alpha + beta);

  let x_var;
  if (po > cv_thr) {
    x_var = jStat.beta.inv(cv_thr, beta, alpha);
  } else {
    x_var = jStat.beta.inv(cv_thr, alpha, beta);
  }

  const dx_var = dx.filter(x => x < x_var);
  const y_cvar = dx_var.map(x => jStat.beta.pdf(x, alpha, beta));
  const gamma = sum(y_cvar.map((y, i) => y * dx_var[i] / (steps + 1))) * (1 / (cv_thr * cv_thr));

  return gamma;
}

function act_probo(beh, alpha, beta) {
  // Game parameters
  const cp = [5, 10]; // cooperation payoff for other's defection-cooperation
  const dp = [0, 25]; // defection payoff for other's defection-cooperation

  console.log('act_probo');
  console.log(alpha);
  console.log(beta);
  console.log(beh);
  // Update the partner's beliefs about me
  const result1 = update_beliefs(beh.map(b => b[1]), alpha[1], beta[1]);
  const tau1 = result1[0];
  alpha[1] = result1[1];
  beta[1] = result1[2];
  console.log(result1);

  // Compute my action probability from their point of view
  const hd_model_result = hd_model([], [], [], tau1);
  const po = hd_model_result[1];
  console.log(hd_model_result);

  // Update my beliefs about the other's tau based on their average behavior
  const result2 = update_beliefs(beh.map(b => b[0]), alpha[0], beta[0]);
  const tau2 = result2[0];
  alpha[0] = result2[1];
  beta[0] = result2[2];
  console.log(result2);

  // Compute other's utility
  const us = [(1 - tau2) * sum(po.map((p, i) => p * dp[i])), tau2 * sum(po.map((p, i) => p * cp[i]))];

  // Other's policy
  const policyResult = policy(us);
  const ps = policyResult[1];
  console.log(policyResult)

  return [ps, alpha, beta];
}

function update_beliefs(acts, alpha, beta) {
  const N = 40;
  const beh = acts[acts.length - 1] === 1 ? 1 : 0;

  alpha += N * beh;
  beta += N * (1 - beh);
  const tau = alpha / (alpha + beta);

  return [tau, alpha, beta];
}

function policy(us) {
  const temp = 0.4;

  const expUs = us.map(u => Math.exp(temp * u));
  const ps = expUs.map(u => u / sum(expUs));
  const act = randsample(ps.length, 1, true, ps);

  return [act, ps];
}

// Utility functions
function mean(arr) {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

function randsample(length, n, replace, weights) {
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }
  const totalWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomValue = Math.random() * totalWeight;
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (randomValue < cumulativeWeights[i]) {
      return i;
    }
  }
}






/*====================================*/
/*Functions for Multi-Player Decisions*/
/*====================================*/

function get_responses(){
  var role = jsPsych.data.get().select('role').values[0];
  // console.log(role);
  if (role=='1'){
      return get_trial_mover2();
  } else {return get_trial_mover1();}
}

function get_responses_tg(){
  var role = jsPsych.data.get().select('role').values[0];
  // console.log(role);
  if (role=='1'){
      return get_trial_trustee();
  } else {return get_trial_trustor();}
}

// Trustor waiting for trustee
function get_responses_mover2(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_mover2.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      // console.log(this.response);
      get_mover2_response(response);
      //jsPsych.data.addProperties({cur_response: response})
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}

// Trustee waiting for trustor
function get_responses_mover1(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_mover1.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      // console.log(this.response);
      get_mover1_response(response);
      //jsPsych.data.addProperties({cur_response: response})
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}


// Trustee waiting for trustor
function get_responses_trustor(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_trustor.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      // console.log(this.response);
      get_trustor_response(response);
      //jsPsych.data.addProperties({cur_response: response})
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}

function get_responses_trustee(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_trustee.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      // console.log(this.response);
      get_trustee_response(response);
      //jsPsych.data.addProperties({cur_response: response})
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}


function get_mover2_response(response){
  var rp=JSON.parse(response);  var resp = rp[rp.length-1];
  // console.log(rp.length);
  // console.log(resp);
  jsPsych.data.addProperties({cur_mover2_dec: resp, cur_mover2_dec_length: rp.length});
}

function get_mover1_response(response){
  var rp=JSON.parse(response);  var resp = rp[rp.length-1];
  //console.log(rp.length);
  //console.log(resp);
  jsPsych.data.addProperties({cur_mover1_dec: resp, cur_mover1_length: rp.length});
}

function get_trustor_response(response){
  var rp=JSON.parse(response);  var resp = rp[rp.length-1];
  // console.log(rp.length);
  // console.log(resp);
  jsPsych.data.addProperties({cur_trustor_dec: resp, cur_trustor_length: rp.length});
}

function get_trustee_response(response){
  var rp=JSON.parse(response);  var resp = rp[rp.length-1];
  // console.log(rp.length);
  // console.log(resp);
  jsPsych.data.addProperties({cur_trustee_dec: resp, cur_trustee_length: rp.length});
}


function get_trial_mover2(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_trial_mover2.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      var rp=JSON.parse(response);  var resp = rp[rp.length-1];
      // console.log(resp);
      jsPsych.data.addProperties({cur_index_trial: resp})
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}

function get_trial_mover1(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_trial_mover1.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      var rp=JSON.parse(response);  var resp = rp[rp.length-1];
      // console.log(resp);
      jsPsych.data.addProperties({cur_index_trial: resp});
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}


function get_trial_trustor(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_trial_trustor.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      var rp=JSON.parse(response);  var resp = rp[rp.length-1];
      // console.log(resp);
      jsPsych.data.addProperties({cur_index_trial: resp});
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}


function get_trial_trustee(){
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status_trial_trustee.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      var rp=JSON.parse(response);  var resp = rp[rp.length-1];
      // console.log(resp);
      jsPsych.data.addProperties({cur_index_trial: resp})
    }
  };
//xhr.send(jsPsych.data.get().json());
xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}

function check_status() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_status.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      //console.log(response);
      get_check_response(response)
    }
  };
xhr.send(jsPsych.data.get().json()); //for jspsych's version
}

function get_check_response(response){
  var cur_count = parseFloat(response)+1;
  //console.log(cur_count);
  //console.log(cur_count % 2 == 0);
  if (cur_count % 2 == 0){
  jsPsych.data.addProperties({controller: '0'})} //controlled participants
  else {jsPsych.data.addProperties({controller: '1'})}; //controller
}


function check_controlled_id(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_controlled_id.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      var rp=JSON.parse(response);
      controlled_id_status(rp)
    }
  };
xhr.send(jsPsych.data.get().json()); //for jspsych's version
}

function controlled_id_status(response){
  //console.log(response);
  var resp = response[response.length-1];
  //console.log(resp);
  jsPsych.data.addProperties({controlled_id: resp});
}

function check_controller_id(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_controller_id.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      //console.log(response);
      controller_id_status(response)
    }
  };
xhr.send(jsPsych.data.get().json()); //for jspsych's version
}

function controller_id_status(response){
  //console.log(response);
  jsPsych.data.addProperties({controller_id: response});
  /*if (response != 0){
    jsPsych.data.addProperties({tot_players: 2});
  } else {jsPsych.data.addProperties({tot_players: 1});}*/
}


function get_role() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_role_status.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      response = xhr.response;
      //console.log(response);
      get_role_response(response)
    }
  };
xhr.send(jsPsych.data.get().json()); //for jspsych's version
}

function get_role_response(response){
  // console.log(response);
  if (response=='1'){
  jsPsych.data.addProperties({role: String(0)})} //trustee
  else {jsPsych.data.addProperties({role: String(1)})}; //trustor
}


function check_exclusion() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/get_exclusion.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      var excl = xhr.response;
      // console.log(excl);
      //response = xhr.response;
      get_excl_resp(excl)
    }
  };
xhr.send(jsPsych.data.get().json()); //for jspsych's version
}

function get_excl_resp(response){
  //console.log(response);
  jsPsych.data.addProperties({excl_part: response})
}

/*function check_part(){
  var excl_part = jsPsych.data.get().select("excl_part").values[0];
  if (excl_part!=0){return false}
  else if (excl_part==0){return true};
}*/
function check_part(){
  var excl_part = jsPsych.data.get().select("excl_part").values[0];
  //console.log(excl_part);
  if (excl_part==1){return false}
  else if (excl_part==0){return true};
}

function check_test(){
  var correct_ans = jsPsych.data.get().select("quiz_test_correct").sum();
  var quest_num = jsPsych.data.get().select("question_count").sum();
  var accuracy = correct_ans/quest_num;
  if (accuracy<.7){return false;}
  else {return true;}
};


function saveDataToDb_trial_mover1() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_trial_mover1.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log(response.success)
      //console.log(response);
      //console.log('status 200');
    }
  };
  //xhr.send(jsPsych.data.get().json()); //for jspsych's version
  xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}

function saveDataToDb_trial_mover2() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_trial_mover2.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log(response.success)
      //console.log(response);
      //console.log('status 200');
    }
  };
  //xhr.send(jsPsych.data.get().json()); //for jspsych's version
  xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}

function saveDataToDb_trial() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_one_row.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log(response.success)
      //console.log(response);
      //console.log('status 200');
    }
  };
  //xhr.send(jsPsych.data.get().json()); //for jspsych's version
  xhr.send(jsPsych.data.get().last(1).json());
}


function saveDataToDb_pairs() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_pairs.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log(response.success)
      //console.log(response);
      //console.log('status 200');
    }
  };
  xhr.send(jsPsych.data.get().json()); //for jspsych's version
}


function saveDataToDb() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log('status 200');
    }
  };
  xhr.send(jsPsych.data.get().json());
}


function saveDataToDb_summary(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_summary.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log('status 200');
    }
  };
  xhr.send(jsPsych.data.get().json());  
}

function saveDataToDb_dropouts(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_dropouts.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log('status 200');
    }
  };
  xhr.send(jsPsych.data.get().json());  
}

function saveDataToDb_list(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_list.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log('status 200');
    }
  };
  xhr.send(jsPsych.data.get().json());  
}

function saveDataToDb_trial_trustor() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_trial_trustor.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log(response.success)
      //console.log(response);
      //console.log('status 200');
    }
  };
  //xhr.send(jsPsych.data.get().json()); //for jspsych's version
  xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}


function saveDataToDb_trial_trustee() {
  //jspsych-written
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data_trial_trustee.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      //var response = JSON.parse(xhr.responseText);
      var response = xhr.responseText;
      //console.log(response.success)
      //console.log(response);
      //console.log('status 200');
    }
  };
  //xhr.send(jsPsych.data.get().json()); //for jspsych's version
  xhr.send(jsPsych.data.get().last(1).json());
  //console.log(jsPsych.data.get().last(1).json());
}


function gen_cond_ug(){

// Define model numbers and trials
   const model_nums = [0, 1, 2]; // 0 = self-interested; 1 = fair; 2 = superfair
   const trials = [10, 2, 6, 8, 4]; // trials played

   // Define the shared2 matrices
const shared2 = [
   [    // Model 1
       [0, 1],
       [0.1, 0.9]
   ],
   [    // Model 2
       [0.6, 0.4],
       [0.5, 0.5]
   ],
   [    // Model 3
       [1, 0],
       [0.9, 0.1]
   ]
];

   // Generate all combinations of model_nums and trials
   let combs = [];
   model_nums.forEach(model => {
       trials.forEach(trial => {
           combs.push([model, trial]);
       });
   });

   // Randomize the order of combinations
   let random_order = combs.map((_, i) => i).sort(() => Math.random() - 0.5);
   let rnd_comb = random_order.map(index => combs[index]);

   // Find the first row with trial value 10
   let first_10_idx = rnd_comb.findIndex(row => row[1] === 10);

   // Swap this row with the first row, if it exists and isn't already the first
   if (first_10_idx !== -1 && first_10_idx !== 0) {
       [rnd_comb[0], rnd_comb[first_10_idx]] = [rnd_comb[first_10_idx], rnd_comb[0]];
   }

   // Loop over randomized combinations and calculate trial_d
   let offers = [2,5];
   let trial_d = [];
   rnd_comb.forEach((comb, nt) => {
       let cur_mod = comb[0];
       let cur_tr = comb[1];

       // Randomly select one of the two act probs in shared2
       let randIdx = Math.floor(Math.random() * 2);
       let ps = shared2[cur_mod][randIdx];
       let cur_off = randsample(2, 1, true, [1-ps[0],1-ps[1]])

       // Calculate and round values for trial_d
       trial_d[nt] = [ Math.round(cur_tr - ps[0]*cur_tr), Math.round(cur_tr - ps[1]*cur_tr) , offers[cur_off]];
   });

   return trial_d

}







function create_eyetracking_setup(){

    var eyetrack_setup = [];


    var camera_instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <p>In order to participate you must allow the experiment to use your camera.</p>
          <p>You will be prompted to do this on the next screen.</p>
          <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
          <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
        `,
        choices: ['Got it'],
      }
      eyetrack_setup.push(camera_instructions);


    var init_camera = {
        type: jsPsychWebgazerInitCamera
      }
      eyetrack_setup.push(init_camera);


      var calibration_instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
          <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
          <p>These are some factors that improve data quality. Please do the following to allow us to have good data:</p>
          <p>1. The quality of the camera feed is essential. Good lighting makes a big difference. Please perform this experiment in a well-lit room.</p>
            <p>2. Please keep your head relatively still during and after calibration. The calibration is not robust to head movements.</p>
            <p>3. The sampling rate that we are able to achieve will depend on the computing power of your device. To help us have a sufficiently good sampling rate, please close any non-essential software and browser windows prior to starting the experiment.</p>
        `,
        choices: ['Got it'],
      }
      eyetrack_setup.push(calibration_instructions);

      var calibration = {
        type: jsPsychWebgazerCalibrate,
        calibration_points: function(){
            startMouseCalibration();
            return [  [25,25],[75,25],[50,50],[25,75],[75,75]  ]
        },
        repetitions_per_point: 2,
        randomize_calibration_order: true
      }
      eyetrack_setup.push(calibration);

      var validation_instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <p>Now we'll measure the accuracy of the calibration.</p>
          <p>Look at each dot as it appears on the screen.</p>
          <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
        `,
        choices: ['Got it'],
        post_trial_gap: 1000
      }
      eyetrack_setup.push(validation_instructions);

      var validation = {
        type: jsPsychWebgazerValidate,
        validation_points: [
          [25,25],[75,25],[50,50],[25,75],[75,75]
        ],
        roi_radius: 200,
        time_to_saccade: 1000,
        validation_duration: 2000,
        data: {
          task: 'validate'
        }
      }
      eyetrack_setup.push(validation);


      var recalibrate_instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <p>The accuracy of the calibration is a little lower than we'd like.</p>
          <p>Let's try calibrating one more time.</p>
          <p>On the next screen, look at the dots and click on them.<p>
        `,
        choices: ['OK'],
      }
      eyetrack_setup.push(recalibrate_instructions);

      var recalibrate = {
        timeline: [recalibrate_instructions, calibration, validation_instructions, validation],
        conditional_function: function(){
          var validation_data = jsPsych.data.get().filter({task: 'validate'}).values()[0];
          return validation_data.percent_in_roi.some(function(x){
            var minimum_percent_acceptable = 50;
            return x < minimum_percent_acceptable;
          });
        },
        data: {
          phase: 'recalibration'
        }
      }
      eyetrack_setup.push(recalibrate);

      var calibration_done = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <p>Great, we're done with calibration! Thanks for your patience!</p><p>Now we can start with the experiment!</p>
        `,
        choices: ['OK']
      }
      eyetrack_setup.push(calibration_done);


      return eyetrack_setup
}


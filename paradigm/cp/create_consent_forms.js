// create html for consent forms, and questions with required consent to proceed
// create consent form, data consent form, load the declaration of consent for data protections
 
function create_consent_form(){
  consent_text = "<p style='font-size:30px'>Informed Consent Form for Social Experiments</p>"
  consent_text += "<p style='font-size:25px'>Theoretical Social Neuroscience Lab, Royal Holloway, University of London</p>"
  consent_text += "<p style='font-size:20px'>This is a psychology experiment being conducted by Dr. Gabriele Bellucci, director of the Theoretical Social Neuroscience Lab at Royal Holloway, University of London, and the members of his lab. In order to consent to participate, you MUST meet the following criteria: </p>"
  consent_text += "<p style='font-size:20px'>-   18 years of age or older. </p>"
  consent_text += "<p style='font-size:20px'>-   Fluent speaker of English. </p>"
  consent_text += "<p style='font-size:20px'>-   Have not previously participated in this experiment. </p>"
  consent_text += "<p style='font-size:20px'> <strong>Objective/Purpose of the Study.</strong> Our research project aims to investigate the computational and psychological mechanisms of decision-making. During the experiment, we will ask you to perform various tasks on the computer and fill out questionnaires. The computer tasks involve online interactions with other participants through the platform <a href='https://www.prolific.co'>Prolific</a>. Both tasks and questionnaires will be explained to you in more detail in the instructions.</p>"
  consent_text += "<p style='font-size:20px'> <strong>Procedure of the Investigation.</strong> The investigation will last approximately 30 minutes in total. However, this is only an estimate and may be subject to change. Please ensure that you have enough time available. You will receive compensation for your participation at a rate of <strong>&pound;8/h</strong> plus an additional bonus up to <strong>&pound;3</strong> contingent on your performance in the task.</p>"
  consent_text += "<p style='font-size:20px'> <strong>Confidentiality of Data.</strong> Your online username may be connected to your individual responses, but we will NOT be asking for any additional personally identifying information, and we will handle responses as confidentially as possible. We cannot however guarantee the confidentiality of information transmitted over the Internet. We will be keeping deidentified data collected as part of this experiment indefinitely. Data used in scientific publications will remain completely anonymous. If you have any questions about the study, feel free to contact our lab. Dr. Gabriele Bellucci and his lab members can be reached on the Prolific platform.</p>"
  consent_text += "<p style='font-size:20px'> <strong>Voluntariness of Participation.</strong> It is up to you to decide whether you wish to take part or not. You can withdraw from the study at any time by closing your browser, without any consequences and without needing to give a reason, and you can withdraw your data until six months after your participation by contacting the lab's director. After this date the research will be published/submitted as a thesis/scientific article for assessment and withdrawing your data will no longer be possible. If you decide that you wish to withdraw your data from the project, just send us a message on the Prolific platform. We will use your Prolific ID to locate and delete your data.</p>"
  consent_text += "<p style='font-size:20px'> <strong>Discussion of Benefits and Risks.</strong> This study is a fundamental scientific study aimed at expanding our knowledge of human social behavior. While it is possible that a better understanding of these mechanisms in the future may lead to new therapeutic options for patients with mental disorders, this study will not have any immediate clinical benefit. It will also not provide any personal therapeutic benefit to you. We consider the benefit of this study for science to be high, while the risks are low.</p>"
  consent_text += "<p style='font-size:20px'> <strong>Who do I contact if I have a concern about the research or I wish to complain?</strong> If you have a concern about any aspect of this study, please contact either the primary researcher via Prolific or Royal Holloway's Research Ethics Committee via ethics@rhul.ac.uk. If you wish to make a formal complaint, please email integrity@rhul.ac.uk.</p>"
  consent_text += "<p style='font-size:20px'> <strong>Ethical Approval</strong> This study has received ethics approval from Royal Holloway, University of London's Research Ethics Committee, with the approval ID of 375.</p>"
  consent_text += "<p style='font-size:20px'>By selecting the consent option below, I acknowledge that I am 18 or older, that I am a fluent speaker of English, that I have read this consent form, and that I agree to take part in the research. </p>"
  return consent_text
}

function create_data_consent_form(){
  consent_text = "<p style='font-size:30px'>Data Protection Information Sheet</p>"
  consent_text += "<p style='font-size:25px'>Important General Data Protection Regulation information (GDPR).</p>"
  consent_text += "<p style='font-size:20px'>Royal Holloway, University of London (RHUL) is the sponsor for this study and is based in the UK. We will be using information from you in order to undertake this study and will act as the data controller for this study. This means that we are responsible for looking after your information and using it properly. Any data you provide during the completion of the study will be stored securely on hosted on servers within the European Economic Area. Royal Holloway is designated as a public authority and in accordance with the Royal Holloway and Bedford New College Act 1985 and the Statutes which govern the College, we conduct research for the public benefit and in the public interest. Royal Holloway has put in place appropriate technical and organisational security measures to prevent your personal data from being accidentally lost, used or accessed in any unauthorised way or altered or disclosed. Royal Holloway has also put in place procedures to deal with any suspected personal data security breach and will notify you and any applicable regulator of a suspected breach where legally required to do so. To safeguard your rights, we will use the minimum personally-identifiable information possible. The lead researcher will keep your contact details confidential and will use this information only as required (i.e., to provide a summary of the study results if requested and/or for the prize draw). The lead researcher will keep information about you and data gathered from the study, the duration of which will depend on the study. Certain individuals from RHUL may look at your research records to check the accuracy of the research study. If the study is published in a relevant peer-reviewed journal, the anonymised data may be made available to third parties. The people who analyse the information will not be able to identify you. You can find out more about your rights under the GDPR and Data Protection Act 2018 by visiting the <a href='https://www.royalholloway.ac.uk/about-us/more/governance-and-strategy/data-protection/'>Data Protection</a> page on the RHUL website and if you wish to exercise your rights, please contact dataprotection@royalholloway.ac.uk.</p>"
  consent_text += "<p></p>"
  consent_text += "<p style='font-size:20px'>I have received and took note of the General Data Protection Information Sheet for this study. In doing so, I had sufficient time and opportunity to ask questions about data protection and reconsider my participation in the study.</p>"
  consent_text += "<p></p>"
  return consent_text
};

function create_consent_timeline(){ //make timelines with non-optional responses

  var consent_form = {
    type: jsPsychSurveyMultiSelect,
    preamble: create_consent_form(),
    required_message: "You must consent to start the experiment.",
    button_label: "Continue",
    questions: [
      {
        prompt: "", 
        options: ["I consent"], 
        horizontal: false,
        required: true,
        name: "consent"
      }
    ],
    data : {trial: 'participation_consent', task: 'consent_form'},
    on_finish: function (data){
      con_resp = data.response.consent[0];
      data.quest_resp = con_resp.replace(/[^a-zA-Z0-9]/g,'_');
      data.key_resp = data.response;
      data.response = 999;
    }
  };

  var data_protections = {
    type: jsPsychSurveyMultiSelect,
    preamble: create_data_consent_form(),
    required_message: "You must consent to start the experiment.",
    button_label: "Start Experiment",
    questions: [
    {
      prompt: "",
      options: ["I agree to participate in this experiment"],
      required: true,
      name: "consent_exp"
    },
    {
      prompt: "",
      options: ["I consent to the use of my data described in this Data Protection Information Sheet"],
      required: true,
      name: "consent_data"
    },
    {
      prompt: "",
      options: ["I understand my participation in this study is voluntary"],
      required: true,
      name: "consent_voluntary"
    },
    {
      prompt: "",
      options: ["I understand that I am free to withdraw from the study/research project at any time, without giving a reason and without detriment to myself"],
      required: true,
      name: "consent_withdraw"
    },
    {
      prompt: "",
      options: ["I understand that my data will be stored for a duration of 10 years, or longer if required by the study purposes"],
      required: true,
      name: "consent_storage"
    },
    {
      prompt: "",
      options: ["I consent to data transfer from the RHUL encrypted database to the project-related collaborators: inside of the RHUL and affiliated research institutes, or at partnering institutions"],
      required: true,
      name: "consent_collaborators"
    }],
    data : {trial: 'data_protection_consent', task: 'consent_form'},
    
    on_finish: function (data){
      data.quest_resp = String([1,1,1,1,1,1]);
      gdpr_instr = data.response;
      long_string = [];
      for (const property in gdpr_instr) {
        long_string += `${property}`+'_';
        long_string += `${gdpr_instr[property]}`+'_';
      }
      //console.log(long_string);
      data.quest_resp = long_string.replace(/[^a-zA-Z0-9]/g,'_');
      //console.log(data.quest_resp);
      data.key_resp = data.response;
      data.response = 999;
    }
  };
  return consent_timeline = [consent_form, data_protections]
  

}
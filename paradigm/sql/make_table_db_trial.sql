

Drop Table trial;

CREATE TABLE trial (
    worker_ID varchar(255),
    assignment_ID varchar(255),
    hit_ID varchar(255),
    subjnum varchar(255),
    trial_index varchar(255),
    time_elapsed INT,
    rt float,
    response INT,
    key_resp varchar(255),
    mouse varchar(8000),
    question_count INT,
    quiz_test_correct INT,
    quiz_test_performance INT,
    quiz_test_incorrect INT,
    event_duration float,
    trial varchar(255),
    task varchar(255),
    role_assignment varchar(255),
    role varchar(255),
    tot_players INT,
    controller varchar(255),
    mover1 INT,
    mover2 INT,
    trust INT,
    reciprocity INT,
    index_cpd INT,
    index_tg INT,
    coplayer_type INT,
    alpha float,
    beta float,
    alpha_mover1 float,
    beta_mover1 float,
    alpha_mover2 float,
    beta_mover2 float,
    payoff_mover1 INT,
    payoff_mover2 INT,
    fb_trustor_payoff INT,
    fb_trustee_payoff INT,
    waiting_length INT,
    quest_resp varchar(1000),
    tot_points INT,
    exp_dur float,
    experiment_completed INT
);

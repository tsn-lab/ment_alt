clear all; clc; close all;

%% Directories
cur_dir = '/Users/gabriele/work/studies/own/mentalizing_alternatives';
script_dir = fullfile(cur_dir,'scripts');
res_dir = fullfile(cur_dir,'results');

addpath(script_dir);
addpath(fullfile(script_dir,'func'));
%% Variables

% Model variables
tau     = .5;
c       = 0;
nk2     = 2;
nk1     = 1;
acts    = [2,5];
xs      = 0:10;

% Players
player_num = 2;

% Cond
cond_names = {'self-interested','fair','superfair'};
alphas = [0,.1,.9];
uf.fair.a = alphas(2);
uf.fair.b = .5;

uf.superfair.a = alphas(3);
uf.superfair.b = .5;

uf.c        = 0;

% Figure variables
yticklabels     = {'0','.2','.4','.6','.8','1'};
yticks          = [0:.2:1];
xticks          = [0:2:10];
xticklabels{1}  = {'0','2','4','6','8','10'};
xticklabels{2}  = {'(2,8)','(5,5)'};
xticklabels{3}  = {'(2,8)','(5,5)'};
fs = 16;
col = colororder; col(1,:) = col(2,:); col(3,:) = col(4,:);
bwd = 2;
lwd = 3;

do_figure = 1;
do_save = 0;
%% Determine Conditions (probability of sharing 2 vs. 5)

ps = nan(2,2,length(cond_names));

for ncond = 1:length(cond_names)

titlenames = {['Proposer: k = ' num2str(nk1) '; \alpha = ' num2str(alphas(ncond))],...
    ['Proposer: k = ' num2str(nk1) '; \alpha = ' num2str(alphas(ncond))],...
            ['Responder: k = ' num2str(nk2)]};

    uf.u = cond_names{ncond};

    % Proposer's profile
    ps_p                = tom_p_u(xs,nk1,tau,uf);

    % Probability of offer by proposer
    ps(1,:,ncond)       = tom_p_u(acts,nk1,tau,uf);

    % Probability of accepting by responder
    ps(2,:,ncond)       = tom_r_u(acts,nk2,tau,uf);

    if do_figure
        figure;
        for npl = 1:player_num+1
            subplot(1,3,npl);
            if npl == 1; b = bar(ps_p); else;  b = bar(ps(npl-1,:,ncond)); end
            b.FaceColor=col(npl,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
            b.LineWidth=bwd;  title(titlenames{npl});
            ylabel('P(a)'); box off;
            set(gca,'YTick',yticks,'YTickLabel',yticklabels,'XTick',xticks,'XTickLabel',xticklabels{npl},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
        end
    end

end

%% Model identifiability

trial_num   = 10;
nct         = [0:trial_num;trial_num:-1:0];

clear post;
for ncond = 1:length(cond_names)
    for nt = 1:size(nct,2)
        post(nt,ncond)     = ps(1,1,ncond)^nct(1,nt) * ps(1,2,ncond)^nct(2,nt);
    end
end

perc_sh = nct(1,:)/trial_num; for np = 1:length(perc_sh); xtlab_ps{np} = num2str(perc_sh(np)); end

figure; bar(post./sum(post,2)); set(gca,'YTick',yticks,'YTickLabel',yticklabels,'XTickLabel',xtlab_ps,'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
legend(cond_names); box off; legend boxoff; ylabel('P(model)'); xlabel('% sharing 2 over 5'); title('Model identifiability');


%% Trial conditions
% Superfair model: 2 = 0,1 trials
% Fair model:  2 = 4,5 trials
% Self-interested model: 2 = 9,10 trials

model_nums          = 1:3; % 1 = self-interested; 2 = fair; 3 = superfair

trials              = [10,2,6,8,4]; % trials played
shared2(:,:,1)      = [0,1;.6,.4;1,0];
shared2(:,:,2)      = [.1,.9;.5,.5;.9,.1];

combs = combvec(model_nums, trials)';

num_combs = size(combs, 1);
random_order = randperm(num_combs);
rnd_comb = combs(random_order, :);

% Find the first row with trial value 10
first_10_idx = find(rnd_comb(:, 2) == 10, 1);

% Swap this row with the first row, if it exists
if ~isempty(first_10_idx) && first_10_idx ~= 1
    % Swap the rows
    temp = rnd_comb(1, :);
    rnd_comb(1, :) = rnd_comb(first_10_idx, :);
    rnd_comb(first_10_idx, :) = temp;
end

for nt = 1:size(rnd_comb,1)

    cur_mod = rnd_comb(nt,1);
    cur_tr  = rnd_comb(nt,2);

    trial_d(nt,:) = round( [cur_tr,cur_tr]-cur_tr*shared2(cur_mod,:,randi(2)) );

end















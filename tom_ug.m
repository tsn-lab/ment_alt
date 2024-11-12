clear all; clc; close all;
%% Directories
vol = '/Users/gabriele/work/studies/own/mentalizing_alternatives/';
script_dir = fullfile(vol,'scripts');
plot_dir = fullfile(vol,'results/plot/tom');

if ~exist('plot_dir','dir'); mkdir(plot_dir); end

addpath(script_dir);
addpath(fullfile(script_dir,'func'));

%% Set general variables

% Action selection parameters
tau    = .4;

% Game variables
xs      = 0:10;
alt     = {[1:length(xs)],[3,6],[3,9],[3,1]};

% Plot variables
xticklabels{2} = {'(2,8)','(5,5)'};
xticklabels{3} = {'(2,8)','(8,2)'};
xticklabels{4} = {'(2,8)','(0,10)'};
plotlabel = {'proposer','responder'};
fs = 16;
col = colororder;
bwd = 2;
lwd = 3;

do_save=0;
do_figure=1;

%% Loop through alternatives - new model with Mentalizing & wo parameters
k1_num  = 1:2;
k2_num  = 1:2;
c       = 0;

for nk1 = k1_num
    for nk2 = k2_num
        titlenames = {['Proposer: k = ' num2str(nk1)],...
            ['Responder: k = ' num2str(nk2)]};

        for npl = 1:2
            if do_figure
                figure; hold on;
            end
            for nalt = 1%:length(alt)

                acts    = xs(alt{nalt});

                % Probability of sharing by proposer
                ps_i    = tom_p(acts,nk1,tau,c);

                % Probability of accepting by responder
                ps_o    = tom_r(acts,nk2,tau,c);

                % Store all ps
                all_ps_i(nk1,nalt,1) = ps_i(1);
                all_ps_i(nk1,nalt,2) = ps_i(2);

                all_ps_o(nk2,nalt,1) = ps_o(1);
                all_ps_o(nk2,nalt,2) = ps_o(2);

                if do_figure
                    % Plot figure
                    subplot(2,2,nalt);
                    if npl==1 % proposer
                        b=bar(ps_i);
                    elseif npl==2 % responder
                        b=bar(ps_o);
                    end
                    b.FaceColor=col(npl*2,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
                    b.LineWidth=bwd;
                    ylabel('P(a)'); box off;
                    if nalt == 1
                        title(titlenames{npl});
                        set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
                    else
                        set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
                    end
                end

            end
            if do_figure && do_save
                if npl==2; beta=0; end
                print(fullfile(plot_dir,['prob_acc_alt_' plotlabel{1} '_k' num2str(nk1) '_' plotlabel{2} '_k' num2str(nk2) '.png']),'-dpng','-r600');
            end
        end
    end
end

%% Difference between splits
close all;

for npl = 1:2
    figure;
    if npl==1
        plot(all_ps_i(:,3,1)-all_ps_i(:,2,1),'LineWidth',lwd,'Color',col(npl*2,:)); ylim([0-.01,.35]);
    else
        plot(all_ps_o(:,3,1)-all_ps_o(:,2,1),'LineWidth',lwd,'Color',col(npl*2,:));
    end
        hold on; plot([1:size(all_ps_o,1)],zeros(1,size(all_ps_o,1)),'--','LineWidth',lwd,'Color','k');

    title([plotlabel{npl} ': (8,2) vs (5,5)']);
    xlabel('k levels'); ylabel('\Delta action probabilities'); box off;
    set(gca,'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);

    if do_save
        if npl==1
            print(fullfile(plot_dir,['prob_acc_alt_k_' plotlabel{npl} '_82vs55.png']),'-dpng','-r600');
        elseif npl==2
            print(fullfile(plot_dir,['prob_acc_alt_k_' plotlabel{npl} '_82vs55.png']),'-dpng','-r600');
        end
    end
end

%% Difference between probs per split scenario
close all;
split_case{2} = '28vs55';
split_case{3} = '28vs82';
split_case{4} = '28vs010';

titlenames{2} = '(2,8) vs (5,5)';
titlenames{3} = '(2,8) vs (8,2)';
titlenames{4} = '(2,8) vs (0,10)';

for npl = 1:2
    for nalt = 2:size(all_ps_o,2)
        figure;
        if npl==1
            plot(all_ps_i(:,nalt,1)-all_ps_i(:,nalt,2),'LineWidth',lwd,'Color',col(npl*2,:));
        else
            plot(all_ps_o(:,nalt,1)-all_ps_o(:,nalt,2),'LineWidth',lwd,'Color',col(npl*2,:));
            if nalt==4; ylim([0-.01,.4]); end
        end
        hold on; plot([1:size(all_ps_o,1)],zeros(1,size(all_ps_o,1)),'--','LineWidth',lwd,'Color','k');

        title([plotlabel{npl} ': ' titlenames{nalt}]);
        xlabel('k levels'); ylabel('\Delta action probabilities'); box off;
        set(gca,'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);

        if do_save
            if npl==1
                print(fullfile(plot_dir,['prob_acc_alt_k_' plotlabel{npl} '_' split_case{nalt} '.png']),'-dpng','-r600');
            elseif npl==2
                print(fullfile(plot_dir,['prob_acc_alt_k_' plotlabel{npl} '_'  split_case{nalt} '.png']),'-dpng','-r600');
            end
        end
    end
end


%% Loop through alternatives - new model with Mentalizing & wo parameters & w cost
close all;
k1_num  = 1:6;
k2_num  = 1:6;
c       = 4;

for nk1 = k1_num
    for nk2 = k2_num
        titlenames = {['Proposer: k = ' num2str(nk1)],...
            ['Responder: k = ' num2str(nk2)]};

        for npl = 1:2
            figure; hold on;
            for nalt = 1:length(alt)

                acts    = xs(alt{nalt});

                % Probability of sharing by proposer
                ps_i    = tom_p(acts,nk1,tau,c);

                % Probability of accepting by responder
                ps_o    = tom_r(acts,nk2,tau,c);

                % Plot figure
                subplot(2,2,nalt);
                if npl==1 % proposer
                    b=bar(ps_i);
                elseif npl==2 % responder
                    b=bar(ps_o);
                end
                b.FaceColor=col(npl*2,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
                b.LineWidth=bwd;
                ylabel('P(a)'); box off;
                if nalt == 1
                    title(titlenames{npl});
                    set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
                else
                    set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
                end

            end
            if do_save
                if npl==2; beta=0; end
                print(fullfile(plot_dir,['prob_acc_frame_' plotlabel{1} '_k' num2str(nk1) '_' plotlabel{2} '_k' num2str(nk2) '.png']),'-dpng','-r600');
            end
        end
    end
end

%% Loop through alternatives - new model with Mentalizing & w parameters
k1_num = 1;
k2_num = 1:6;

for nk1 = k1_num
    for nk2 = k2_num
        titlenames = {['Proposer: k = ' num2str(nk1)],...
            ['Responder: k = ' num2str(nk2)]};

        for npl = 1:2
            figure; hold on;
            for nalt = 1:length(alt)

                acts    = xs(alt{nalt});

                % Probability of sharing by proposer
                ps_i    = tom_p_fs(acts,nk1,tau);

                % Probability of accepting by responder
                ps_o    = tom_r_fs(acts,nk2,tau);

                % Plot figure
                subplot(2,2,nalt);
                if npl==1 % proposer
                    b=bar(ps_i);
                elseif npl==2 % responder
                    b=bar(ps_o);
                end
                b.FaceColor=col(npl*2,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
                b.LineWidth=bwd;
                ylabel('P(a)'); box off;
                if nalt == 1
                    title(titlenames{npl});
                    set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
                else
                    set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
                end

            end
            if do_save
                if npl==2; beta=0; end
                print(fullfile(plot_dir,['prob_acc_alt_' plotlabel{1} '_k' num2str(nk1) '_' plotlabel{2} '_k' num2str(nk2) '.png']),'-dpng','-r600');
            end
        end
    end
end


%% 3D plot
close all;

alphas = [.1:.1:.9];
betas = alphas;
beta2    = 0;

plot_dir3d = fullfile(plot_dir,'plots_3D'); if ~exist('plot_dir3d','dir'); mkdir(plot_dir3d); end

filenameplot    = {'','25','28','20'};

for npl = 2%1:2
    if npl==1
        nalpha = 1;
    elseif npl==2
        nalpha = length(alphas);
    end

    for nalt = 4%:3

        for na2 = 1:nalpha
            alpha2 = alphas(na2);
            figure;
            for npar = 1:length(alphas)
                alpha   = alphas(npar);

                for npar2 = 1:length(alphas)
                    beta    = betas(npar2);

                    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
                        ['Responder: \alpha = ' num2str(alpha2) '; \beta = 0']};

                    acts    = xs(alt{nalt});

                    % Utility proposer
                    ui = up_fs(acts, alpha, beta);

                    % Probability of sharing by proposer
                    ps_i = ug_soft(ui,tau);

                    % Utility responder
                    uo = ps_i.*ur_fs(acts, alpha2, beta2);

                    % Probability of accepting by responder
                    ps_o = ug_soft(uo,tau);

                    % Plot figure
                    ps_o_diff(npar,npar2) = ps_o(1)-ps_o(2);
                    all_ps(npar,npar2,na2,nalt-1) = ps_o(1);
                end
            end

            if nalt==2 || nalt==4
                b = bar(ps_o_diff(:,1));
                b.FaceColor=col(npl*2,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
                b.LineWidth=bwd;
                xlabel('\alpha'); ylabel('\Delta action probabilities'); box off; title([titlenames{npl} ' splits: ' xticklabels{nalt}{1} ' vs ' xticklabels{nalt}{2}]);
                set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
                    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
            else
                b = bar3(ps_o_diff); colorbar;
                ylabel('\alpha'); xlabel('\beta'); zlabel('\Delta action probabilities'); box off; title([titlenames{npl} ' splits: ' xticklabels{nalt}{1} ' vs ' xticklabels{nalt}{2}]);
                set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
                    'YTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
                    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);

                for k = 1:length(b)
                    zdata = b(k).ZData;
                    b(k).CData = zdata;
                    b(k).FaceColor = 'interp';
                end
                clim([-.8 .8]);
            end

            if do_save
                if npl==1
                    print(fullfile(plot_dir3d,['prob_acc_alt_' plotlabel{npl} '_surfplot_split' filenameplot{nalt} '.png']),'-dpng','-r600');
                elseif npl==2
                    print(fullfile(plot_dir3d,['prob_acc_alt_' plotlabel{npl} '_alpha' num2str(alpha2) '_surfplot_split' filenameplot{nalt} '.png']),'-dpng','-r600');
                end
            end
        end

    end
end

%% Difference between splits

close all;

npl = 2;

for na2 = 1:size(all_ps,3)
    figure; m=1;
    for na = size(all_ps,1):-1:1
        n = 1;
        for nb = size(all_ps,2):-1:1
            ps_split_diff(m,n) = all_ps(na,nb,na2,3)-all_ps(na,nb,na2,2);
            n=n+1;
        end
        m=m+1;
    end
    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
        ['Responder: \alpha = ' num2str(alphas(na2)) '; \beta = 0']};

    b = bar3(ps_split_diff); colorbar;
    ylabel('\alpha'); xlabel('\beta'); zlabel('\Delta action probabilities'); box off; title([titlenames{npl} ' splits: ' xticklabels{3}{2} ' vs ' xticklabels{2}{2}]);
    set(gca,'XTickLabel',{'.9','.8','.7','.6','.5','.4','.3','.2','.1'},...
        'YTickLabel',{'.9','.8','.7','.6','.5','.4','.3','.2','.1'},...
        'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);

    for k = 1:length(b)
        zdata = b(k).ZData;
        b(k).CData = zdata;
        b(k).FaceColor = 'interp';
    end
    clim([-.8 .8]);

    if do_save
        if npl==1
            print(fullfile(plot_dir3d,['prob_acc_alt_' plotlabel{npl} '_82vs55.png']),'-dpng','-r600');
        elseif npl==2
            print(fullfile(plot_dir3d,['prob_acc_alt_' plotlabel{npl} '_alpha' num2str(alphas(na2)) '_82vs55.png']),'-dpng','-r600');
        end
    end
end


%% Loop through Alternatives - w/o Mentalizing

alphas = [0:.1:1]; % Change responder's sensitivity to fairness

npl=2;
for nalphas = 1:length(alphas)
    alpha = alphas(nalphas);

    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
        ['Responder: \alpha = ' num2str(alpha) '; \beta = 0']};
    figure; hold on;
    for nalt = 1:length(alt)

        acts    = xs(alt{nalt});

        % Utility responder
        uo = ur_fs(acts, alpha, 0);

        % Probability of accepting by responder
        ps_o = ug_soft(uo,tau);

        % Plot figure
        subplot(2,2,nalt);
        b=bar(ps_o);

        b.FaceColor=col(1,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
        b.LineWidth=bwd;
        ylabel('P(a)'); box off;
        if nalt == 1
            title(titlenames{npl});
            set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs);
        else
            set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs);
        end

    end
    if do_save
        if npl==2; beta=0; end
        print(fullfile(plot_dir,['prob_acc_alt_no_ment_' plotlabel{npl} '_alpha' num2str(alpha) '_beta' num2str(beta) '.png']),'-dpng','-r600');
    end
end

%% Loop through Alternatives - with Fehr-Schmidt model

% Change responder's sensitivity to fairness
alphas = [.1:.1:.9];
betas = [.9:-.1:.1];

for npar = 1:length(alphas)
    alpha   = alphas(npar);
    beta    = betas(npar);

    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
        ['Responder: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)]};
    npl=2;
    figure; hold on;
    for nalt = 1:length(alt)

        acts    = xs(alt{nalt});

        % Utility responder
        uo = ur_fs(acts, alpha, beta);

        % Probability of accepting by responder
        ps_o = ug_soft(uo,tau);

        % Plot figure
        subplot(2,2,nalt);
        b=bar(ps_o);

        b.FaceColor=col(3,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
        b.LineWidth=bwd;
        ylabel('P(a)'); box off;
        if nalt == 1
            title(titlenames{npl});
            set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs);
        else
            set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs);
        end

    end
    if do_save
        print(fullfile(plot_dir,['prob_acc_alt_fs_' plotlabel{npl} '_alpha' num2str(alpha) '_beta' num2str(beta) '.png']),'-dpng','-r600');
    end
end

%% Plot action probs lines
close all; clear act1_ps_fs act2_ps_fs diff2_act_ps_fs diff1_act_ps_fs diff_act_ps_fs

alphas = [.1:.2:.9];
betas = [.9:-.2:.1];

for npar = 1:length(alphas)
    alpha   = alphas(npar);
    for npar2 = 1:length(alphas)
        beta    = betas(npar2);

        for nalt = 2:length(alt)

            acts    = xs(alt{nalt});

            % Utility responder
            uo = ur_fs(acts, alpha, beta);

            ps_o = ug_soft(uo,tau);

            % Probability of accepting by responder
            act1_ps_fs(npar,npar2,nalt-1) = ps_o(1);
            act2_ps_fs(npar,npar2,nalt-1) = ps_o(2);

        end
    end
end

diff2_act_ps_fs = act1_ps_fs(:,:,2)-act2_ps_fs(:,:,2);
figure; plot(diff2_act_ps_fs,'LineWidth',lwd); xlabel('\alpha'); box off; ylabel('\Delta action probabilities');
set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd); title('Split (2,8) vs. (8,2)');
% legend({'\beta: .9','\beta: .8','\beta: .7','\beta: .6','\beta: .5','\beta: .4'...
%     '\beta: .3','\beta: .2','\beta: .1'},'location','northwest'); legend boxoff;
legend({'\beta: .9','\beta: .7','\beta: .5',...
    '\beta: .3','\beta: .1'},'location','northwest'); legend boxoff;

if do_save
    print(fullfile(plot_dir,['prob_diff_acc_alt_fs_' plotlabel{2} '_split28vs82.png']),'-dpng','-r600');
end

diff1_act_ps_fs = mean(act1_ps_fs(:,:,1)-act2_ps_fs(:,:,1));
figure; plot(diff1_act_ps_fs,'LineWidth',lwd); xlabel('\alpha'); box off; ylabel('\Delta action probabilities');
set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd); title('Split (2,8) vs. (5,5)');
if do_save
    print(fullfile(plot_dir,['prob_diff_acc_alt_fs_' plotlabel{2} '_split28vs55.png']),'-dpng','-r600');
end

diff_act_ps_fs = act1_ps_fs(:,:,2)-act1_ps_fs(:,:,1);
figure; plot(diff_act_ps_fs,'LineWidth',lwd); xlabel('\alpha'); box off; ylabel('\Delta action probabilities');
set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd); title('Split (8,2) vs. (5,5)');
% legend({'\beta: .9','\beta: .8','\beta: .7','\beta: .6','\beta: .5','\beta: .4'...
%     '\beta: .3','\beta: .2','\beta: .1'},'location','northwest'); legend boxoff;
legend({'\beta: .9','\beta: .7','\beta: .5',...
    '\beta: .3','\beta: .1'},'location','northwest'); legend boxoff;
if do_save
    print(fullfile(plot_dir,['prob_diff_acc_alt_fs_' plotlabel{2} '_split82vs55.png']),'-dpng','-r600');
end

%% Loop through alternatives - with Fehr-Schmidt model with Mentalizing
alphas = [.1:.1:.9];
betas = [.9:-.1:.1];

for npar = 1:length(alphas)
    alpha   = alphas(npar);
    beta    = betas(npar);
    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
        ['Responder: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)]};

    for npl = 1:2
        figure; hold on;
        for nalt = 1:length(alt)

            acts    = xs(alt{nalt});

            % Utility proposer
            ui = up_fs(acts, alpha, beta);

            % Probability of sharing by proposer
            ps_i = ug_soft(ui,tau);

            % Utility responder
            uo = ps_i.*ur_fs(acts, alpha, beta);

            % Probability of accepting by responder
            ps_o = ug_soft(uo,tau);

            % Plot figure
            subplot(2,2,nalt);
            if npl==1 % proposer
                b=bar(ps_i);
            elseif npl==2 % responder
                b=bar(ps_o);
            end
            b.FaceColor=col(npl*2,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
            b.LineWidth=bwd;
            ylabel('P(a)'); box off;
            if nalt == 1
                title(titlenames{npl});
                set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs);
            else
                set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs);
            end

        end
        if do_save
            print(fullfile(plot_dir,['prob_acc_alt_fs_ment_' plotlabel{npl} '_alpha' num2str(alpha) '_beta' num2str(beta) '.png']),'-dpng','-r600');
        end
    end
end

%% Loop through Alternatives - with Bicchieri's model

% Change responder's norm
k = .9;%[.1:.1:.9];
Ns = xs;
npl = 2;

for npar = 1:length(Ns)
    N   = Ns(npar);

    figure; hold on;
    for nalt = 1:length(alt)

        acts    = xs(alt{nalt});

        % Utility responder
        uo = ur_cb(acts, N, k);

        % Probability of accepting by responder
        ps_o = ug_soft(uo,tau);

        % Plot figure
        subplot(2,2,nalt);
        b=bar(ps_o);

        b.FaceColor=col(5,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
        b.LineWidth=bwd;
        ylabel('P(a)'); box off;
        if nalt == 1
            title(['Responder: k = ' num2str(k) '; N = ' num2str(N)]);
            set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs);
        else
            set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs);
        end

    end
    if do_save
        print(fullfile(plot_dir,['prob_acc_alt_cb_' plotlabel{npl} '_k' num2str(k) '_N' num2str(N) '.png']),'-dpng','-r600');
    end
end

%% Action probabilities Bicchieri

Ns = [1:2:9];
ks = [.1:.2:.9];

for npar = 1:length(Ns)
    N   = Ns(npar);
    for npar2 = 1:length(Ns)
        k    = ks(npar2);

        for nalt = 2:length(alt)

            acts    = xs(alt{nalt});

            % Utility responder
            uo = ur_cb(acts, N, k);

            % Probability of accepting by responder
            ps_o = ug_soft(uo,tau);

            % Probability of accepting by responder
            act1_ps_cb(npar,npar2,nalt-1) = ps_o(1);
            act2_ps_cb(npar,npar2,nalt-1) = ps_o(2);

        end
    end
end

diff2_act_ps_cb = act1_ps_cb(:,:,2)-act2_ps_cb(:,:,2);
figure; plot(diff2_act_ps_cb,'LineWidth',lwd); xlabel('% sharing norm'); box off; ylabel('\Delta action probabilities');
set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd); title('Split (2,8) vs. (8,2)');
% legend({'\beta: .9','\beta: .8','\beta: .7','\beta: .6','\beta: .5','\beta: .4'...
%     '\beta: .3','\beta: .2','\beta: .1'},'location','northwest'); legend boxoff;
legend({'k: .1','k: .3','k: .5','k: .7','k: .9'},'location','southwest'); legend boxoff;
if do_save
    print(fullfile(plot_dir,['prob_diff_acc_alt_cb_' plotlabel{2} '_split28vs82.png']),'-dpng','-r600');
end

diff1_act_ps_cb = mean(act1_ps_cb(:,:,1)-act2_ps_cb(:,:,1));
figure; plot(diff1_act_ps_cb,'LineWidth',lwd); xlabel('% sharing norm'); box off; ylabel('\Delta action probabilities');
set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd); title('Split (2,8) vs. (5,5)');
if do_save
    print(fullfile(plot_dir,['prob_diff_acc_alt_cb_' plotlabel{2} '_split28vs55.png']),'-dpng','-r600');
end

diff_act_ps_cb = act1_ps_cb(:,:,2)-act1_ps_cb(:,:,1);
figure; plot(diff_act_ps_cb,'LineWidth',lwd); xlabel('% sharing norm'); box off; ylabel('\Delta action probabilities');
set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd); title('Split (8,2) vs. (5,5)');
% legend({'\beta: .9','\beta: .8','\beta: .7','\beta: .6','\beta: .5','\beta: .4'...
%     '\beta: .3','\beta: .2','\beta: .1'},'location','northwest'); legend boxoff;
legend({'k: .1','k: .3','k: .5','k: .7','k: .9'},'location','northwest'); legend boxoff;
if do_save
    print(fullfile(plot_dir,['prob_diff_acc_alt_cb_' plotlabel{2} '_split82vs55.png']),'-dpng','-r600');
end


%% Loop through Alternatives - with Bicchieri's model with mentalizing

% Change responder's norm
k = .1;%[.1:.1:.9];
Ns = xs;

for npar = 1:length(Ns)
    N   = Ns(npar);
    titlenames = {['Proposer: k = ' num2str(k) '; N = ' num2str(N)],...
        ['Responder: k = ' num2str(k) '; N = ' num2str(N)]};

    for npl = 1:2
        figure; hold on;
        for nalt = 1:length(alt)

            acts    = xs(alt{nalt});

            % Utility proposer
            ui = up_cb(acts, N, k);

            % Probability of sharing by proposer
            ps_i = ug_soft(ui,tau);

            % Utility responder
            uo = ps_i.*ur_cb(acts, N, k);

            % Probability of accepting by responder
            ps_o = ug_soft(uo,tau);

            % Plot figure
            subplot(2,2,nalt);
            if npl==1 % proposer
                b=bar(ps_i);
            elseif npl==2 % responder
                b=bar(ps_o);
            end

            b.FaceColor=col(5+npl,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
            b.LineWidth=bwd;
            ylabel('P(a)'); box off;
            if nalt == 1
                title(titlenames{npl});
                set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs);
            else
                set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs);
            end

        end

        if do_save
            print(fullfile(plot_dir,['prob_acc_alt_cb_ment_' plotlabel{npl} '_k' num2str(k) '_N' num2str(N) '.png']),'-dpng','-r600');
        end
    end
end

%% Framing with Mentalizing
close all;
alphas = [.1:.1:.9];
betas = [.9:-.1:.1];
c=4;

for npar = 1:length(alphas)
    alpha   = alphas(npar);
    beta    = betas(npar);
    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
        ['Responder: \alpha = ' num2str(alpha) '; \beta = 0']};

    for npl = 1:2
        figure; hold on;
        for nalt = 1:length(alt)

            acts    = xs(alt{nalt});

            % Utility proposer
            ui = up_fsc(acts, alpha, beta,c);

            % Probability of sharing by proposer
            ps_i = ug_soft(ui,tau);

            % Utility responder
            uo = ps_i.*ur_fs(acts, alpha, 0);

            % Probability of accepting by responder
            ps_o = ug_soft(uo,tau);

            % Plot figure
            subplot(2,2,nalt);
            if npl==1 % proposer
                b=bar(ps_i);
            elseif npl==2 % responder
                b=bar(ps_o);
            end
            b.FaceColor=col(npl*2,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
            b.LineWidth=bwd;
            ylabel('P(a)'); box off;
            if nalt == 1
                title(titlenames{npl});
                set(gca,'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
            else
                set(gca,'XTickLabel',xticklabels{nalt},'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);
            end

        end
        if do_save
            if npl==2; beta=0; end
            print(fullfile(plot_dir,['prob_acc_frame_' plotlabel{npl} '_alpha' num2str(alpha) '_beta' num2str(beta) '_c' num2str(c) '.png']),'-dpng','-r600');
        end
    end
end

%% Action utilities plot
title_us = {'Classic Proposer','Winning Proposer'};
alphas = [.1:.001:.9];
betas = [.9:-.001:.1];
alpha_resp = .5;
c=4;
clear ui ps_i uo
for nloop = 1:length(title_us)
    for npar = 1:length(alphas)
        alpha = alphas(npar);
        beta = betas(npar);

        acts    = 0:.01:10;

        % Utility proposer
        if nloop == 1
            ui(npar,:) = up_fs(acts, alpha, beta);
        else
            ui(npar,:) = up_fsc(acts, alpha, beta,c);
        end


        % Probability of sharing by proposer
        ps_i = ug_soft(ui(npar,:),tau);

        % Utility responder
        uo(npar,:) = ps_i.*ur_fs(acts, alpha_resp, 0);
    end
    figure; imagesc(ui); box off; cb = colorbar; cb.Label.String = 'Proposer''s utilities'; ylabel('[\alpha,\beta]'); title(title_us{nloop}); xlabel('actions');
    set(gca,'YTick',[1:100:801],'YTickLabel',{'[.1,.9]','[.2,.8]','[.3,.7]','[.4,.6]','[.5,.5]','[.6,.4]','[.7,.3]','[.8,.2]','[.9,.1]'},...
        'XTick',[1:100:1001],'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs);
    if do_save
        if nloop ==1
            print(gcf,fullfile(plot_dir,['act_us_model_' plotlabel{1} '.png']),'-dpng','-r600');
        else
            print(gcf,fullfile(plot_dir,['act_us_model_cost_' plotlabel{1} '_c' num2str(c) '.png']),'-dpng','-r600');
        end
    end

    figure; imagesc(uo); box off; cb = colorbar; cb.Label.String = 'Responder''s utilities'; ylabel('[\alpha,\beta]'); title(title_us{nloop}); xlabel('actions');
    set(gca,'YTick',[1:100:801],'YTickLabel',{'[.1,.9]','[.2,.8]','[.3,.7]','[.4,.6]','[.5,.5]','[.6,.4]','[.7,.3]','[.8,.2]','[.9,.1]'},...
        'XTick',[1:100:1001],'XTickLabel',{'0','1','2','3','4','5','6','7','8','9','10'},'FontName','Arial','FontWeight','bold','FontSize',fs);
    if do_save
        if nloop ==1
            print(gcf,fullfile(plot_dir,['act_us_model_' plotlabel{2} '_alpha' num2str(alpha_resp) '.png']),'-dpng','-r600');
        else
            print(gcf,fullfile(plot_dir,['act_us_model_cost_' plotlabel{2} '_alpha' num2str(alpha_resp) '_c' num2str(c) '.png']),'-dpng','-r600');
        end
    end
end

%% 3D plot
close all;

alphas  = [.1:.1:.9];
betas   = alphas;
beta2   = 0;
c       = 4;
plot_dir3d = fullfile(plot_dir,'plots_3D'); if ~exist('plot_dir3d','dir'); mkdir(plot_dir3d); end

filenameplot    = {'','25','28','20'};

for npl = 2%1:2
    if npl==1
        nalpha = 1;
    elseif npl==2
        nalpha = length(alphas);
    end

    for nalt = 2:4

        for na2 = 1:nalpha
            alpha2 = alphas(na2);
            for npar = 1:length(alphas)
                alpha   = alphas(npar);

                for npar2 = 1:length(alphas)
                    beta    = betas(npar2);

                    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
                        ['Responder: \alpha = ' num2str(alpha2) '; \beta = 0']};

                    acts    = xs(alt{nalt});

                    % Utility proposer
                    ui = up_fsc(acts, alpha, beta,c);

                    % Probability of sharing by proposer
                    ps_i = ug_soft(ui,tau);

                    % Utility responder
                    uo = ps_i.*ur_fs(acts, alpha2, beta2);

                    % Probability of accepting by responder
                    ps_o = ug_soft(uo,tau);

                    % Plot figure
                    ps_o_diff(npar,npar2) = ps_o(1)-ps_o(2);
                    all_ps(npar,npar2,na2,nalt-1) = ps_o(1);
                end
            end

            if nalt==2 | nalt==4
                for nb = [1,9]
                    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
                        ['Resp: \alpha = ' num2str(alpha2) '; Prop: \beta = ' num2str(betas(nb)) ';']};
                    figure;
                    b = bar(ps_o_diff(:,nb)); b.LineWidth=bwd;
                    b.FaceColor=col(npl*2,:); b.EdgeColor=b.FaceColor; b.FaceAlpha=.6;
                    xlabel('\alpha'); ylabel('\Delta action probabilities'); box off; title([titlenames{npl} ' splits: ' xticklabels{nalt}{1} ' vs ' xticklabels{nalt}{2}]);
                    set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
                        'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);

                    if do_save
                        if npl==1
                            print(fullfile(plot_dir3d,['prob_acc_frame_' plotlabel{npl} '_split' filenameplot{nalt} '.png']),'-dpng','-r600');
                        elseif npl==2
                            print(fullfile(plot_dir3d,['prob_acc_frame_' plotlabel{2} '_alpha' num2str(alpha2) ...
                                '_' plotlabel{1} '_beta' num2str(betas(nb))...
                                '_split' filenameplot{nalt} '.png']),'-dpng','-r600');
                        end
                    end
                end

            else
                figure;
                b = bar3(ps_o_diff); colorbar;
                ylabel('\alpha'); xlabel('\beta'); zlabel('\Delta action probabilities'); box off; title([titlenames{npl} ' splits: ' xticklabels{nalt}{1} ' vs ' xticklabels{nalt}{2}]);
                set(gca,'XTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
                    'YTickLabel',{'.1','.2','.3','.4','.5','.6','.7','.8','.9'},...
                    'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);

                for k = 1:length(b)
                    zdata = b(k).ZData;
                    b(k).CData = zdata;
                    b(k).FaceColor = 'interp';
                end
                clim([-.8 .8]);

                if do_save
                    if npl==1
                        print(fullfile(plot_dir3d,['prob_acc_frame_' plotlabel{npl} '_split' filenameplot{nalt} '.png']),'-dpng','-r600');
                    elseif npl==2
                        print(fullfile(plot_dir3d,['prob_acc_frame_' plotlabel{npl} '_alpha' num2str(alpha2) '_split' filenameplot{nalt} '.png']),'-dpng','-r600');
                    end
                end
            end

        end

    end
end

%% Difference between splits in Framing

close all;

npl = 2;

for na2 = 1:size(all_ps,3)
    figure; m=1;
    for na = size(all_ps,1):-1:1
        n = 1;
        for nb = size(all_ps,2):-1:1
            ps_split_diff(m,n) = all_ps(na,nb,na2,3)-all_ps(na,nb,na2,2);
            n=n+1;
        end
        m=m+1;
    end

    titlenames = {['Proposer: \alpha = ' num2str(alpha) '; \beta = ' num2str(beta)],...
        ['Responder: \alpha = ' num2str(alphas(na2)) '; \beta = 0']};

    b = bar3(ps_split_diff); colorbar;
    ylabel('\alpha'); xlabel('\beta'); zlabel('\Delta action probabilities'); box off; title([titlenames{npl} ' splits: ' xticklabels{3}{2} ' vs ' xticklabels{2}{2}]);
    set(gca,'XTickLabel',{'.9','.8','.7','.6','.5','.4','.3','.2','.1'},...
        'YTickLabel',{'.9','.8','.7','.6','.5','.4','.3','.2','.1'},...
        'FontName','Arial','FontWeight','bold','FontSize',fs,'LineWidth',lwd);

    for k = 1:length(b)
        zdata = b(k).ZData;
        b(k).CData = zdata;
        b(k).FaceColor = 'interp';
    end
    clim([-.8 .8]);

    if do_save
        if npl==1
            print(fullfile(plot_dir3d,['prob_acc_frame_' plotlabel{npl} '_82vs55.png']),'-dpng','-r600');
        elseif npl==2
            print(fullfile(plot_dir3d,['prob_acc_frame_' plotlabel{npl} '_alpha' num2str(alphas(na2)) '_82vs55.png']),'-dpng','-r600');
        end
    end
end





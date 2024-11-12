function [ps]   = tom_p(xs,k,tau,c)
endow           = 10 - c;

% Estimate proposer's action utilities contingent on k
us              = endow - xs; % k == 1

if k > 1

    us          = tom_r(xs,k-1,tau,c) .* us;

end

% Estimate action probabilities
ps              = ug_soft(us,tau);

end
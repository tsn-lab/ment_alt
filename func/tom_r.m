function [ps]   = tom_r(xs,k,tau,c)

% Estimate responder's action utilities contingent on k
us              = xs; % k == 1

if k > 1

    us          = tom_p(xs,k-1,tau,c) .* us;

end

% Estimate action probabilities
ps              = ug_soft(us,tau);

end
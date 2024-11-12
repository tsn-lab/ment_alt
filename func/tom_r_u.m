function [ps]   = tom_r_u(xs,k,tau,uf)

% Estimate responder's action utilities contingent on k
us              = xs; % k == 1

if k > 1

    us          = tom_p_u(xs,k-1,tau,uf) .* us;

end

% Estimate action probabilities
ps              = ug_soft(us,tau);

end
function [ps]   = tom_p_u(xs,k,tau,uf)
endow           = 10 - uf.c;

% Estimate proposer's action utilities contingent on k
if strcmp(uf.u,'self-interested')
    us = endow - xs;
elseif strcmp(uf.u,'fair')
    us = up_fs(xs,uf.fair.a,uf.fair.b);
elseif strcmp(uf.u,'superfair')
    us = up_fs(xs,uf.superfair.a,uf.superfair.b);
end

if k > 1

    us          = tom_r_u(xs,k-1,tau,uf) .* us;

end

% Estimate action probabilities
ps              = ug_soft(us,tau);

end
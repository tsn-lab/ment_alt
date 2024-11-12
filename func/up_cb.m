function us = up_cb(xs,N,k)
% Fehr-Schmidt Utility function

endow = 10;

us = endow - xs - k * max(N-xs,0);

end
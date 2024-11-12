function us = ur_cb(xs,N,k)
% Cristina Bicchieri Utility function

us = xs - k * max(N-xs,0);

end
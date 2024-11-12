function us = ur_fs(xs,alpha,beta)
% Fehr-Schmidt Utility function

endow = 10;
pi = endow - xs;
po = xs;

us = po - alpha * max(po-pi,0) - beta * max(pi-po,0);

end
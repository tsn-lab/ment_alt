function us = up_fs(xs,alpha,beta)
% Fehr-Schmidt Utility function

endow = 10;
pi = endow - xs;
po = xs;

us = endow - alpha * max(pi-po,0) - beta * max(po-pi,0);

end
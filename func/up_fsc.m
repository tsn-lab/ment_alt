function us = up_fsc(xs,alpha,beta,c)
% Fehr-Schmidt Utility function

endow = 10;
pi = endow - xs - c;
po = xs;

us = endow - alpha * max(pi-po,0) - beta * max(po-pi,0);

end
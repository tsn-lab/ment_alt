
function ps = ug_soft(us,tau)

ps = exp(tau*us)/sum(exp(tau*us));

end
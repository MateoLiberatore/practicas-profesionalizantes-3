function tick()
{
	self.postMessage("tick");
	setTimeout(tick, 1000 );
}

tick();
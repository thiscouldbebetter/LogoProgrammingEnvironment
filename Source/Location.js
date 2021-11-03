
class Location
{
	constructor(pos, forwardInDegrees)
	{
		this.pos = pos || new Coords();
		this.forwardInDegrees = forwardInDegrees || 0;
	}

	forwardInDegreesAdd(degreesToAdd)
	{
		this.forwardInDegrees = NumberHelper.wrapNumberToMax
		(
			this.forwardInDegrees + degreesToAdd, 360
		);
	}
}

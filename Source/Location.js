
class Location
{
	constructor(pos, forwardInTurns)
	{
		this.pos = pos || new Coords();
		this.forwardInTurns = forwardInTurns || 0;
	}

	forwardInTurnsAdd(turnsToAdd)
	{
		this.forwardInTurns = NumberHelper.wrapNumberToMax
		(
			this.forwardInTurns + turnsToAdd, 1
		);
	}
}

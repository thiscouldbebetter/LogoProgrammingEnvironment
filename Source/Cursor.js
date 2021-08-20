class Cursor
{
	constructor(loc, isPenDown, penColor)
	{
		this.loc = loc || new Location();
		this.isPenDown = isPenDown || true;
		this.penColor = penColor || "Black";
	}

	static RadiansPerTurn = Math.PI * 2;
	static DegreesPerTurn = 360;

	moveForwardByPixels(pixelsToMove)
	{
		var pos = this.loc.pos;
		var posBefore = new Coords(pos.x, pos.y);

		var forwardInRadians =
			this.loc.forwardInTurns * Cursor.RadiansPerTurn;

		pos.x += Math.cos(forwardInRadians) * pixelsToMove;
		pos.y += Math.sin(forwardInRadians) * pixelsToMove;

		if (this.isPenDown)
		{
			var graphics = Environment.Instance().graphics;
			graphics.strokeStyle = this.penColor;
			graphics.beginPath();
			graphics.moveTo(posBefore.x, posBefore.y);
			graphics.lineTo(pos.x, pos.y);
			graphics.stroke();
		}
	}

	penColorSet(colorToSet)
	{
		this.penColor = colorToSet;
	}

	penToggle()
	{
		this.isPenDown = (this.isPenDown == false);
	}

	reset(pageSize)
	{
		var pageCenter = new Coords(pageSize.x / 2, pageSize.y / 2);
		var pos = this.loc.pos;
		pos.x = pageCenter.x;
		pos.y = pageCenter.y;
		this.loc.forwardInTurns = 0;
		this.isPenDown = true;
	}

	turnLeftByDegrees(degreesToTurn)
	{
		this.turnRightByDegrees(0 - degreesToTurn);
	}

	turnRightByDegrees(degreesToTurn)
	{
		var turnsToTurn =
			degreesToTurn / Cursor.DegreesPerTurn;
		this.loc.forwardInTurnsAdd(turnsToTurn);
	}
}

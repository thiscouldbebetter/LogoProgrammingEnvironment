
class Instruction
{
	constructor(operationName, operands)
	{
		this.operationName = operationName;
		this.operands = operands;
	}

	executeForEnvironment(environment)
	{
		var commandName = this.operationName;
		var operand0 = this.operands[0];
		var operand1 = this.operands[1];

		if (commandName == "" || commandName == "comment")
		{
			// Do nothing.
		}
		else if (commandName == "moveForward")
		{
			var pixelsToMove = operand0;
			environment.cursor.moveForwardByPixels(pixelsToMove);
		}
		else if (commandName == "penColor")
		{
			environment.cursor.penColorSet(operand0);
		}
		else if (commandName == "penLower")
		{
			environment.cursor.isPenDown = true;
		}
		else if (commandName == "penRaise")
		{
			environment.cursor.isPenDown = false;
		}
		else if (commandName == "pageCreate")
		{
			environment.pageSize = new Coords(operand0, operand1);

			var d = document;

			var canvas = d.createElement("canvas");
			canvas.width = operand0;
			canvas.height = operand1;
			canvas.style = "border:1px solid";
			environment.canvas = canvas;

			var graphics = canvas.getContext("2d");
			graphics.strokeStyle = "Black";
			graphics.fillStyle = "White";
			graphics.fillRect
			(
				0, 0, environment.pageSize.x, environment.pageSize.y
			);
			environment.graphics = graphics;

			environment.cursor.reset(environment.pageSize);

			var divOutput = d.getElementById("divOutput");
			divOutput.innerHTML = "";
			divOutput.appendChild(canvas);
		}
		else if (commandName == "pageErase")
		{
			environment.graphics.fillRect
			(
				0, 0, environment.pageSize.x, environment.pageSize.y
			);
		}
		else if (commandName == "repeat")
		{
			if (environment.timesToRepeat == null)
			{
				environment.instructionIndexOfRepeat =
					environment.instructionIndex;
				environment.timesToRepeat = operand0;
			}
		}
		else if (commandName == "repeatLoop")
		{
			environment.timesToRepeat--;
			if (environment.timesToRepeat <= 0)
			{
				environment.timesToRepeat = null;
				environment.instructionIndexOfRepeat = null;
			}
			else
			{
				environment.instructionIndex =
					environment.instructionIndexOfRepeat;
			}
		}
		else if (commandName == "turnLeft")
		{
			environment.cursor.turnLeftByDegrees(operand0);
		}
		else if (commandName == "turnRight")
		{
			environment.cursor.turnRightByDegrees(operand0);
		}
		else
		{
			throw "Unrecognized instruction:" + this.operationName;
		}
	}
}

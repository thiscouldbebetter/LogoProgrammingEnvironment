
class Environment
{
	constructor()
	{
		this.cursor = new Cursor();
	}

	static Instance()
	{
		if (Environment._instance == null)
		{
			Environment._instance = new Environment();
		}
		return Environment._instance;
	}

	runCode(codeToRun)
	{
		var newline = "\n";

		var codeAsLines = codeToRun.split(newline);

		var instructions = codeAsLines.map
		(
			x => x.trim()
		).filter
		(
			x => x.length > 0
		).map
		(
			codeLine =>
			{
				var tokens = codeLine.split(" ");
				return new Instruction
				(
					tokens[0], tokens.slice(1)
				);
			}
		);

		this.instructionIndex = 0;
		while (this.instructionIndex < instructions.length)
		{
			var instruction = instructions[this.instructionIndex];
			instruction.executeForEnvironment(this);
			this.instructionIndex++;
		}

	}
}


class NumberHelper
{
	static wrapNumberToMax(numberToWrap, max)
	{
		while (numberToWrap < 0)
		{
			numberToWrap += max;
		}
		while (numberToWrap >= max)
		{
			numberToWrap -= max;
		}

		return numberToWrap;
	}
}

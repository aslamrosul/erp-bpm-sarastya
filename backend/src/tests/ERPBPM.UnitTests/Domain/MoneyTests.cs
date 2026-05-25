using ERPBPM.Domain.ValueObjects;
using Xunit;
using FluentAssertions;

namespace ERPBPM.UnitTests.Domain;

public class MoneyTests
{
    [Fact]
    public void Money_Add_ShouldReturnCorrectSum()
    {
        var money1 = new Money(100, "IDR");
        var money2 = new Money(50, "IDR");

        var result = money1.Add(money2);

        result.Amount.Should().Be(150);
        result.Currency.Should().Be("IDR");
    }
}

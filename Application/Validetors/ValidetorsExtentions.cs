using FluentValidation;

namespace Application.Validetors
{
    public static class ValidetorsExtentions
    {
         public static IRuleBuilder<T,string> Password<T> (this IRuleBuilder<T,string> ruleBuilder)
         {
            var options=ruleBuilder.NotEmpty()
            .MinimumLength(6).WithMessage("Password must be at leaset 6 charectors long")
            .Matches("[A-Z]").WithMessage("Password must contains at least one uppercase letter")
            .Matches("[a-z]").WithMessage("Password must contains at least one lowercase letter")
            .Matches("[0-9]").WithMessage("Password must contains at least one number")
            .Matches("[^A-Za-z0-9]").WithMessage("Password must contains at least one non alphanumeric charector");
            return options;

         }
        
    }
}
/**
 * This file include all validation pattern used in C3-UI
 */

export class C3ValidatorPattern{
    public static readonly numberOnly = '^[0-9]*$';
    public static readonly ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    public static readonly passWordreg = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
    public static readonly alphanumericText = '^[a-zA-Z0-9]{0,32}$';
    public static readonly hardwareinputText = '^[a-zA-Z0-9 ]*$'; 
}

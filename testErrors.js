// This function is missing "use strict" at the top, will trigger a 'missing "use strict"' warning.
function calculateSum(a, b) {
   if(a == null) { // Will trigger a 'use === instead of ==' warning.
     console.log("a is null");
   }
   
   // Undefined variable "sum", will trigger 'sum is not defined' error.
   sum = a + b;
 
   return sum; // Missing semicolon, will trigger a 'missing semicolon' warning.
 }
 
 // Unused variable "unusedVar", will trigger 'unused variable' warning.
 let unusedVar = 10;
 
 // Another function missing "use strict"
 function printMessage(message) {
   // Use of undeclared variable "greeting", will trigger 'greeting is not defined' error.
   console.log(greeting + message);
 
   // Missing curly braces in "if" statement, will trigger 'Expected { after 'if' condition' warning.
   if (message)
     console.log(message);
 }
 
 // Function call without semicolon, will trigger 'missing semicolon' warning.
 printMessage("Hello, world!")

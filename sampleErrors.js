// Sample JavaScript Code with Issues

// 1. Long function (complexity)
function veryLongFunction() {
  let a = 0;
  for (let i = 0; i < 100; i++) {
    a += i
    // Simulating a long function body with excessive logic
    if (i % 10 == 0) {
      console.log("Checkpoint:", i);
    }
  }
  return a;
}

// 2. Deeply nested if statements (complexity)
function deeplyNestedFunction(x) {
  if (x > 10) {
    if (x < 20) {
      if (x % 2 == 0) {
        console.log("Even number between 10 and 20");
      } else {
        console.log("Odd number between 10 and 20");
      }
    } else {
      console.log("Number is greater than or equal to 20");
    }
  } else {
    console.log("Number is 10 or less");
  }
}

// 3. Linting issues (unused variables, no semicolons)
const unusedVariable = "This is not used";
function myFunction(param) {
  let result = param + 5 // Missing semicolon
  return result
}

// 4. Security vulnerability (simulated example, real vulnerability would come from npm audit)
const fs = require('fs');
fs.readFile('/path/to/sensitive/file', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 5. Potentially problematic code (complex expression)
function complexExpression(a, b) {
  return a * (b + (3 / 2)) - ((b / 4) * a) + ((a % b) * (b ** 2));
}

var x = 10;
    var y;
    
    function test() {
        if (x == 10) {
            console.log("x is 10"); // Missing semicolon
        }
        y = 20; // y is defined but never used
        z = 30; // z is undefined
    }
    
    function unusedFunction() {
        var unusedVar = 50;
    }
    
    test();

// 6. Deprecated API usage (using older versions of APIs or libraries)
const http = require('http');
const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});
server.listen(3000);

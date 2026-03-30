const fs = require('fs');
const assert = require('assert');

// 1. Read the source file
const source = fs.readFileSync('Canvas Fun.html', 'utf8');

// 2. Extract the escapeHTML function definition
// More flexible regex to find the function even if mappings change
const regex = /function escapeHTML\(str=''\)\{ return String\(str\)\.replace\(.*?\}\[m\]\)\); \}/;
const match = source.match(regex);

if (!match) {
  console.error("Could not find escapeHTML function in Canvas Fun.html");
  process.exit(1);
}

const escapeHTMLStr = match[0];
// Evaluate the function in the current context
eval(escapeHTMLStr);

// 3. Test cases
try {
  console.log("Running tests for escapeHTML...");

  // Happy path
  assert.strictEqual(escapeHTML('hello'), 'hello', 'Normal text should not change');

  // HTML tags
  assert.strictEqual(escapeHTML('<div>'), '&lt;div&gt;', 'Should escape < and >');

  // Ampersands
  assert.strictEqual(escapeHTML('a & b'), 'a &amp; b', 'Should escape &');

  // Quotes
  assert.strictEqual(escapeHTML('He said "Hello"'), 'He said &quot;Hello&quot;', 'Should escape double quotes');
  assert.strictEqual(escapeHTML("It's me"), 'It&#39;s me', 'Should escape single quotes');

  // Multiple characters
  assert.strictEqual(escapeHTML('<a href="test">test\'s & more</a>'), '&lt;a href=&quot;test&quot;&gt;test&#39;s &amp; more&lt;/a&gt;', 'Should escape all special characters');

  // Edge cases
  assert.strictEqual(escapeHTML(''), '', 'Empty string should return empty string');
  assert.strictEqual(escapeHTML(), '', 'Undefined should return empty string (default param)');
  assert.strictEqual(escapeHTML(123), '123', 'Numbers should be converted to string');

  console.log("All tests passed!");
} catch (err) {
  console.error("Test failed!");
  console.error(err.message);
  console.error("Actual:   ", err.actual);
  console.error("Expected: ", err.expected);
  process.exit(1);
}

// regex_tests.js - run with: node tests/regex_tests.js
const V = require('../validators.js');
const cases = [
  // [field, input, expectedValid, description]
  ['full_name','Rahul Sharma',true,'Valid name with space'],
  ['full_name','Al',false,'Too short (2 chars)'],
  ['full_name','R4hul',false,'Contains digit'],
  ['full_name','',false,'Empty name'],
  ['email','user@example.com',true,'Valid email'],
  ['email','first.last+tag@mail.co.in',true,'Valid email with dot, plus, subdomain'],
  ['email','user@@example.com',false,'Double @'],
  ['email','user@example',false,'Missing top-level domain'],
  ['email','userexample.com',false,'Missing @'],
  ['phone','9876543210',true,'Valid 10-digit mobile'],
  ['phone','5876543210',false,'Starts with 5'],
  ['phone','98765432',false,'Only 8 digits'],
  ['phone','98765abcde',false,'Contains letters'],
  ['username','covid_user1',true,'Valid username'],
  ['username','1user',false,'Starts with digit'],
  ['username','ab',false,'Too short'],
  ['username','user name',false,'Contains space'],
  ['password','Covid@2026',true,'Meets all password rules'],
  ['password','covid@2026',false,'No uppercase letter'],
  ['password','Covid2026',false,'No special character'],
  ['password','Cv@1',false,'Shorter than 8 characters'],
  ['password','Covid@2026 ',false,'Contains a space'],
  ['age','18',true,'Minimum allowed age'],
  ['age','17',false,'Below minimum age'],
  ['age','65',true,'Valid age'],
  ['age','120',false,'Above maximum age (119)'],
  ['age','abc',false,'Non-numeric age'],
  ['city','Pune',true,'Valid city'],
  ['city','New Delhi',true,'Valid city with space'],
  ['city','P',false,'Single character'],
  ['city','Pune123',false,'Contains digits'],
  ['comment','Stay safe and wear masks!',true,'Normal comment'],
  ['comment','ok',false,'Too short (2 chars)'],
  ['comment','Hi <script>alert(1)</script>',false,'Script tag injection (XSS)'],
  ['comment','x'.repeat(301),false,'Longer than 300 characters']
];
let pass = 0;
const rows = cases.map(([f,i,exp,d],n) => {
  const act = V[f].test(i), ok = act === exp; if (ok) pass++;
  const shown = i.length > 22 ? i.slice(0,19)+'...' : i;
  return {id:'TC'+String(n+1).padStart(2,'0'), field:f, input:shown, desc:d,
          expected: exp?'Valid':'Invalid', actual: act?'Valid':'Invalid', result: ok?'PASS':'FAIL'};
});
console.log('ID    Field      Input                   Expected  Actual    Result');
console.log('-'.repeat(72));
rows.forEach(r => console.log(r.id.padEnd(6)+r.field.padEnd(11)+JSON.stringify(r.input).padEnd(24)+r.expected.padEnd(10)+r.actual.padEnd(10)+r.result));
console.log('-'.repeat(72));
console.log(`Total: ${cases.length}  Passed: ${pass}  Failed: ${cases.length-pass}`);
require('fs').writeFileSync(__dirname+'/results.json', JSON.stringify({rows,pass,total:cases.length}));

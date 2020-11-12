var bigInt = require("big-integer");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let answer = bigInt.zero;

    if (nth < 0)
        throw 'must be greater than 0'

    answer=fibonacci(nth);

    function fibonacci(num, memo) {
        memo = memo || {};
      
        if (memo[num]) return memo[num];
        if (num === 1) return 1;
        if (num === 0) return 0;
      
        return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
      }

    context.res = {
        body: answer.toString()
    };
}
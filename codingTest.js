let fs = require('fs')
//read input from file 'test1' for maxRangeSum 
let input1 = fs.readFileSync('test1').toString().split('\n').map(arr => {
    return arr.split(' ').map(item => parseInt(item, 10))
})

//read input from file 'test2' form textDollar
let input2 = fs.readFileSync('test2').toString().split('\n').map(item => parseInt(item, 10))

//implementation of Max Range Sum
function maxRangeSum(input) {
    let days = input[0]
    if (days <= 0 || days >= 10000) {
        return 0
    }
    let max = 0,
        curSum = 0
    for (let i = 1; i <= days; i++) {
        curSum += input[i]
        if (curSum < 0) {
            curSum = 0
        }
        max = max < curSum ? curSum : max
    }
    return max
}

//run test of maxRangeSum
function testMaxRangeSum(input) {
    let len = input.length
    console.log('********** Results of Max Range Sum **************')
    for (let i = 0; i < len; i++) {
        console.log(`Test ${i} is: `, input[i])
        console.log(`Output of Test ${i} is: `, maxRangeSum(input[i]))
    }
    console.log('********** Results of Max Range Sum **************')
}

testMaxRangeSum(input1)



//implementation of of Text Dollar
let ONE_TO_NINETEEN = [
    "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"
]

let TENS = [
    "Ten", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
]

let SCALES = ["Thousand", "Million"];

function textDollar(input) {
    if (input <= 0 || input >= 1000000000) {
        return 'Zero'
    }

    return chunk(input)
            .map(inEnglish)
            .map(appendScale)
            .filter(isTruthy)
            .reverse()
            .join("") + 'Dollars';
}


function isTruthy(item) {
    return !!item;
}

function chunk(number) {
    var thousands = [];

    while (number > 0) {
        thousands.push(number % 1000);
        number = Math.floor(number / 1000);
    }

    return thousands;
}

function inEnglish(number) {
    var hundreds, tens, ones, words = [];

    if (number < 20) {
        return ONE_TO_NINETEEN[number - 1]; 
    }

    if (number < 100) {
        ones = number % 10;
        tens = number / 10 | 0; 

        words.push(TENS[tens - 1]);
        words.push(inEnglish(ones));

        return words.filter(isTruthy).join("");
    }

    hundreds = number / 100 | 0;
    words.push(inEnglish(hundreds));
    words.push("Hundred");
    words.push(inEnglish(number % 100));

    return words.filter(isTruthy).join("");
}

function appendScale(chunk, exp) {
    var scale;
    if (!chunk) {
        return null;
    }
    scale = SCALES[exp - 1];
    return [chunk, scale].filter(isTruthy).join("");
}

//run test of textDollar
function testTextDollar(input) {
    console.log('********** Results of Text Dollar **************')
    input.map((item, i) => {
        console.log(`Test ${i}: `, item)
        console.log(`Output is: `, textDollar(item))
    })
    console.log('********** Results of Text Dollar **************')
}

testTextDollar(input2)

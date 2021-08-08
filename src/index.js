function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const arr = expr.split(' ').join('').split(''),
     stek= [];
    arr.forEach(item => {
        if (item == '(') {
            stek.push(item);
        }
        if ( item == ')'){
            if(stek.length>0){
                stek.pop();
            } else {
                throw new Error('ExpressionError: Brackets must be paired');
            }
        }
    });
    if (stek.length > 0) {
        throw new Error('ExpressionError: Brackets must be paired');
    }
    let b=expr.indexOf(')'),
        a=0,
        str = expr,
        str1 = '';
    while (b>0) {
       b = str.indexOf(')');
        str1 = str.slice(0,b);
        a = str1.lastIndexOf('(');
       str =str.slice(0, a) + calc(str.substring(a+1,b-1)).toFixed(5) + str.slice(b+1);
       b = str.indexOf(')');
    }
    return calc(str);

    function calc(str) {
        const arr = str.split(' ').join('').split(/\b/);
        
        let tot = 1;
        for (let i = 0; i<arr.length; i++){
            if (arr[i] == '.') {
                arr[i - 1] = dot(arr[i - 1], arr[i + 1]);
                arr.splice(i, 2);
                i--;
            }
        }
        if (arr[0]== '-') {
            arr[0]= +arr[1]*-1;
            arr.splice(1, 1);
        }
        for (let i = 0; i<arr.length; i++){
            if (arr[i] == '+-' || arr[i] == '--' || arr[i] == '*-' || arr[i] == '/-') {
                arr[i + 1] = +arr[i + 1] *-1;
                arr[i]= arr[i].slice(0, 1);
            }
        }
        console.log(arr);
        for (let i = 0; i<arr.length; i++){
            if (arr[i] == '*' || arr[i] == '/') {
                if (arr[i] == '*') {
                    arr[i - 1] = mul(arr[i - 1], arr[i + 1]);
                    arr.splice(i, 2);
                    i--;
                }
                if (arr[i] == '/') {
                    arr[i - 1] = div(arr[i - 1], arr[i + 1]);
                    arr.splice(i, 2);
                    i--;
                }
            }
        }
        tot = +arr[0];
        arr.forEach((item, i) => {
            if (item == '+') {
                tot += +arr[i + 1];
            }
            if (item == '-') {
                tot -= +arr[i + 1];
            }
        });
        function mul(a, b) {
            return +a * +b;
        }
        function dot(a,b) {
            return +a + (+b/100000);
        }
        function div(a, b) {
            if (b == '0') {
                throw new TypeError('TypeError: Division by zero.');
            } else {
                return +a / +b;
            }
        }
        return tot;
    }
}

module.exports = {
    expressionCalculator
}
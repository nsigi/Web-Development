//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return ~~n == n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    const res = [];
    for (let i = 2; i < 21; i += 2) 
        res.push(i);
    
    return res;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let res = 0;
    for (let i = 1; i < n + 1; ++i)
        res += i;
    return res;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    return (n == 0) ? 0: n + recSumTo(n - 1);
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let res = 1;
    for (let i = 2; i < n + 1; ++i) {
        res *= i;
    }
    return res;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    return isInteger(Math.log(n) / Math.log(2));
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    let n1 = 0;
    let n2 = 1;
    let buf = n1;
    for(let i = 2; i < n + 1; ++i){
        const buf = n2;
        n2 += n1;
        n1 = buf;
    }
    return n2;
    
 }

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let res = initialValue;
    if(!operatorFn) {
        return (x) => initialValue;
    }
    return (x) => 
    {
        res = operatorFn(x, res);
        return res;
    }; 
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    start = start ?? 0;
    step = step ?? 1;
    let curVal = start - step;
    return (() => (curVal += step));
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject){
        return true;
    }
    if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }
    if (typeof(firstObject) === 'object' && typeof(secondObject) === 'object'){
        for (let p in firstObject) {
            if (!(p in secondObject) || !deepEqual(firstObject[p], secondObject[p])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};

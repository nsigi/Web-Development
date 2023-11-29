const assert = require('assert'),
    core = require('./core');

describe('Задания core js', () => {
    describe('#isInteger', () => {
        it('Возвращает true на целое число', () => {
            assert.equal(core.isInteger(3), true);
        });

        it('Возвращает false на нецелое число', () => {
            assert.equal(core.isInteger(1.2), false);
        });
    });

    describe('#even', () => {
        it('Возвращает корректный массив', () => {
            assert.deepStrictEqual(
                core.even(),
                [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
            );
        });
    });

    describe('#sumTo', () => {
        it('Возвращает сумму чисел до n', () => {
            assert.equal(core.sumTo(4), 10, 'С маленьким числом');
            assert.equal(core.sumTo(100), 5050, 'С большим числом');
        });
    });

    describe('#recSumTo', () => {
        it('Возвращает сумму чисел до n', () => {
            assert.equal(core.recSumTo(4), 10, 'С маленьким числом');
            assert.equal(core.recSumTo(100), 5050, 'С большим числом');
        });
    });

    describe('#factorial', () => {
        it('Возвращает факториал n', () => {
            assert.equal(core.factorial(5), 120);
            assert.equal(core.factorial(4), 24);
        });
    });

    describe('#isBinary', () => {
        it('Возвращает true при передаче степени двойки', () => {
            assert.equal(core.isBinary(1), true);
            assert.equal(core.isBinary(2), true);
            assert.equal(core.isBinary(2048), true);
        });

        it('Возвращает false при передаче не степени двойки', () => {
            assert.equal(core.isBinary(0), false);
            assert.equal(core.isBinary(12), false);
            assert.equal(core.isBinary(1023), false);
        });
    });

    describe('#fibonacci', () => {
        it('Возвращает n-ое число Фибоначчи корректно', () => {
            assert.equal(core.fibonacci(1), 1);
            assert.equal(core.fibonacci(2), 1);
            assert.equal(core.fibonacci(7), 13);
            assert.equal(core.fibonacci(10), 55);
        });
    });

    describe('#getOperationFn', () => {
        it('Возвращает функцию', () => {
            const sumFn = core.getOperationFn(-1, (a, b) => a + b);
            assert.ok(typeof sumFn === 'function');
        });

        it('Сохраняет внутреннее значение и применяет операцию', () => {
            const multFn = core.getOperationFn(-1, (a, b) => a * b);
            assert.strictEqual(multFn(-1), 1);
            assert.strictEqual(multFn(4), 4);
            assert.strictEqual(multFn(2), 8);
        });

        it('По умолчанию всегда возвращает начальное значение, если нет operatorFn', () => {
            const staticFn = core.getOperationFn(-1);
            assert.strictEqual(staticFn(-1), -1);
            assert.strictEqual(staticFn(7), -1);
            assert.strictEqual(staticFn(0), -1);
        });
    });

    describe('#sequence', () => {
        it('Возвращает функцию с шагом 1 и началом 0, если не переданы значения', () => {
            const generator = core.sequence();
            assert.equal(generator(), 0);
            assert.equal(generator(), 1);
            assert.equal(generator(), 2);
        });

        it('Функция-генератор корректно генерирует значения начиная со start с шагом step', () => {
            const generator1 = core.sequence(10, 3);
            const generator2 = core.sequence(8, 2);
            assert.equal(generator1(), 10);
            assert.equal(generator1(), 13);
            assert.equal(generator2(), 8);
            assert.equal(generator1(), 16);
            assert.equal(generator2(), 10);
        });
    });

    describe('#deepEqual', () => {
        const dummyFunction = () => {};

        it('Возвращает true если объекты равны', () => {
            assert.equal(
                core.deepEqual(
                    {text: 'some text', count: 3, arr: [11, 22]},
                    {text: 'some text', count: 3, arr: [11, 22]}
                ),
                true
            );
            assert.equal(
                core.deepEqual(
                    {obj: {count: 12}, value: null, flag: true},
                    {obj: {count: 12}, value: null, flag: true}
                ),
                true
            );
            assert.equal(
                core.deepEqual(
                    {obj: {arr: ['a', 'b']}, value: undefined},
                    {obj: {arr: ['a', 'b']}, value: undefined}
                ),
                true
            );
            assert.equal(
                core.deepEqual({func: dummyFunction}, {func: dummyFunction}),
                true
            );
            assert.equal(
                core.deepEqual({a: 'a', b: 'b'}, {b: 'b', a: 'a'}),
                true
            );
            assert.equal(core.deepEqual(NaN, NaN), true);
        });

        it('Возвращает false если объекты не равны', () => {
            assert.equal(
                core.deepEqual(
                    {text: 'some text', count: 3, arr: [11, 22]},
                    {text: 'some text1', count: 4, arr: [11, 22]}
                ),
                false
            );
            assert.equal(
                core.deepEqual(
                    {obj: {count: 12}, value: null, flag: true},
                    {obj: {count: 22}, value: null, flag: false}
                ),
                false
            );
            assert.equal(
                core.deepEqual(
                    {obj: {arr: ['a', 'b']}, value: undefined},
                    {obj: {arr: ['a', 'b']}, value: null}
                ),
                false
            );
            assert.equal(
                core.deepEqual(
                    {obj: {arr: [1, 2, 3]}, value: 'null', n: 0},
                    {obj: {arr: [1, 2]}, value: 'null', n: 0}
                ),
                false
            );
            assert.equal(
                core.deepEqual({obj: {arr: [1, 0]}}, {obj: {arr: [1, null]}}),
                false
            );
            assert.strictEqual(core.deepEqual(0, 1), false);
            assert.strictEqual(core.deepEqual(null, 0), false);
            assert.strictEqual(core.deepEqual(null, undefined), false);
            assert.equal(
                core.deepEqual({func: dummyFunction}, {func: () => {}}),
                false
            );
        });
    });
});

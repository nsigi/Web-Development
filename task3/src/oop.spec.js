const assert = require('assert');
const core = require('./oop');
const {Point3D} = require("./oop");

describe('ООП', () => {
    describe('#Point', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y', () => {
            const point = new core.Point(1, 2);

            assert.strictEqual(point.X, 1);
            assert.strictEqual(point.Y, 2);
        });

        it('Точка создается без параметров, x и y принимают нули как значение по умолчанию', () => {
            const point = new core.Point();

            assert.strictEqual(point.X, 0);
            assert.strictEqual(point.Y, 0);
        });

        it('Точка создается с одним параметром, x принимает значение, y принимают нуль как значение по умолчанию', () => {
            const point = new core.Point(1);

            assert.strictEqual(point.X, 1);
            assert.strictEqual(point.Y, 0);
        });
    });

    describe('#Point3D', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y, z принимает нуль как значение по умолчанию', () => {
            const point = new core.Point3D(1, 2);

            assert.strictEqual(point.X, 1);
            assert.strictEqual(point.Y, 2);
            assert.strictEqual(point.Z, 0);
        });

        it('Точка создается с тремя параметрами, которые становятся x, y, z', () => {
            const point = new core.Point3D(1, 2.5, -3);

            assert.strictEqual(point.X, 1);
            assert.strictEqual(point.Y, 2.5);
            assert.strictEqual(point.Z, -3);
        });

        it('Point3D имеет статический метод vectorLength', () => {
            const pointA = new core.Point3D(1, 2, -3);
            const pointB = new core.Point3D(1, -1, 1);

            assert.strictEqual(typeof Point3D.vectorLength, 'function');

            const length = Point3D.vectorLength(pointA, pointB);

            assert.strictEqual(length, 5);
        });
    });

    describe('#Queue', () => {
        it('проверка массивом', () => {
            const queue = new core.Queue();
            queue.push(...[1,2,3,4]);
            assert.strictEqual(queue.pop(), 1);
            assert.strictEqual(queue.pop(), 2);
            assert.strictEqual(queue.getSize(), 2);

            queue.push(5);
            assert.strictEqual(queue.getSize(), 3);
            assert.strictEqual(queue.pop(), 3);

            queue.clear();
            assert.strictEqual(queue.getSize(), 0);
        });

        it('проверка на пограничные случаи', () => {
            const queue = new core.Queue();
            assert.strictEqual(queue.getSize(), 0);
            assert.strictEqual(queue.pop(), undefined);
        });

        it('может создаться из массива', () => {
            const queue = new core.Queue([1,-2,3,5]);
            assert.strictEqual(queue.pop(), 1);
            assert.strictEqual(queue.pop(), -2);
            assert.strictEqual(queue.getSize(), 2);
        });

        it('методы работают корректно ', () => {
            const queue = new core.Queue([1,-2,3,5]);
            assert.strictEqual(queue.getSize(), 4);
            assert.strictEqual(queue.pop(), 1);
            assert.strictEqual(queue.pop(), -2);
            assert.strictEqual(queue.getSize(), 2);
            queue.push(...[1,2,3]); // [3,5,1,2,3]
            assert.strictEqual(queue.getSize(), 5);
            assert.strictEqual(queue.pop(), 3); // [5,1,2,3]
            queue.push(9);
            assert.strictEqual(queue.getSize(), 5);  // [5,1,2,3,9]
            queue.clear();
            assert.strictEqual(queue.getSize(), 0);
            assert.strictEqual(queue.pop(), undefined);
            queue.push(1);
            assert.strictEqual(queue.getSize(), 1);
            assert.strictEqual(queue.pop(), 1);	
            assert.strictEqual(queue.getSize(), 0);
        });
    });
});

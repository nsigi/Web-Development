const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });
        it('null не добавляется', () => {
            const dict = new core.Dictionary();
            assert.throws(() => dict.set(null, 'слово'));
        });

        it('undefined не добавляется', () => {
            const dict = new core.Dictionary();
            assert.throws(() => dict.set(undefined, 'слово'));
        });

        it('числа не добавляются', () => {
            const dict = new core.Dictionary();
            assert.throws(() => dict.set(3, 'слово'));
        });

        it('получаем значения по ключу', () => {
            const dict = new core.Dictionary();
            dict.set('word1', 'слово1');
            dict.set('word2', 'слово2');
            dict.set('word3', 'слово1');
            assert.strictEqual(dict.get('word1'), 'слово1');
            assert.strictEqual(dict.get('word2'), 'слово2');
            assert.strictEqual(dict.get('word3'), 'слово1');
        });

        it('элементы добаляются', () => {
            const dict = new core.Dictionary();
            dict.set('word1', 'слово1');
            dict.set('word2', 'слово2');
            dict.set('word3', 'слово1');
            assert.strictEqual(dict.getSize(), 3);
        });

        it('проверяет наличие элемента в словаре', () => {
            const dict = new core.Dictionary();
            dict.set('word', 'слово');
            assert(dict.has('word'));
            assert(!dict.has('слово'));
        });

        it('удаляет из словаря по ключу', () => {
            const dict = new core.Dictionary();
            dict.set('word1', 'слово1');
            dict.set('word2', 'слово2');
            assert.strictEqual(dict.getSize(), 2);
            assert(dict.delete('word2'));
            assert.strictEqual(dict.getSize(), 1);
            assert(!dict.has('word2'));
        });

        it('словарь очищается', () => {
            const dict = new core.Dictionary();
            dict.set('word1', 'слово1');
            dict.set('word2', 'слово2');
            dict.clear();
            assert.strictEqual(dict.getSize(), 0);
        });
    });
});
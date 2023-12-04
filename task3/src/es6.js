"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const initials = fio.split(' ');
	return `${initials[1]} ${initials[0]}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    const set = new Set(array);
    return [...set];
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    return (array.length == 0) ? false : Math.max(...array) / Math.min(...array);
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor()
	{
		this.map = new Map();
	}
    
	getSize() { return this.map.size; }

    get(key) { return this.map.get(key); }
	
    set(key, value)
	{
		if(typeof(key) !== 'string')
			throw new TypeError('Ключ должен быть string');
		if(typeof(value) !== 'string')
			throw new TypeError('Значение должно быть string');
		this.map.set(key, value);
	}
    
    has(key) { return this.map.has(key); }
    
    delete(key) { return this.map.delete(key); }

	clear() { this.map = new Map(); }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};

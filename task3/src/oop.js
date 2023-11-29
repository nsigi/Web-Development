/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(x = 0, y = 0)
	{
		this.X = x;
		this.Y = y;
	}
	
	getDistance() 
	{
		return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
	}
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    static vectorLength(a, b) {}
    constructor(x, y, z = 0)
	{
		super(x, y);
		this.Z = z;
	}

    static vectorLength(a, b) 
	{
		return Math.sqrt(Math.pow(a.X - b.X, 2) + Math.pow(a.Y - b.Y, 2) + Math.pow(a.Z - b.Z, 2));
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Для тех, кто доверяет, но проверяет: написать тесты на методы класса (oop.spec.js)
 */
class Queue {
    constructor(queue = null)
	{
		this.Queue = [];
		if(queue !== null)
		{
			queue.forEach(x => {
				this.Queue.push(x);
			});    
		}
	}

    push(...array)
	{
		this.Queue.push(...array);
	}

    pop()
	{
		return this.Queue.shift();
	}

    getSize()
    {
        return this.Queue.length;
    }

    clear()
	{
		this.Queue = [];
	}
}

module.exports = {
    Point,
    Point3D,
    Queue,
};

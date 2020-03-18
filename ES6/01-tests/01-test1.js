(
    function () {
        //1.使用解构赋值，交换两个变量值
        let a = 1, b = 2;
        [a, b] = [b, a];
        console.log(`test1-1:a=${a},b=${b}`);

        //2.利用解构，设置函数默认值
        //首先判断是否有传参过去，如果有的话就使用传入的参数
        //如果没有传入实参的话就使用第二个部分设置的参数默认值
        //如果参数的默认值也没有的话，就可以使用参数中第一部分设置的解构默认值
        function f2({x = 0, y = 0} = {x: 2, y: 3}) {
            //{x=0,y=0} 这个部分是函数的参数,这里的参数使用了对象解构赋值，并且设置了解构默认值
            //{x:3,y:4} 这个部分是函数参数的默认值
        }

        //3.利用解构，完成数组[1,2,3]的所有值平分，并构成新的数组。火狐浏览器支持
        // let arr3 = [1, 2, 3];
        // let arr3_2 = [for (i of arr3) i * i];
        // console.log(arr3_2);

        //4.对象的简洁模式
        let name4 = 'lf';
        let obj4 = {
            name4
        }
        console.log(obj4);

        //5.模板字符串
        let [name5, age5] = ['lf', 23];
        console.log(`我的名字是${name5}，我的年龄是${age5}`);

        //6.设计一个Symbol为key的对象，并便利所有对象
        let name6 = Symbol();
        let obj6 = {
            [name6]: 'lf',
            age: 23
        }
        console.log(Object.keys(obj6));//不能枚举key为symbol的键值，symbol可用于私有属性构造
        console.log(Reflect.ownKeys(obj6));

        //7.有一本书的属性为：{“name”:“《ES6基础系列》” ”price”：56 }；要求使用 Proxy对象对其进行拦截处理，name属性对外为“《ES6入门到懵逼》”price属性为只读
        let book7 = {name: '《ES6基础系列》', price: 56};
        let proxy7 = new Proxy(book7,
            {
                get(target, prop) {
                    if (prop === 'name') {
                        return '《ES6入门到懵逼》'
                    }
                },
                set(target, prop, value) {
                    if (prop === 'price') {
                        return
                    }
                }
            }
        );
        console.log(`名称：${proxy7.name},价格：${proxy7.price}`);

        //7.下面输出什么
        let set7 = new Set();
        set7.add([1]);
        set7.add([1]);
        console.log(set7.size);//输出2，两次的数组是不同地址的对象。推测set中的add一个是使用的===比较，比较的是地址

        //8.下面输出什么
        let map8 = new Map();
        map8.set([1], 'lf');
        map8.set([1], 'hh');
        map8.delete([1]);
        console.log(map8.size);//输出2，两次的数组是不同地址的对象。
        console.log(map8.get([1]));//输出undefined

        //9.es6中的基本数据类型和引用数据类型
        //es5：基本：null、undefined、string、number、boolean  引用：object、function
        //es6：基本多了一个symbol
        //基本数据类型：值传递   引用数据类型：地址的引用传递
        //重要的一点：对象的key可以使用所有的基本数据类型，但不能使用引用数据类型.下面的写法是没有问题的
        let obj9 = {
            null: 'null',
            undefined: 'undefined',
            name: 'string',
            'name': 'string1',//相同会覆盖
            2: 'number',
            false: 'boolean'
        }
        console.log(obj9);

        //10.定义一个类 Animal，通过传参初始化它的类型，如：“猫科类”。它有一个实例方法：run，run函数体内容可自行定义。
        class Animal {
            // type;//可写可不写

            constructor(type) {
                this.type = type;
            }

            run() {
                console.log(`${this.type} is running`);
            }
        }

        new Animal('cat').run();

        //11.基于Animal类，定义一个子类 Cat并继承 Animal类。初始化 Cat类的昵称 name和年龄 age。并拥有实例方法eat，eat函数体内容可自行定义。
        class Cat extends Animal {
            constructor(name, age) {
                super('cat');
                this.name = name;
                this.age = age;
            }

            eat() {
                console.log(`${this.name} is eating`);
            }
        }

        new Cat('xh', 3).eat();

        //12.利用 module模块，实现两个模块A和B，A模块导出变量 name，age和 say方法。B模块只导入变量 name和say方法，并且重命名 name为 nickname。

        //13.把以下代码使用两种方法，来依次输出0到9？
        var funcs = []
        for (var i = 0; i < 10; i++) {
            funcs.push(function () {
                console.log(i)
            })
        }
        funcs.forEach(function (func) {
            func()
        })
        //es5
        funcs = []
        for (var i = 0; i < 10; i++) {
            funcs.push((
                function (value) {
                    return function () {
                        console.log(value);
                    }
                }
            )(i))
        }
        funcs.forEach(function (func) {
            func()
        })
        //es6
        funcs = []
        for (let i = 0; i < 10; i++) {
            funcs.push(function () {
                console.log(i)
            })
        }
        funcs.forEach(function (func) {
            func()
        })
    }
)();
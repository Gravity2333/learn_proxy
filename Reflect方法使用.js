const obj = {
  a: 100,
  b: 200,
  c: 300,
};

// set target propName newValue this(receiver)
Reflect.set(obj, "a", 300); // 原始方法 设置a的值
console.log(Reflect.get(obj, "a")); // 原始方法 访问 a的值 300

console.log(Reflect.has(obj, "a")); // obj是否存在a true
Reflect.deleteProperty(obj, "a"); // 删除属性 <=> delete obj.a
console.log(Reflect.has(obj, "a")); // false

console.log(Reflect.ownKeys(obj)); // [ 'b', 'c' ]
console.log(Object.keys(obj)); // [ 'b', 'c' ]

class Student {
  constructor(name) {
    this.name = name;
  }
}

console.log(Reflect.construct(Student, ["bill"])); // 调用构造方法 Student { name: 'bill' }
// console.log(Reflect.construct((name)=>{this.name = name},['bill'])) //  箭头函数无法被构造 TypeError: (name)=>{this.name = name} is not a constructor

/** receiver的作用
 *  只有 Reflect.get(target,PropName,receiver?)
 *      Reflect.set(target,PropName,Newvalue,receiver?)
 * 存在receiver 为了设置 get(){} set(){} 访问其中 真实的this 官方ts描述是The reference to use as the `this` value in the getter function
 */

// e.g.
const person = {
  _name: "bill",
  get name() {
    return this["_name"];
  },
};

const person2 = {
  _name: "Jack",
  get name() {
    return this["_name"];
  },
};

console.log(person.name); // bill
console.log(Reflect.get(person, "name")); // bill
console.log(Reflect.get(person, "name", person2)); // Jack 这里的reciver传入的是person2 修改了访问器的this指向

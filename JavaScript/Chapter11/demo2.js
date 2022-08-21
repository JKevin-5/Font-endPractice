// 通过执行函数控制期约状态
// let p1 = new Promise((resolve, reject) => resolve());
// setTimeout(console.log, 0, p1);
// result：Promise { undefined }

// let p2 = new Promise((resolve, reject) => reject());
// setTimeout(console.log, 0, p2);
// 抛错

// 执行器函数是同步执行的
// new Promise(() => setTimeout(console.log, 0, "executor"));
// setTimeout(console.log, 0, "promise initialized");

// 相当于在setTimeout执行的时候，期约还未返回执行结果，所以还是pending状态
// let p = new Promise((resolve, reject) => setTimeout(resolve, 1000));
// setTimeout(console.log, 0, p);

// 期约的实例方法
// function onResolved(id) {
//     setTimeout(console.log, 0, id, 'resolved');
// }
// function onRejected(id) {
//     setTimeout(console.log, 0, id, 'rejected');
// }
// let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
// let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));

// p1.then(() => onResolved('p1'),()=> onRejected('p1'));
// p2.then(() => onResolved('p2'),()=> onRejected('p2'));

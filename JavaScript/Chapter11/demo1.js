// 带回调的异步函数
function double1(value,callback) {
    setTimeout(() => callback(value*2), 1000);
}

// TODO 不知道为什么${x}不生效
// double1(3,(x) => console.log('I was given:${x}',x));

// 带成功回调和失败回调的异步函数
function double2(value,success, failure) {
    setTimeout(() => {
        try{
            if(typeof value != 'number') {
                throw 'Must provide number as first argment';
            }
            success(2*value);
        }catch (e) {
            failure(e);
        }
    },1000);
}
// 成功回调函数
const successCallback = (x) => console.log('success:'+x);
// 失败回调函数
const failureCallback = (x) => console.log('failure:'+x);
double2(3,successCallback,failureCallback);
double2('b',successCallback, failureCallback);

// 嵌套异步回调
// 即在成功回调里或失败回调里又调用了异步回调函数

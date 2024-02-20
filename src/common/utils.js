export function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj; // 如果是基本数据类型或者 null，则直接返回
    }

    let result;

    if (Array.isArray(obj)) {
        // 如果是数组，则创建一个新数组
        result = [];
        for (let i = 0; i < obj.length; i++) {
            result.push(deepCopy(obj[i])); // 递归调用 deepCopy 对数组元素进行深拷贝
        }
    } else {
        // 如果是对象，则创建一个新对象
        result = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepCopy(obj[key]); // 递归调用 deepCopy 对对象属性进行深拷贝
            }
        }
    }

    return result;
}
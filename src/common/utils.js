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

export function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return '00:00:00';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export function mergeToSeconds(hours, minutes, seconds) {
    // 将输入的小时、分钟和秒数转换为整数
    hours = parseInt(hours) || 0;
    minutes = parseInt(minutes) || 0;
    seconds = parseInt(seconds) || 0;

    // 计算总秒数
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
}
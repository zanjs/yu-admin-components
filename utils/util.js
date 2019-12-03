let util = {};

/**
 * 生成随机len位数字
 * @param len
 * @param date
 * @returns {string}
 */
util.randomLenNum = function(len, date = false) {
	let random;
	random = Math.ceil(Math.random() * 100000000000000)
		.toString()
		.substr(0, len || 4);
	return date ? random + Date.now() : random;
};

export default util;

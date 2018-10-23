module.exports = {
  hasDuplicate(arr) {
    const viewed = {};
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];

      if (viewed[item]) {
        return true;
      }
      viewed[item] = true;
    }
    return false;
  },
};

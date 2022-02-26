const shuffle = (arr) => {
  let tmp = arr;
  let result = [];

  for (i = 0; i < arr.length; i++) {
    let position = Math.floor(Math.random() * tmp.length);
    let value = tmp[position];

    tmp = [...tmp.slice(0, position), ...tmp.slice(position + 1)];
    result = [...result, value];
  }

  return result;
};

const chunk = (arr, size) => {
  return arr.reduce((rows, value, index) => {
    index % size == 0 ? rows.push([value]) : rows[rows.length - 1].push(value);

    return rows;
  }, []);
};

const areArraysEqual = (a, b) => {
  if (a.length != b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      return areArraysEqual(a[i], b[i]);
    } else if (a[i] != b[i]) {
      return false;
    }
  }

  return true;
};

const getInvCount = (array) => {
  let invCount = 0;

  for (let i = 0; i < array.length - 1; i++) {
    for (let k = i + 1; k < array.length; k++) {
      if (array[i] > array[k]) invCount += 1;
    }
  }

  return invCount;
};

const isSolvable = (nums) => getInvCount(nums) % 2 != 0;

module.exports = { shuffle, chunk, areArraysEqual, isSolvable };

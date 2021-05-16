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

function areArraysEqual(a, b) {
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (a[i] instanceof Array && b[i] instanceof Array) {
      if (!areArraysEqual(a[i], b[i])) return false;
    } else if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
}

module.exports = { shuffle, chunk, areArraysEqual };

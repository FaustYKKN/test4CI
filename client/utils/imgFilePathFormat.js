
const filePathFormat = path => {
  const arr = path.split('/');
  arr.shift();
  return arr.join('/');
};

export {
  filePathFormat
};
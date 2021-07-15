const validateImage = (file) => {
  if (!file || !file.name) return false;

  const { name } = file;

  return (
    /^[\w\-.()_ ]+.jpg$/.test(name) ||
    /^[\w\-.()_ ]+.jpeg$/.test(name) ||
    /^[\w\-.()_ ]+.png$/.test(name) ||
    /^[\w\-.()_ ]+.bmp$/.test(name) ||
    /^[\w\-.()_ ]+.tiff$/.test(name) ||
    /^[\w\-.()_ ]+.gif$/.test(name)
  );
};

export default validateImage;

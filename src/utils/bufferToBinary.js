const bufferToBinary = (buf) => {
  let binary = "";
  const bytes = [].slice.call(new Uint8Array(buf));

  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });

  return btoa(binary);
};

export default bufferToBinary;

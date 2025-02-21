class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

function unsignedIntFromBytes(byteOrBytes) {
  const bytesCombined = Array.isArray(byteOrBytes) ? byteOrBytes.join("") : byteOrBytes;

  const integerValue = parseInt(bytesCombined, 16);

  return integerValue;
}

function signedIntFromBytes(byteOrBytes) {
  const unsignedIntegerValue = unsignedIntFromBytes(byteOrBytes);

  const numberOfBytes = Array.isArray(byteOrBytes) ? byteOrBytes.length : 1;

  const numberOfValuesPerBytes = 2 ** (8 * numberOfBytes);

  return unsignedIntegerValue < numberOfValuesPerBytes / 2
    ? unsignedIntegerValue
    : unsignedIntegerValue - numberOfValuesPerBytes;
}

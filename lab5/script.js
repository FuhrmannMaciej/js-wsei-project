const asyncAdd = async (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 100)
  })
}

async function addAll(...args) {
  const chunkSize = 10;
  const chunkedArgs = [];
  for (let i = 0; i < args.length; i += chunkSize) {
    chunkedArgs.push(args.slice(i, i + chunkSize));
  }

  const chunkResults = await Promise.all(
    chunkedArgs.map(chunk => addChunk(chunk))
  );

  return chunkResults.reduce((total, result) => total + result, 0);
}

async function addChunk(chunk) {
  let result = 0;
  for (let i = 0; i < chunk.length; i += 2) {
    result += await asyncAdd(chunk[i], chunk[i + 1]);
  }
  return result;
}

async function measureExecutionTime(callback) {
  let asyncOperations = 0;
  const startTime = performance.now();
  const originalThen = Promise.prototype.then;
  Promise.prototype.then = function () {
    asyncOperations++;
    return originalThen.apply(this, arguments);
  }
  await callback();
  Promise.prototype.then = originalThen;
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log(`Execution time: ${elapsedTime}ms`);
  console.log(`Async operations: ${asyncOperations}`);
}

measureExecutionTime(async () => {
  await addAll(41, 7, 84, 41, 28, 100, 2, 22, 16, 37, 45, 82, 72, 38, 18, 43, 48,
    4, 14, 69, 99, 13, 30, 36, 77, 66, 69, 61, 89, 74, 77, 29, 37, 5, 61, 99, 32, 87, 62,
    57, 26, 75, 12, 62, 52, 5, 24, 67, 39, 28, 57, 3, 26, 12, 58, 35, 92, 27, 65, 99, 58, 79, 20, 79,
    70, 31, 30, 46, 66, 64, 35, 15, 20, 3, 57, 66, 46, 9, 91, 58, 93, 54, 88, 69, 30, 52, 53, 90, 43, 12, 67, 23, 99, 70, 44, 42, 70, 1, 57, 71).then(function (result) {
      console.log(result)
    });
});
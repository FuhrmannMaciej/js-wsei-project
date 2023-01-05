const asyncAdd = async (a,b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(a+b)
    }, 100)
  })
}

async function addAll (...args) {
  let result = 0;

  for (let i = 0; i < args.length; i += 2) {
    result += await asyncAdd(args[i], args[i + 1]);
  }

  return result;
}

addAll(2,3,4,5).then(function(result) {
  console.log(result)
})
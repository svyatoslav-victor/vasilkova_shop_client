const url = 'https://vasilkovashopserver.herokuapp.com/api';

export const getAllProducts = () => {
  return fetch(`${url}/getAll`)
    .then(result => {
      if (!result.ok) {
        throw new Error(`${result.status} - ${result.statusText}`)
      }

      return result.json();
    })
};

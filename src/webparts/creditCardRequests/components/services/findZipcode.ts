export const Address = async zipcode => await fetch(`https://viacep.com.br/ws/${zipcode}/json`);

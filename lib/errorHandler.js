function errorHandler(error) {
    console.log(error);
    throw new Error('Falló en la operación del servidor')
}


module.exports = errorHandler



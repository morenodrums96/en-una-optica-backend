function calculateSellingPrice(costoUnitario, utilidadPorcentual) {
  if (costoUnitario < 0 || utilidadPorcentual < 0) {
    throw new Error('Los valores deben ser positivos')
  }

  const factor = 1 + utilidadPorcentual / 100
  const precioVenta = parseFloat((costoUnitario * factor).toFixed(2))
  return precioVenta
}

module.exports = calculateSellingPrice

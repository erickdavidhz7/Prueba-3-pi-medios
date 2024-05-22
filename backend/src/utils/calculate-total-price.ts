const getTotalPriceWithQty = (arrPrice: number[], arrQty: number[])=> {
  if(arrPrice.length !== arrQty.length) return 0
  let total: number = 0;
  for (let i = 0; i < arrPrice.length; i++) {
    total += arrPrice[i] * arrQty[i]
  }
  return total
}

export default getTotalPriceWithQty
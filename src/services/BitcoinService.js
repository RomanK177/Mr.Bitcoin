import axios from "axios";
export const BitcoinService = {
  getRate,
  getMarketPrice,
  //   getConfirmedTransactions,
};

async function getRate(dollars = 1) {
  const rate = await axios.get(
    `https://blockchain.info/tobtc?currency=USD&value=${dollars}&cors=true`
  );
  // console.log(
  //   "🚀 ~ file: BitcoinService.js ~ line 12 ~ getRate ~ rate",
  //   rate.data
  // );
  return rate.data;
}
async function getMarketPrice() {
  const marketPrice = await axios.get(
    `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
  );
  console.log(
    "🚀 ~ file: BitcoinService.js ~ line 22 ~ getMarketPrice ~ marketPrice",
    marketPrice
  );

  return marketPrice.data;
}

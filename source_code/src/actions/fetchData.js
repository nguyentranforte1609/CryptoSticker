import axios from "axios";

const limit = 10;
const filterData = ["bitcoin", "ethereum", "litecoin"];

export async function fetchCryptocurrencyData() {
    await axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=" + limit)
      .then(res => {
        var result = res.data.filter(currency => filterData.includes(currency.id));
        return result;
      })
      .catch(err => {
          console.log(err)
          return [];
      });
  }

export const fecthData = () => ({
  type: "FETCH_DATA",
  
})
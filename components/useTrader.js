function useTrader(props) {
  return { assets };
}

const assets = [
  {
    imageURL: "https://www.gemini.com/images/currencies/icons/default/eth.svg",
    short: "ETH",
    name: "Ethereum",
    price: "4400.23",
  },
  {
    imageURL: "https://www.gemini.com/images/currencies/icons/default/btc.svg",
    short: "BTC",
    name: "Bitcoin",
    price: "65000.11",
  },
  {
    imageURL: "https://www.gemini.com/images/currencies/icons/default/sol.svg",
    short: "SOL",
    name: "Solana",
    price: "212.00",
  },
];

export default useTrader;

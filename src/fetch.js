//import fetch from "node-fetch"; // Importing node-fetch

export const getData = async () => {
  try {
    const data = await fetch(
      'https://api.jsonbin.io/b/61a4e87662ed886f9156c190'
    ).then((res) => res.json());

    let latestDatasWithDecimal = parseDecimals(data);

    return latestDatasWithDecimal;
  } catch (error) {
    console.log(error);
  }
};
export function parseDecimals(datas) {
  let finalData = [];
  for (let i = 0; i < datas.length; i++) {
    let data = datas[i];
    let dollar_price = data.dollar_price.toFixed(2); // parsing to 2 decimal
    data.dollar_price = parseFloat(dollar_price); // Convert from string to float and sending new values to data
    finalData.push(data);
  }
  return finalData;
}

// fetch("https://api.jsonbin.io/b/617fc7b54a82881d6c688213")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     let latestDatas = parseOnlyLatestDate(data);
//     let latestDatasWithDecimal = parseDecimals(latestDatas);
//     return latestDatasWithDecimal
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
// };;

// export function parseOnlyLatestDate(datas) {
//   let finalData = [];
//   for (let i = 0; i < datas.length; i++) {
//     let data = datas[i];
//     let date = new Date(data.date); // Date() constructor
//     if (date.getFullYear() === 2021) {
//       finalData.push(data);
//     }
//   }
//   return finalData;
// }

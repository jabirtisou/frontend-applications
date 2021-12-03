//import fetch from "node-fetch"; // Importing node-fetch

export const getData = async (year) => {
  try {
    const data = await fetch(
      'https://api.jsonbin.io/b/618fca350ddbee6f8b0aaac3'
    ).then((res) => res.json());

    let latestDatasWithDecimal = parseDecimals(data);

    const countryByYear = latestDatasWithDecimal.filter(
      (d) => new Date(d.date).getFullYear() === year
    );

    // Delete double values
    const uniqueCountries = [
      ...new Map(countryByYear.map((item) => [item.name, item])).values(),
    ];

    return uniqueCountries;
  } catch (error) {
    console.log(error);
  }
};

export const getLineData = async () => {
  try {
    const result = await fetch(
      'https://api.jsonbin.io/b/61a4e87662ed886f9156c190'
    ).then((res) => res.json());
    let latestDatasWithDecimal2 = parseDecimals(result);

    return latestDatasWithDecimal2;
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

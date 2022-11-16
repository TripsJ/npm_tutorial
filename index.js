#!/usr/bin/env node
import axios from 'axios';
import countryList from 'country-list';
import chalk from 'chalk';

const argument1 = process.argv[2];
const convertedCode = countryList.getCode(argument1);

let inputYear = process.argv[3];
if (!inputYear) {
  const date = new Date();
  inputYear = date.getFullYear();
}
console.log(inputYear);

async function getData(year, countryCode) {
  const data = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
  return data.data;
  // technically i could create thta here but its ugly
}

// const holiday = getData('BE').then((response) => console.log(response.data));
// console.log(holiday);

async function processHolidays(year, countryCode) {
  const holidays = await getData(year, countryCode);
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const day of holidays) {
    console.log(`${chalk.green(day.date)}:${chalk.grey(day.name)} - aka - ${chalk.blue(day.localName)}`);
  }
}

processHolidays(inputYear, convertedCode);

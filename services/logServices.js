import chalk from 'chalk';
import dedent from "dedent-js";
import moment from "moment";

const printError = (err) => {
    console.log(`${chalk.red(' Error ')}: ${err}`)
}

const printSuccess = (msg) => {
    console.log(`${chalk.green(' SUCCESS ')}: ${msg}`)
}

const printHelp = () => {
    console.log(dedent`${chalk.bgCyan(' HELP ')}:
                ${chalk.bgGray(' Without any params ')} - weather conclusion
                ${chalk.bgYellow(' -s [CITY] ')} to city set up
                ${chalk.bgYellow(' -h ')} to help conclusion
                ${chalk.bgYellow(' -t [API-KEY] ')} to save token`)
}


const printWeather = (weather,icon) => {

    console.log(dedent` ${chalk.bgGreen(`${chalk.yellow('Weather')} in ${chalk.red(weather.name)} ${chalk.red(`(${weather.sys.country})`)} :`)}
        ========================================================
        ${chalk.bgWhite(`${chalk.bold('Sunrise time')}`)} : ${moment.unix(weather?.sys?.sunrise).format('MMMM Do YYYY, h:mm:ss a')}
        ${chalk.bgWhite(`${chalk.bold('Sunset time')}`)} : ${moment.unix(weather?.sys?.sunset).format('MMMM Do YYYY, h:mm:ss a')}
        ========================================================
        ${chalk.bgWhite(`${chalk.bold('Currently')}`)} : ${weather.weather[0].description} ${icon}
        ========================================================
        ${chalk.cyan('Temperature')} : ${weather.main.temp} °C
        ${chalk.cyan('Max')} : ${weather.main.temp_max} °C
        ${chalk.cyan('Min')} : ${weather.main.temp_min} °C
        ========================================================
        ${chalk.green('Feels like')} : ${weather.main.feels_like} °C
        ${chalk.green('Humidity')} : ${weather.main.humidity} % 
        ${chalk.green('Pressure')} : ${weather.main.pressure} hPa`)
}


export {printError, printSuccess, printHelp, printWeather}
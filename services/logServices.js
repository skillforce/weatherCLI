import chalk from 'chalk';
import dedent from "dedent-js";

const printError = (err) => {
    console.log(`${chalk.red(' Error ')}: ${err}`)
}

const printSuccess = (msg) => {
    console.log(`${chalk.green(' SUCCESS ')}: ${msg}`)
}

const printHelp = () => {
    console.log(dedent`${chalk.bgCyan(' HELP ')}:
                ${chalk.bgGray(' Without any params ')} - weather conclusion
                ${chalk.bgYellow(' -s [CITY] ')} to town set up
                ${chalk.bgYellow(' -h ')} to help conclusion
                ${chalk.bgYellow(' -t [API-KEY] ')} to save token`)
}

export {printError, printSuccess, printHelp}
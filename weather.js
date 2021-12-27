#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printError, printHelp, printSuccess, printWeather} from "./services/logServices.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather,getIcon} from "./services/api.service.js";
import moment from 'moment';


const setUpEnv = async (envElement, type) => {
    if (!envElement.length) {
        printError(`The ${envElement} is not passed`)
        return
    }
    try {
        const oneEnvElement = TOKEN_DICTIONARY[type]
        if (oneEnvElement) {
            await saveKeyValue(oneEnvElement, envElement)
            printSuccess(`${type} is saved`)
        } else {
            printError('Some error with token type')
        }
    } catch (err) {
        printError(err.message)
    }
}

const getForecast = async () => {

    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)
        const icon = getIcon(weather.weather[0].icon)
        printWeather(weather,icon)
    } catch (err) {
        if (err?.response?.status === 404) {
            printError('City name is incorrect')
        } else if (err?.response?.status === 401) {
            printError('Token is incorrect')
        } else {
            printError(err.message)
        }

    }
}

const initCLI = async () => {
    const args = getArgs(process.argv)
    if (args.h) {
        printHelp()
    }
    if (args.s) {
        return setUpEnv(args.s, 'city')
    }
    if (args.t) {
        return setUpEnv(args.t, 'token')
    }
    await getForecast()
}


initCLI()
#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printError, printHelp, printSuccess} from "./services/logServices.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('The token is not passed')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token is saved')
    } catch (err) {
        printError(err.message)
    }
}

const getForecast = async () => {
    try {
        console.log(await getWeather('mogilev'))
    } catch (err) {
        if (err?.response?.status === 404) {
            printError('Country name is incorrect')
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
        await getKeyValue()
    }
    if (args.t) {
        return saveToken(args.t)
    }
    await getForecast()
}


initCLI()
#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printHelp, printSuccess, printError} from "./services/logServices.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";


const saveToken = async (token) => {
    if(!token.length){
        printError('The token is not passed')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('token is saved')
    } catch (err) {
        printError(err.message)
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
    getWeather('moscow')
}

initCLI()
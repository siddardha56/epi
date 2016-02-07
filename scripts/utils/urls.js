import {baseURL} from '../constants/rest.js';

export function getBackdropURL({ fileName, width = 1280 }) {
    //TODO return placeholder image for undefined file name
    //TODO get default width from confiuration
    return `http://image.tmdb.org/t/p/w${width}/${fileName}`
}
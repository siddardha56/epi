import chai from 'chai';
chai.should();

import {getBackdropURL} from '../scripts/utils/urls.js';

describe("getBackdropURL", ()=> {
    it("should action object", ()=> {

        //TODO check for exception on invalid params
        getBackdropURL({fileName: "a.jpg"}).should.equal("http://image.tmdb.org/t/p/w1280/a.jpg");
        getBackdropURL({fileName: "a.jpg", width: 300}).should.equal("http://image.tmdb.org/t/p/w300/a.jpg");

    });
});
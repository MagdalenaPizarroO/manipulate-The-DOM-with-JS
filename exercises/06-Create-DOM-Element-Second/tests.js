
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const js = fs.readFileSync(path.resolve(__dirname, './index.js'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './styles.css'), 'utf8');

jest.dontMock('fs');

describe('All the javascript should match', function () {
    beforeEach(() => {
        //here I import the HTML into the document
        document.documentElement.innerHTML = html.toString();
    });
    afterEach(() => { jest.resetModules(); });

    it('the js code should contain an assignment line insert an image with innerHTML', function () {
        const expected = 'body.innerHTML = "<img src';
        // we can read from the source code
        console.log(js.toString());
        expect(js.toString().indexOf(expected) > -1).toBeTruthy();
    });
});


describe('All the html should match', function () {
    beforeEach(() => {
        //here I import the HTML into the document
        document.documentElement.innerHTML = html.toString();
    });
    afterEach(() => { jest.resetModules(); });

    it('the html code should contain a script tag', function () {

        // we can read from the source code
        console.log(html.toString());
        expect(html.toString().indexOf(`<script src="./index.js"></script>`) > -1).toBeTruthy();

        //or use query selector to compare hoy mane scriptags do we have
        const scripts = document.querySelectorAll("script");
        expect(scripts.length).toBe(1);
    });
});
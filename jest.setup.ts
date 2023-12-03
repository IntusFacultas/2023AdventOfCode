/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr){

        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            // @ts-ignore
            return this.replace(str, newStr);
        }
        // @ts-ignore
        return this.replace(new RegExp(str, 'g'), newStr);

    };
}
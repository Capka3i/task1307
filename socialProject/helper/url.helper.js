const {
  ConstElements: {
    URL_LOCAL_HOST, URL_HAF
  }
} = require('../consts');

module.exports = {
  urlHelperEmail: (someVal,url) => {
    const someChange = someVal.emailConfirmation.split('.');
    const {
      id
    } = someVal;
    const Element = [
      ...someChange,
      id
    ];
    const myURL = new URL(url);
    for (let i = 0; i < Element.length; i++) {
      if (!i) {
        myURL.searchParams.set(URL_HAF[i], Element[i]);
        // eslint-disable-next-line no-continue
        continue;
      }
      myURL.searchParams.append(URL_HAF[i], Element[i]);
    }
    return myURL;
  }
};

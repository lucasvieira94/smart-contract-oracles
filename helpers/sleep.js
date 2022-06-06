const sleep = ms => {
    return new Promise(resolve => {
      return setTimeout(resolve, ms);
    });
};

module.exports = {
    sleep
}
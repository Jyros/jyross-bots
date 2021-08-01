module.exports = async (client) => {
    
      client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 
      Array.prototype.random = function () {
        return this[Math.floor((Math.random() * this.length))];
      };

}
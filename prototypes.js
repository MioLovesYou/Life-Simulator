module.exports = function() {
  String.prototype.replaceAll = function replaceAll(search, replacement) {
    return this.replace(RegExp(search, 'gi'), replacement);
  }

  String.prototype.similarity = function similarity(stringTwo) {
    var primary = this.length > stringTwo.length ? this : stringTwo;
    var secondary = this.length > stringTwo.length ? stringTwo : this;
    var similarityValue = 0;
    for (var i = 0; i < secondary.length; i ++) {
      if (secondary[i].toLowerCase() === primary[i].toLowerCase()) similarityValue += 1;
    }
    return Number((similarityValue / primary.length * 100).toFixed(2));
  }
};

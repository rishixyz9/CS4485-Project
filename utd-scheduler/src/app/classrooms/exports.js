// Exporting functions

module.exports = function() {
    this.a = require("./items.js")();
    this.b = require("./ingest.js")();
    this.c = require("./input.js")();
    this.d = require("./search.js")();
}
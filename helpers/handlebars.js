var moment = require('moment');

var register = function(Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    ifCond: function(v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
    ifIn: function(elem, list, options) {
      if (list.indexOf(elem) > -1)
        return options.fn(this);
      else
        return options.inverse(this);
    },
    dateFormat: function(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    dateFormat_en: function(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    inc: function(value, options) {
      return parseInt(value) + 1;
    },
    getLayout: function(length, index) {
      // Make sure last line is always field
      let last_line_items_no = length % 3;
      let def_col_grid = '4';
      let col_grid;

      if (index == length - 1) {

        switch (last_line_items_no) {
          case 0:
            return def_col_grid;
          case 1:
            col_grid = '12';
            return col_grid;
          case 2:
            col_grid = '8';
            return col_grid;
          default:
            return def_col_grid;
        }
      } else return def_col_grid;
    },



  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    // just return helpers object if we can't register helpers here
    return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);

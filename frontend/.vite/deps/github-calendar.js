import {
  __commonJS
} from "./chunk-LK32TJAX.js";

// node_modules/github-calendar-legend/lib/index.js
var require_lib = __commonJS({
  "node_modules/github-calendar-legend/lib/index.js"(exports, module) {
    "use strict";
    module.exports = ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];
  }
});

// node_modules/github-calendar-parser/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/github-calendar-parser/lib/index.js"(exports, module) {
    "use strict";
    var colorLegend = require_lib();
    module.exports = function parseGitHubCalendarSvg(input) {
      var data = {
        last_year: 0,
        longest_streak: -1,
        longest_streak_range: [],
        current_streak: 0,
        current_streak_range: [],
        longest_break: -1,
        longest_break_range: [],
        current_break: 0,
        current_break_range: [],
        weeks: [],
        days: [],
        last_contributed: null
      }, lastWeek = [], updateLongestStreak = function updateLongestStreak2() {
        if (data.current_streak > data.longest_streak) {
          data.longest_streak = data.current_streak;
          data.longest_streak_range[0] = data.current_streak_range[0];
          data.longest_streak_range[1] = data.current_streak_range[1];
        }
      }, updateLongestBreak = function updateLongestBreak2() {
        if (data.current_break > data.longest_break) {
          data.longest_break = data.current_break;
          data.longest_break_range[0] = data.current_break_range[0];
          data.longest_break_range[1] = data.current_break_range[1];
        }
      };
      input.split("\n").slice(2).map(function(c) {
        return c.trim();
      }).forEach(function(c) {
        if (c.startsWith("<g transform")) {
          return lastWeek.length && data.weeks.push(lastWeek) && (lastWeek = []);
        }
        var level = c.match(/data-level="([0-9\-]+)"/i), date = c.match(/data-date="([0-9\-]+)"/), count = c.match(/(No|[0-9]+)( contribution)/);
        level = level && level[1];
        date = date && date[1];
        if (count) {
          if (count[1] === "No") {
            count[1] = 0;
          }
          count = +count[1];
        } else {
          count = 0;
        }
        if (!level) {
          return;
        }
        var fill = colorLegend[level];
        var obj = {
          fill,
          date: new Date(date),
          count,
          level
        };
        if (data.current_streak === 0) {
          data.current_streak_range[0] = obj.date;
        }
        if (data.current_break === 0) {
          data.current_break_range[0] = obj.date;
        }
        if (obj.count) {
          ++data.current_streak;
          data.last_year += obj.count;
          data.last_contributed = obj.date;
          data.current_streak_range[1] = obj.date;
          updateLongestBreak();
          data.current_break = 0;
        } else {
          updateLongestStreak();
          data.current_streak = 0;
          ++data.current_break;
          data.current_break_range[1] = obj.date;
        }
        lastWeek.push(obj);
        data.days.push(obj);
      });
      updateLongestStreak();
      return data;
    };
  }
});

// node_modules/iterate-object/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/iterate-object/lib/index.js"(exports, module) {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function iterateObject(obj, fn) {
      var i = 0, keys = [];
      if (Array.isArray(obj)) {
        for (; i < obj.length; ++i) {
          if (fn(obj[i], i, obj) === false) {
            break;
          }
        }
      } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null) {
        keys = Object.keys(obj);
        for (; i < keys.length; ++i) {
          if (fn(obj[keys[i]], keys[i], obj) === false) {
            break;
          }
        }
      }
    }
    module.exports = iterateObject;
  }
});

// node_modules/sliced/index.js
var require_sliced = __commonJS({
  "node_modules/sliced/index.js"(exports, module) {
    module.exports = function(args, slice, sliceEnd) {
      var ret = [];
      var len = args.length;
      if (0 === len) return ret;
      var start = slice < 0 ? Math.max(0, slice + len) : slice || 0;
      if (sliceEnd !== void 0) {
        len = sliceEnd < 0 ? sliceEnd + len : sliceEnd;
      }
      while (len-- > start) {
        ret[len - start] = args[len];
      }
      return ret;
    };
  }
});

// node_modules/elly/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/elly/lib/index.js"(exports, module) {
    "use strict";
    var iterateObj = require_lib3();
    var sliced = require_sliced();
    function $(input, contextOrAttributes) {
      if (typeof input === "string") {
        if (input.charAt(0) === "<") {
          input = document.createElement(input.slice(1, -1));
          iterateObj(contextOrAttributes || {}, function(value, name) {
            switch (name) {
              case "text":
                input.textContent = value;
                return;
              case "html":
                input.innerHTML = value;
                return;
            }
            input.setAttribute(name, value);
          });
          return input;
        } else {
          contextOrAttributes = contextOrAttributes || document;
          return contextOrAttributes.querySelector(input);
        }
      }
      return input;
    }
    $.$$ = function(selector, context) {
      if (typeof selector === "string") {
        context = context || document;
        return sliced(context.querySelectorAll(selector));
      }
      return [selector];
    };
    module.exports = $;
  }
});

// node_modules/add-subtract-date/lib/index.js
var require_lib5 = __commonJS({
  "node_modules/add-subtract-date/lib/index.js"(exports, module) {
    "use strict";
    function gen(add) {
      return function _(d, count, what) {
        count = add * count;
        switch (what) {
          case "years":
          case "year":
            d.setFullYear(d.getFullYear() + count);
            break;
          case "months":
          case "month":
            d.setMonth(d.getMonth() + count);
            break;
          case "weeks":
          case "week":
            return _(d, count * 7, "days");
            break;
          case "days":
          case "day":
            d.setDate(d.getDate() + count);
            break;
          case "hours":
          case "hour":
            d.setHours(d.getHours() + count);
            break;
          case "minutes":
          case "minute":
            d.setMinutes(d.getMinutes() + count);
            break;
          case "seconds":
          case "second":
            d.setSeconds(d.getSeconds() + count);
            break;
          case "milliseconds":
          case "millisecond":
            d.setMilliseconds(d.getMilliseconds() + count);
            break;
          default:
            throw new Error("Invalid range: " + what);
        }
        return d;
      };
    }
    module.exports = {
      add: gen(1),
      subtract: gen(-1)
    };
  }
});

// node_modules/months/index.js
var require_months = __commonJS({
  "node_modules/months/index.js"(exports, module) {
    module.exports = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    module.exports.abbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    module.exports.it = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    module.exports.abbr.it = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
    module.exports.de = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    module.exports.abbr.de = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  }
});

// node_modules/days/index.js
var require_days = __commonJS({
  "node_modules/days/index.js"(exports, module) {
    module.exports.en = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    module.exports.en.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    module.exports.en.short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    module.exports.fr = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    module.exports.fr.abbr = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
    module.exports.fr.short = ["di", "lu", "ma", "me", "je", "ve", "sa"];
    module.exports.es = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    module.exports.es.abbr = ["dom", "lun", "mar", "mir", "jue", "vie", "sab"];
    module.exports.es.short = ["do", "lu", "ma", "mi", "ju", "vi", "sa"];
    module.exports.it = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"];
    module.exports.it.abbr = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
    module.exports.it.short = ["D", "L", "Ma", "Me", "G", "V", "S"];
    module.exports = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    module.exports.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    module.exports.short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  }
});

// node_modules/fillo/lib/index.js
var require_lib6 = __commonJS({
  "node_modules/fillo/lib/index.js"(exports, module) {
    "use strict";
    module.exports = function fillo(what, size, ch) {
      size = size || 2;
      ch = ch || "0";
      what = what.toString();
      var howMany = size - what.length;
      return (howMany <= 0 ? "" : String(ch).repeat(howMany)) + what;
    };
  }
});

// node_modules/regex-escape/lib/index.js
var require_lib7 = __commonJS({
  "node_modules/regex-escape/lib/index.js"(exports, module) {
    "use strict";
    function RegexEscape(input) {
      return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    RegexEscape.proto = function() {
      RegExp.escape = RegexEscape;
      return RegexEscape;
    };
    module.exports = RegexEscape;
  }
});

// node_modules/parse-it/lib/index.js
var require_lib8 = __commonJS({
  "node_modules/parse-it/lib/index.js"(exports, module) {
    "use strict";
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var regexEscape = require_lib7();
    var ParseIt = function() {
      function ParseIt2(obj) {
        _classCallCheck(this, ParseIt2);
        this.obj = obj || {};
        this.re = new RegExp("^(" + Object.keys(obj).map(regexEscape).join("|") + ")");
      }
      _createClass(ParseIt2, [{
        key: "run",
        value: function run(format, args) {
          var result = "";
          args = args || [];
          do {
            var arr = format.match(this.re), field = arr && arr[1], c = field || format.charAt(0);
            if (field) {
              var value = this.obj[field];
              if (typeof value === "function") {
                value = value.apply(this, args);
              }
              result += value;
            } else {
              result += c;
            }
            format = format.substring(c.length);
          } while (format);
          return result;
        }
      }]);
      return ParseIt2;
    }();
    function parseIt(format, obj, args) {
      return new ParseIt(obj).run(format, args);
    }
    parseIt.Parser = ParseIt;
    module.exports = parseIt;
  }
});

// node_modules/formatoid/lib/index.js
var require_lib9 = __commonJS({
  "node_modules/formatoid/lib/index.js"(exports, module) {
    "use strict";
    var months = require_months();
    var days = require_days();
    var fillo = require_lib6();
    var ParseIt = require_lib8().Parser;
    var rules = {
      // Years
      /// 2015
      YYYY: function YYYY(i, utc) {
        if (utc) {
          return i.getUTCFullYear();
        }
        return i.getFullYear();
      },
      YY: function YY(i, utc) {
        return rules.YYYY(i, utc) % 100;
      },
      MMMM: function MMMM(i, utc) {
        if (utc) {
          return months[i.getUTCMonth()];
        }
        return months[i.getMonth()];
      },
      MMM: function MMM(i, utc) {
        if (utc) {
          return months.abbr[i.getUTCMonth()];
        }
        return months.abbr[i.getMonth()];
      },
      MM: function MM(i, utc) {
        if (utc) {
          return fillo(i.getUTCMonth() + 1);
        }
        return fillo(i.getMonth() + 1);
      },
      M: function M(i, utc) {
        if (utc) {
          return i.getUTCMonth() + 1;
        }
        return i.getMonth() + 1;
      },
      dddd: function dddd(i, utc) {
        return days[rules.d(i, utc)];
      },
      ddd: function ddd(i, utc) {
        return days.abbr[rules.d(i, utc)];
      },
      dd: function dd(i, utc) {
        return days.short[rules.d(i, utc)];
      },
      d: function d(i, utc) {
        if (utc) {
          return i.getUTCDay();
        }
        return i.getDay();
      },
      DD: function DD(i, utc) {
        return fillo(rules.D(i, utc));
      },
      D: function D(i, utc) {
        if (utc) {
          return i.getUTCDate();
        }
        return i.getDate();
      },
      A: function A(i, utc) {
        return rules.a(i, utc).toUpperCase();
      },
      a: function a(i, utc) {
        return rules.H(i, utc) >= 12 ? "pm" : "am";
      },
      hh: function hh(i, utc) {
        return fillo(rules.h(i, utc));
      },
      h: function h(i, utc) {
        return rules.H(i, utc) % 12 || 12;
      },
      HH: function HH(i, utc) {
        return fillo(rules.H(i, utc));
      },
      H: function H(i, utc) {
        if (utc) {
          return i.getUTCHours();
        }
        return i.getHours();
      },
      mm: function mm(i, utc) {
        return fillo(rules.m(i, utc));
      },
      m: function m(i, utc) {
        if (utc) {
          return i.getUTCMinutes();
        }
        return i.getMinutes();
      },
      ss: function ss(i, utc) {
        return fillo(rules.s(i, utc));
      },
      s: function s(i, utc) {
        if (utc) {
          return i.getUTCSeconds();
        }
        return i.getSeconds();
      },
      S: function S(i, utc) {
        return Math.round(rules.s(i, utc) / 60 * 10);
      },
      SS: function SS(i, utc) {
        return fillo(rules.s(i, utc) / 60 * 100);
      },
      SSS: function SSS(i, utc) {
        return fillo(rules.s(i, utc) / 60 * 1e3, 3);
      },
      Z: function Z(i) {
        var offset = -i.getTimezoneOffset();
        return (offset >= 0 ? "+" : "-") + fillo(parseInt(offset / 60)) + ":" + fillo(offset % 60);
      },
      ZZ: function ZZ(i) {
        var offset = -i.getTimezoneOffset();
        return (offset >= 0 ? "+" : "-") + fillo(parseInt(offset / 60)) + fillo(offset % 60);
      }
    };
    var parser = new ParseIt(rules);
    module.exports = function formatoid(i, f) {
      return parser.run(f, [i, i._useUTC]);
    };
  }
});

// node_modules/github-calendar/lib/index.js
var require_lib10 = __commonJS({
  "node_modules/github-calendar/lib/index.js"(exports, module) {
    var parse = require_lib2();
    var $ = require_lib4();
    var addSubtractDate = require_lib5();
    var formatoid = require_lib9();
    var DATE_FORMAT1 = "MMM D, YYYY";
    var DATE_FORMAT2 = "MMMM D";
    var MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function printDayCount(dayCount) {
      return dayCount + " " + (dayCount === 1 ? "day" : "days");
    }
    function addTooltips(container) {
      var tooltip = document.createElement("div");
      tooltip.classList.add("day-tooltip");
      container.appendChild(tooltip);
      var days = container.querySelectorAll(".js-calendar-graph-svg rect.ContributionCalendar-day");
      days.forEach(function(day) {
        day.addEventListener("mouseenter", function(e) {
          var contribCount = e.target.getAttribute("data-count");
          if (contribCount === "0") {
            contribCount = "No contributions";
          } else if (contribCount === "1") {
            contribCount = "1 contribution";
          } else {
            contribCount = contribCount + " contributions";
          }
          var date = new Date(e.target.getAttribute("data-date"));
          var dateText = MONTH_NAMES[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
          tooltip.innerHTML = "<strong>" + contribCount + "</strong> on " + dateText;
          tooltip.classList.add("is-visible");
          var size = e.target.getBoundingClientRect(), leftPos = size.left + window.pageXOffset - tooltip.offsetWidth / 2 + size.width / 2, topPos = size.bottom + window.pageYOffset - tooltip.offsetHeight - 2 * size.height;
          tooltip.style.top = topPos + "px";
          tooltip.style.left = leftPos + "px";
        });
        day.addEventListener("mouseleave", function() {
          tooltip.classList.remove("is-visible");
        });
      });
    }
    module.exports = function GitHubCalendar(container, username, options) {
      container = $(container);
      options = options || {};
      options.summary_text = options.summary_text || 'Summary of pull requests, issues opened, and commits made by <a href="https://github.com/' + username + '" target="blank">@' + username + "</a>";
      options.cache = (options.cache || 24 * 60 * 60) * 1e3;
      if (options.global_stats === false) {
        container.style.minHeight = "175px";
      }
      var cacheKeys = {
        content: "gh_calendar_content." + username,
        expire_at: "gh_calendar_expire." + username
        // We need a proxy for CORS
      };
      options.proxy = options.proxy || function(username2) {
        return fetch("https://api.bloggify.net/gh-calendar/?username=" + username2).then(function(r) {
          return r.text();
        });
      };
      options.getCalendar = options.getCalendar || function(username2) {
        if (options.cache && Date.now() < +localStorage.getItem(cacheKeys.expire_at)) {
          var content = localStorage.getItem(cacheKeys.content);
          if (content) {
            return Promise.resolve(content);
          }
        }
        return options.proxy(username2).then(function(body) {
          if (options.cache) {
            localStorage.setItem(cacheKeys.content, body);
            localStorage.setItem(cacheKeys.expire_at, Date.now() + options.cache);
          }
          return body;
        });
      };
      var fetchCalendar = function fetchCalendar2() {
        return options.getCalendar(username).then(function(body) {
          var div = document.createElement("div");
          div.innerHTML = body;
          var cal = div.querySelector(".js-yearly-contributions");
          $(".position-relative h2", cal).remove();
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = void 0;
          try {
            for (var _iterator = div.querySelectorAll("a")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var a = _step.value;
              if (a.textContent.includes("View your contributions in 3D, VR and IRL!")) {
                a.parentElement.remove();
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
          if (cal.querySelector("include-fragment")) {
            setTimeout(fetchCalendar2, 500);
          } else {
            if (options.responsive === true) {
              var svg = cal.querySelector("table.js-calendar-graph-table");
              var width = svg.getAttribute("width");
              var height = svg.getAttribute("height");
              svg.removeAttribute("height");
              svg.setAttribute("width", "100%");
              svg.setAttribute("viewBox", "0 0 " + width + " " + height);
            }
            if (options.global_stats !== false) {
              var parsed = parse(cal.innerHTML), currentStreakInfo = parsed.current_streak ? formatoid(parsed.current_streak_range[0], DATE_FORMAT2) + " &ndash; " + formatoid(parsed.current_streak_range[1], DATE_FORMAT2) : parsed.last_contributed ? "Last contributed in " + formatoid(parsed.last_contributed, DATE_FORMAT2) + "." : "Rock - Hard Place", longestStreakInfo = parsed.longest_streak ? formatoid(parsed.longest_streak_range[0], DATE_FORMAT2) + " &ndash; " + formatoid(parsed.longest_streak_range[1], DATE_FORMAT2) : parsed.last_contributed ? "Last contributed in " + formatoid(parsed.last_contributed, DATE_FORMAT2) + "." : "Rock - Hard Place", firstCol = $("<div>", {
                "class": "contrib-column contrib-column-first table-column",
                html: '<span class="text-muted">Contributions in the last year</span>\n                               <span class="contrib-number">' + parsed.last_year + ' total</span>\n                               <span class="text-muted">' + formatoid(addSubtractDate.add(addSubtractDate.subtract(/* @__PURE__ */ new Date(), 1, "year"), 1, "day"), DATE_FORMAT1) + " &ndash; " + formatoid(/* @__PURE__ */ new Date(), DATE_FORMAT1) + "</span>"
              }), secondCol = $("<div>", {
                "class": "contrib-column table-column",
                html: '<span class="text-muted">Longest streak</span>\n                               <span class="contrib-number">' + printDayCount(parsed.longest_streak) + '</span>\n                               <span class="text-muted">' + longestStreakInfo + "</span>"
              }), thirdCol = $("<div>", {
                "class": "contrib-column table-column",
                html: '<span class="text-muted">Current streak</span>\n                               <span class="contrib-number">' + printDayCount(parsed.current_streak) + '</span>\n                               <span class="text-muted">' + currentStreakInfo + "</span>"
              });
              cal.appendChild(firstCol);
              cal.appendChild(secondCol);
              cal.appendChild(thirdCol);
            }
            container.innerHTML = cal.innerHTML;
            if (options.tooltips === true) {
              addTooltips(container);
            }
          }
        }).catch(function(e) {
          return console.error(e);
        });
      };
      return fetchCalendar();
    };
  }
});
export default require_lib10();
/*! Bundled license information:

months/index.js:
  (*!
   * months <https://github.com/datetime/months>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

days/index.js:
  (*!
   * days <https://github.com/jonschlinkert/days>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=github-calendar.js.map

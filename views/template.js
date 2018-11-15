"use strict";

function template(title) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var scripts = '';

  if (content) {
    scripts = " <script>\n                     window.__STATE__ = ".concat(JSON.stringify(initialState), "\n                  </script>\n                  <script src=\"assets/client.js\"></script>\n                  ");
  } else {
    scripts = " <script src=\"assets/bundle.js\"> </script> ";
  }

  var page = "<!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                  <meta charset=\"utf-8\">\n                  <title> ".concat(title, " </title>\n                  <meta charset=\"utf-8\">\n                  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n                  <meta name=\"theme-color\" content=\"#000000\">\n                  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n                </head>\n                <body>\n                  <div class=\"content\">\n                     <div id=\"app\" class=\"wrap-inner\">\n                        <!--- magic happens here -->  ").concat(content, "\n                     </div>\n                  </div>\n                    ").concat(scripts, "\n                </body>\n                </html>\n                ");
  return page;
}

module.exports = template;
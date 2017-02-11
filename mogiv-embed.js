/*! Mogiv Embed - v0.1.0 - 2016-02-11
 *  Copyright: (c) 2016 Mogiv, Inc. - info@mogiv.com
 *  License: MIT
 */

(function(d) {

  window.mogivEmbed = function(o) {

    ////// Helper objects + functions

    // http://stackoverflow.com/a/5505137/3333967
    var toQS = function(obj) {
      var parts = [];
      for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
              parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
          }
      }
      return parts.join("&");
    };

    // https://davidwalsh.name/add-rules-stylesheets
    var sheet = (function(document) {
    	var style = document.createElement("style");
    	style.appendChild(document.createTextNode(""));
      // prepend to body to avoid the need for !important
      document.body.insertBefore(style, document.body.firstChild);
    	return style.sheet;
    })(d); var sheetIndex = 0;

    // http://stackoverflow.com/a/11833758
    var loadCSS = function(url){
       var file = document.createElement("link");
       file.setAttribute("rel", "stylesheet");
       file.setAttribute("type", "text/css");
       file.setAttribute("href", url);
       d.head.appendChild(file);
    }

    ////// Scripting

    // Setup default options

    o = o || {};
    o.frameless = 1;
    o.custom = 1;
    // http://stackoverflow.com/a/19525082/3333967
    o.seal = o.hasOwnProperty('seal') ? o.seal : 1;
    o.button = o.hasOwnProperty('button') ? o.button : 0;
    o.buttonCSS = o.hasOwnProperty('buttonCSS') ? o.buttonCSS : 'http://dev.tylerpaulson.com/mogiv/embed-js.css';
    o.dark = o.hasOwnProperty('dark') ? o.dark : 0;

    // Setup qs variable, this option will make migrating old customers more straigtforward
    var qs = "";
    if(o.hasOwnProperty('qs')) {
      qs = o.qs;
      if(qs.charAt(0) == '?') {
        qs = '&' + qs.slice(1);
      } else if(qs.charAt(0) != '&') {
        qs = '&' + qs;
      }
      delete o.qs;
    }

    // Find wrapper div
    var wrap = d.getElementById('mogiv-embed');

    // Is this a Give Button?
    if(o.button === 1) {

      loadCSS(o.buttonCSS);

      // CSS styles
      if(o.hasOwnProperty('buttonColor')) {
        sheet.insertRule('#mogiv-btn { background: '+o.buttonColor+' ; }', sheetIndex++);
      }
      if(o.hasOwnProperty('buttonText')) {
        sheet.insertRule('#mogiv-btn { color: '+o.buttonText+' ; }', sheetIndex++);
      }
      if(o.hasOwnProperty('buttonHover')) {
        sheet.insertRule('#mogiv-btn:hover { background: '+o.buttonHover+' ; }', sheetIndex++);
      }
      if(o.hasOwnProperty('buttonTextHover')) {
        sheet.insertRule('#mogiv-btn:hover { color: '+o.buttonTextHover+' ; }', sheetIndex++);
      }
      if(o.hasOwnProperty('buttonFontFamily')) {
        sheet.insertRule('#mogiv-btn { font-family: '+o.buttonFontFamily+' ; }', sheetIndex++);
      }
      if(o.hasOwnProperty('buttonFontSize')) {
        sheet.insertRule('#mogiv-btn { font-size: '+o.buttonFontSize+'px ; }', sheetIndex++);
      }

      // Create a element
      var button = d.createElement('a');
      button.id = 'mogiv-btn';
      button.href = 'https://dev-tyler.mogiv.com/give/?'+toQS(o)+qs;
      button.textContent = 'Give Now';
      if(o.dark === 1) {
        button.classList.add('mogiv-btn_reversed');
      }

      wrap.appendChild(button);

    } else {

      // CSS styles
      var iframeHeight = (o.seal != 0) ? 704 : 420;
      sheet.insertRule('#mogiv-iframe { border: 0; width: 100%; max-width: 650px; height: '+iframeHeight+'px; }', sheetIndex++);

      // Create iframe element
      var iframe = d.createElement('iframe');
      iframe.id = 'mogiv-iframe';
      iframe.src = 'https://dev-tyler.mogiv.com/give/?'+toQS(o)+qs;
      iframe.scrolling = "no";
      wrap.appendChild(iframe);

      // iframe resizer plugin config
      var iframes;
      var resizerOptions = {
        log: true,
        checkOrigin: ["https://dev-tyler.mogiv.com"]
      };
      resizerOptions.heightCalculationMethod = (o.seal != 0) ? 'documentElementOffset' : 'bodyOffset';

      // iframe resizer plugin initialization
      iframe.addEventListener('load', function() {
        setTimeout(function() {
          iframes = iFrameResize(resizerOptions, iframe);
        }, 2500);
      });

    }

  };

})(document);

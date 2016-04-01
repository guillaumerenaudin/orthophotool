(function($, window) {
  'use strict';

  window.initialText = $(".inner-text > p").html();

  /** 
    Code duplication ©geon.github.com
    BEGIN : 
    This code has been extracted from the web site http://geon.github.io/programming/2016/03/03/dsxyliea 
    and the original source is here : https://github.com/geon/geon.github.com/blob/master/_posts/2016-03-03-dsxyliea.md
  **/
  var getTextNodesIn = function(htmlElName) {
        return $(".inner-text").find(htmlElName).find(":not(iframe,script)").addBack().contents().filter(function() {
            return this.nodeType == 3;
        });
    };


    var textNodes; 
    var wordsInTextNodes;        

    function isLetter(char) {
      return /^[\d]$/.test(char);
    }


    function prepareTextToBeMess() {


      textNodes = getTextNodesIn($("*")); 
      wordsInTextNodes = [];
        

      for (var i = 0; i < textNodes.length; i++) {
        var node = textNodes[i];

        var words = []

        var re = /\w+/g;
        var match;
        while ((match = re.exec(node.nodeValue)) != null) {

          var word = match[0];
          var position = match.index;

          words.push({
            length: word.length,
            position: position
          });
        }

        wordsInTextNodes[i] = words;
      }
    }


    function messUpWords () {

      for (var i = 0; i < textNodes.length; i++) {

        var node = textNodes[i];

        for (var j = 0; j < wordsInTextNodes[i].length; j++) {

          // Only change a tenth of the words each round.
          if (Math.random() > 1/10) {

            continue;
          }

          var wordMeta = wordsInTextNodes[i][j];

          var word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
          var before = node.nodeValue.slice(0, wordMeta.position);
          var after  = node.nodeValue.slice(wordMeta.position + wordMeta.length);

          node.nodeValue = before + messUpWord(word) + after;
        };
      };
    }

    function messUpWord (word) {

      if (word.length < 3) {

        return word;
      }

      return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
    }

    function messUpMessyPart (messyPart) {

      if (messyPart.length < 2) {

        return messyPart;
      }

      var a, b;
      while (!(a < b)) {

        a = getRandomInt(0, messyPart.length - 1);
        b = getRandomInt(0, messyPart.length - 1);
      }

      return messyPart.slice(0, a) + messyPart[b] + messyPart.slice(a+1, b) + messyPart[a] + messyPart.slice(b+1);
    }

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
      
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    window.reactivateMessupWords = function () { 
      prepareTextToBeMess();
    }

    function shortenText(text) {
      if(text.length < 30){
        return text;
      }
      return text.slice(0 ,30)+"...";
    }

 
    textList.forEach(function(entry,index){

        var newTr = document.createElement("tr");
        $(newTr).append($(document.createElement("td")).html(entry.category));
        $(newTr).append($(document.createElement("td")).html(shortenText(entry.fullText)));
        $(newTr).append($(document.createElement("td")).html("<a href='#' onclick='chooseText("+index+");'>Choisir ce texte</a>"));
        $("#textArray > tbody").append(newTr);
    });

    prepareTextToBeMess();
    //Initialize the automatic call to messUpWords
    setInterval(messUpWords, 50);

})(jQuery, window);

function replaceInnerText(idTextArea) {

  $(".inner-text > p").html(CKEDITOR.instances[idTextArea].getData());
  reactivateMessupWords();
}

function reset() {
  $(".inner-text > p").html(initialText);
  reactivateMessupWords();
}

function chooseText(id) {
  $(".inner-text > p").html(textList[id].fullText);
  reactivateMessupWords();
}
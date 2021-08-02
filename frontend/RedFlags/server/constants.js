module.exports = {
  getVal,
}
function getVal(){
$.getJSON("perks.json", function(data, perkOne, perkTwo){

    var randIn = Math.floor(Math.random() * (data.perks.length));
    var randIn2 = Math.floor(Math.random() * (data.perks.length));
      var perkValue1 = data.perks[randIn].card;
        var perkValue2 = data.perks[randIn2].card;
        var perkOne = perkValue1;
          var perkTwo = perkValue2;
          // console.log(perkOne);
          alert(perkOne);
          alert(perkTwo);
          return perkOne;
                return perkTwo;
});
}

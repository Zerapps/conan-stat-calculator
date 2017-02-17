var repeat, timeout, tooltipRepeat;
var timeoutDelay = 200;
var repeatDelay = 75;

var mouseX, mouseY;

$(document).ready(function()
{
  document.getElementById("level-value").innerHTML = level;
  document.getElementById("points-value").innerHTML = remainingPoints;

  document.getElementById("strength-value").innerHTML = 0;
  document.getElementById("agility-value").innerHTML = 0;
  document.getElementById("vitality-value").innerHTML = 0;
  document.getElementById("accuracy-value").innerHTML = 0;
  document.getElementById("grit-value").innerHTML = 0;
  document.getElementById("encumbrance-value").innerHTML = 0;
  document.getElementById("survival-value").innerHTML = 0;

  document.getElementById("attribute-melee-value").innerHTML = baseMelee;
  document.getElementById("attribute-armor-value").innerHTML = baseArmor;
  document.getElementById("attribute-health-value").innerHTML = baseHealth;
  document.getElementById("attribute-ranged-value").innerHTML = baseRanged;
  document.getElementById("attribute-stamina-value").innerHTML = baseStamina;
  document.getElementById("attribute-encumbrance-value").innerHTML = baseEncumbrance;
  document.getElementById("attribute-sustenance-value").innerHTML = baseSustenance;
  document.getElementById("reset-button").addEventListener("click", resetAll);

  $(".tooltip-element").hover(function()
  {
    var element = this;

    if (this.id.includes("-button-inc"))
    {
      tooltipRepeat = setInterval(function()
      {
        updateTooltip(element);
      }, 10);
    }
    else
    {
      updateTooltip(element);
    }
  },
  function()
  {
    $(this).attr("title", $(this).data("tooltipText"));
    $(".tooltip").remove();
    clearInterval(tooltipRepeat);
  })
  .mousemove(function(e)
  {
    mouseX = e.pageX + 20;
    mouseY = e.pageY + 10;
    $(".tooltip").css({ left: mouseX, top: mouseY });
  });

  $(".stat-button").mousedown(function()
  {
    var elementId = this.id;

    if (elementId.includes("inc"))
    {
      increaseStat(elementId.replace("-button-inc", ""));

      timeout = setTimeout(function(){
        repeat = setInterval(function()
        {
          increaseStat(elementId.replace("-button-inc", ""));
        }, repeatDelay);
      }, timeoutDelay);
    }
    else
    {
      decreaseStat(elementId.replace("-button-dec", ""));

      timeout = setTimeout(function(){
        repeat = setInterval(function()
        {
          decreaseStat(elementId.replace("-button-dec", ""));
        }, repeatDelay);
      }, timeoutDelay);
    }
  });

  $(".stat-button").mouseup(function ()
  {
    clearInterval(repeat);
    clearTimeout(timeout);
  });

  $(".stat-button").mouseout(function ()
  {
    clearInterval(repeat);
    clearTimeout(timeout);
  });

  setPointsProgress();
});

function updateTooltip(e)
{
  $(e).attr("title", $(e).data("tooltipText"));
  $(".tooltip").remove();

  var title = $(e).attr("title");
  var elementId = e.id;
  var stat = elementId.replace("-button-inc", "");

  if (elementId.includes("-button-inc"))
  {
    var cost = getStatCost(stats[stat]);

    if (remainingPoints - cost >= 0)
    {
      title = "Cost: " + cost;
    }
    else
    {
      title = "Not enough points!";
    }
  }

  $(e).data("tooltipText", title).removeAttr("title");
  $('<p class="tooltip"></p>').text(title).appendTo("body").fadeIn(0);
  $(".tooltip").css({ left: mouseX, top: mouseY });
}

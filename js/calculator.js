var maxLevel = 50;
var level = 1;
var spentPoints = 0;

var baseMelee = 0;
var baseArmor = 0;
var baseHealth = 200;
var baseRanged = 0;
var baseStamina = 100;
var baseEncumbrance = 70;
var baseSustenance = 0;

var stats = {};
stats["strength"] = 0;
stats["agility"] = 0;
stats["vitality"] = 0;
stats["accuracy"] = 0;
stats["grit"] = 0;
stats["encumbrance"] = 0;
stats["survival"] = 0;

var attributes = {};
attributes["melee"] = baseMelee;
attributes["armor"] = baseArmor;
attributes["health"] = baseHealth;
attributes["ranged"] = baseRanged;
attributes["stamina"] = baseStamina;
attributes["encumbrance"] = baseEncumbrance;
attributes["sustenance"] = baseSustenance;

var attributeEffects = {};
attributeEffects["strength"] = "melee";
attributeEffects["agility"] = "armor";
attributeEffects["vitality"] = "health";
attributeEffects["accuracy"] = "ranged";
attributeEffects["grit"] = "stamina";
attributeEffects["encumbrance"] = "encumbrance";
attributeEffects["survival"] = "sustenance";

var statWeights = {};
statWeights["melee"] = 0;
statWeights["armor"] = 1;
statWeights["health"] = 12;
statWeights["ranged"] = 0;
statWeights["stamina"] = 3;
statWeights["encumbrance"] = 7;
statWeights["sustenance"] = 0;

var repeat, timeout;
var timeoutDelay = 250;
var repeatDelay = 100;

$(document).ready(function()
{
  document.getElementById("level-value").innerHTML = level;
  document.getElementById("points-value").innerHTML = spentPoints;

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

function resetAll()
{
  for (var stat in stats)
  {
    stats[stat] = 0;
    document.getElementById(stat + "-value").innerHTML = 0;
    setProgress(stat);
  }

  attributes["melee"] = baseMelee;
  attributes["armor"] = baseArmor;
  attributes["health"] = baseHealth;
  attributes["ranged"] = baseRanged;
  attributes["stamina"] = baseStamina;
  attributes["encumbrance"] = baseEncumbrance;
  attributes["sustenance"] = baseSustenance;
  document.getElementById("attribute-melee-value").innerHTML = baseMelee;
  document.getElementById("attribute-armor-value").innerHTML = baseArmor;
  document.getElementById("attribute-health-value").innerHTML = baseHealth;
  document.getElementById("attribute-ranged-value").innerHTML = baseRanged;
  document.getElementById("attribute-stamina-value").innerHTML = baseStamina;
  document.getElementById("attribute-encumbrance-value").innerHTML = baseEncumbrance;
  document.getElementById("attribute-sustenance-value").innerHTML = baseSustenance;

  level = 1;
  spentPoints = 0;
  document.getElementById("level-value").innerHTML = level;
  document.getElementById("points-value").innerHTML = spentPoints;

  setPointsProgress();
}

function getStatCost(value)
{
  return parseInt(value / 5) + 1;
}

function getLevelByPoints(value)
{
  var tempValue = value;
  var level = 0;

  var i = 1;
  while (tempValue > 0)
  {
    tempValue -= parseInt(i++ / 5) + 1;
    level++;
  }

  if (level <= 0)
    level = 1;

  return level;
}

function getProgress(stat)
{
  return progress = (stats[stat] / 50) * 100;
}

function setPointsProgress()
{
  var points = ((275 - spentPoints) / 275) * 100;
  document.getElementById("progress-points").style.width = points + "%";
}

function setProgress(stat)
{
  var progress = getProgress(stat);
  document.getElementById("progress-" + stat).style.width = progress + "%";
}

function increaseStat(stat)
{
  var cost = getStatCost(stats[stat]);

  if (level < 50)
  {
    spentPoints += cost;
    stats[stat]++;
    var levelReq = getLevelByPoints(spentPoints);
    level = levelReq;
    document.getElementById(stat + "-value").innerHTML = stats[stat];
    document.getElementById("points-value").innerHTML = spentPoints;
    document.getElementById("level-value").innerHTML = level;

    var attribute = attributeEffects[stat];
    document.getElementById("attribute-" + attribute + "-value").innerHTML = attributes[attribute] + (statWeights[attribute] * stats[stat]);
    setProgress(stat);
    setPointsProgress();
  }
}

function decreaseStat(stat)
{
  var cost = getStatCost(stats[stat] - 1);

  if (stats[stat] > 0)
  {
    spentPoints -= cost;
    stats[stat]--;
    var levelReq = getLevelByPoints(spentPoints);
    level = levelReq;
    document.getElementById(stat + "-value").innerHTML = stats[stat];
    document.getElementById("points-value").innerHTML = spentPoints;
    document.getElementById("level-value").innerHTML = level;

    var attribute = attributeEffects[stat];
    document.getElementById("attribute-" + attribute + "-value").innerHTML = attributes[attribute] + (statWeights[attribute] * stats[stat]);
    setProgress(stat);
    setPointsProgress();
  }
}

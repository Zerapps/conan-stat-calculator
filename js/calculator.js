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
  return progress = (stats[stat] / maxLevel) * 100;
}

function setPointsProgress()
{
  var points = ((maxPoints - spentPoints) / maxPoints) * 100;
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

  if (spentPoints + cost <= maxPoints)
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

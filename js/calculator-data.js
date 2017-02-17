var maxLevel = 50;
var maxPoints = 275;
var remainingPoints = 275;
var level = 1;

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
statWeights["melee"] = 1;
statWeights["armor"] = 1;
statWeights["health"] = 12;
statWeights["ranged"] = 1;
statWeights["stamina"] = 3;
statWeights["encumbrance"] = 7;
statWeights["sustenance"] = 0;

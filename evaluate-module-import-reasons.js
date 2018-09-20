#!/usr/bin/env node

const path = require('path');
const file = process.argv[2];

const stats = require(path.resolve(file));

console.log(`Depency tree for modules in ${file}`);
console.log(`Found ${stats.modules.length} modules`);

for (const mod of stats.modules) {
    console.log(`Module: ${mod.name}, ID: ${mod.id}`);
    console.log(`\t> Found ${mod.reasons.length} Reasons:`);
    console.log('\t\t> ' + mod.reasons.map(({moduleId, module}) => `moduleId: ${moduleId}, module: ${module}`).join('\n\t\t> '));
}

console.log('\n\n\n');
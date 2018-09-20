# ModuleConcatenationPlugin is setting `modules[].reasons[].moduleId` to null in some cases

This project demonstrates how the `optimization.concatenateModules` flag which is turned on in production mode makes the produced stats object less usable.

To my understanding, the stats should be usable to trace the dependency tree of a given module. Each `module` in the `modules` array contains an array of `reasons`. These reasons each contain a `moduleId` proper which can be used to find the whole module information from the `modules` array.

In some cases, the ModuleConcatenationPlugin breaks this when it concatenates modules and not generating a new module id that is used.

This is demonstrated in this project:

```
yarn install
yarn start
```


Output is similar to:


```
#
# This shows it failing
#

$ ./evaluate-module-import-reasons.js stats/with-concat-plugin.json
Depency tree for modules in stats/with-concat-plugin.json
Found 3 modules
Module: ./src/entry.js, ID: 0
	> Found 1 Reasons:
		> moduleId: null, module: null
Module: ./src/first-async.js + 1 modules, ID: 1
	> Found 1 Reasons:
		> moduleId: 0, module: ./src/entry.js
Module: ./src/second-async.js, ID: 2
	> Found 1 Reasons:
		> moduleId: null, module: ./src/first-async.js
#         ^^^^^^^^^^^^^^ I would not expect this to be `null`, rather I would expect it to be `1`.


#
# This shows it working properly
#

$ ./evaluate-module-import-reasons.js stats/without-concat-plugin.json
Depency tree for modules in stats/without-concat-plugin.json
Found 4 modules
Module: ./src/entry.js, ID: 0
	> Found 1 Reasons:
		> moduleId: null,  module: null
Module: ./src/first-async.js, ID: 1
	> Found 1 Reasons:
		> moduleId: 0, module: ./src/entry.js
Module: ./src/first-async-dependency.js, ID: 2
	> Found 1 Reasons:
		> moduleId: 1, module: ./src/first-async.js
Module: ./src/second-async.js, ID: 3
	> Found 1 Reasons:
		> moduleId: 1, module: ./src/first-async.js
#         ^^^^^^^^^^^ Note that it sets the module name properly
```
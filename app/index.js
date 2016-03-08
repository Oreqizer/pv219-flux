import "babel-polyfill";

import immutable from "immutable";
import immutableDevtools from "immutable-devtools";

immutableDevtools(immutable);

import "./stylus/app.styl";

console.log("test")

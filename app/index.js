import "babel-polyfill";

import immutable from "immutable";
import immutableDevtools from "immutable-devtools";

immutableDevtools(immutable);

// app
import "jquery";
import "bootstrap";

// import "./js/app.js";
import "./js/flux.js";

// styles
import "bootstrap-css";
import "bootstrap-theme";
import "./stylus/app.styl";

import "./index.html";
import "./favicon.ico";

// images
import "./images/lifeinvader-logo.png";

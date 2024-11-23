/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


//path to styles css
var styles = [{
  name: "Style 1",
  path: "css/style.css"
}, {
  name: "Style 2",
  path: "css/style2.css"
}, {
  name: "Style 3",
  path: "css/style3.css"
}, {
  name: "Style 4",
  path: "css/style4.css"
}, {
  name: "Style 5",
  path: "css/style5.css"
}];
var curr_link = document.getElementById("list-stylesheet");
var css_container = document.getElementById("style-links");
if (curr_link && css_container) {
  styles.forEach(function (style) {
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = style.name;
    link.style.marginRight = "10px";
    link.style.cursor = "pointer";
    link.onclick = function (event) {
      event.preventDefault();
      curr_link.href = style.path;
      saveStyle(style.path);
    };
    css_container.appendChild(link);
  });
  loadStyle();
}
//localstorage save css
function loadStyle() {
  var savedStyle = localStorage.getItem("selectedStyle");
  if (savedStyle && curr_link) {
    curr_link.href = savedStyle;
  }
}
function saveStyle(stylePath) {
  localStorage.setItem("selectedStyle", stylePath);
}
/******/ })()
;
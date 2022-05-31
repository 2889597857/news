import vue from "./vue";
import html from "./html";
import autoImport from "./autoImport";
// import iconify from './iconify';
// import windicss from './windicss';
import visualizer from "./visualizer";

// const plugins = [vue, ...html, ...iconify, windicss, visualizer];
const plugins = [...vue, ...html, autoImport, visualizer];
export default plugins;

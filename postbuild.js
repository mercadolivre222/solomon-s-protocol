import fs from "fs";
import path from "path";

// Ensure dist directory exists
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist", { recursive: true });
}

// Copy index.html to dist/index.html
fs.copyFileSync("index.html", "dist/index.html");

// Ensure dist/src/assets directory exists
const destAssetsDir = path.join("dist", "src", "assets");
fs.mkdirSync(destAssetsDir, { recursive: true });

// Copy solomon-lock.jpg
const lockSrc = path.join("src", "assets", "solomon-lock.jpg");
const lockDest = path.join(destAssetsDir, "solomon-lock.jpg");
if (fs.existsSync(lockSrc)) {
  fs.copyFileSync(lockSrc, lockDest);
}

// Copy solomon-lock.png
const lockPngSrc = path.join("src", "assets", "solomon-lock.png");
const lockPngDest = path.join(destAssetsDir, "solomon-lock.png");
if (fs.existsSync(lockPngSrc)) {
  fs.copyFileSync(lockPngSrc, lockPngDest);
}

// Copy stone-bg.jpg if it exists
const stoneBgSrc = path.join("src", "assets", "stone-bg.jpg");
const stoneBgDest = path.join(destAssetsDir, "stone-bg.jpg");
if (fs.existsSync(stoneBgSrc)) {
  fs.copyFileSync(stoneBgSrc, stoneBgDest);
}

console.log("Successfully prepared static files in dist/ for Vercel deployment!");

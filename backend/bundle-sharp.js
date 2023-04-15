const cp = require("fs").promises.cp;

const copySharp = async () => {
  cp("./node_modules/sharp", "./build/node_modules/sharp", {
    recursive: true,
  });
  cp("./node_modules/color", "./build/node_modules/color", {
    recursive: true,
  });
  cp("./node_modules/color-convert", "./build/node_modules/color-convert", {
    recursive: true,
  });
  cp("./node_modules/color-name", "./build/node_modules/color-name", {
    recursive: true,
  });
  cp("./node_modules/color-string", "./build/node_modules/color-string", {
    recursive: true,
  });
  cp("./node_modules/detect-libc", "./build/node_modules/detect-libc", {
    recursive: true,
  });
  cp("./node_modules/is-arrayish", "./build/node_modules/is-arrayish", {
    recursive: true,
  });
  cp("./node_modules/semver", "./build/node_modules/semver", {
    recursive: true,
  });
  cp("./node_modules/simple-swizzle", "./build/node_modules/simple-swizzle", {
    recursive: true,
  });
};

copySharp();

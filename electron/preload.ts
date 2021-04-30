const customTitlebar = require('custom-electron-titlebar');
const { Menu, MenuItem } = require('electron');

window.addEventListener('DOMContentLoaded', () => {

  if (process.platform !== 'darwin') {
    const titlebar = new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#ECECEC')
    });
  }

  const replaceText = (selector: any, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    // @ts-ignore
    replaceText(`${type}-version`, process.versions[type]);
  }
});

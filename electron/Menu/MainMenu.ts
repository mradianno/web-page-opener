import { Menu, MenuItem } from 'electron';

export function InitMainMenu() {
  const menu = new Menu();
  menu.append(
    new MenuItem({
        label: 'Back',
        click: () => console.log('Click on subitem 1')
      }
    )
  );

  menu.append(
    new MenuItem({
        label: 'Next',
        click: () => console.log('Click on subitem 2')
      }
    )
  );

  Menu.setApplicationMenu(menu);
}
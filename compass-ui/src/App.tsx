import { useEffect, useState } from 'react'
import './App.css'
import { fetchBackendsData, MenuItem } from './fetchBackendsData'

const MenuBackends = ["http://localhost:3000/compass/menu", "http://localhost:3001/compass/menu"]

function useCompassMenu(backends: string[]) {
  const [ menuItems, setMenuItems ] = useState<MenuItem[]>([])

  useEffect(() => {
    fetchBackendsData(backends).then((items) => {
      setMenuItems(items.flat())
    })
  }, [backends])

  return menuItems
}

function App() {
  const menus = useCompassMenu(MenuBackends)

  return (
    <ul>
      {menus.map((menu, menuIndex) => (
        <li key={`${menu}-${menu.label}-${menuIndex}`}>
          <a href={menu.url}>{menu.label}</a>
          <ul>
            {menu.items?.map((item, index) => (
              <li key={`${item}-${item.label}-${index}`}>
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default App

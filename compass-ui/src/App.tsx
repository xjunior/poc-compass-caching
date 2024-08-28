import { useEffect, useState } from 'react'
import './App.css'

const MenuBackends = ["http://localhost:3000/compass/menu", "http://localhost:3001/compass/menu"]

type MenuItem = {
  label: string
  url?: string
  items?: MenuItem[]
}

async function fetchServiceData(backend: string) {
  return await fetch(backend, { cache: 'default' })
                  .then((response) => response.json())
}

function useCompassMenu(backends: string[]) {
  const [ menuItems, setMenuItems ] = useState<MenuItem[]>([])

  useEffect(() => {
    const updatedMenu = backends.map(fetchServiceData)

    Promise.all(updatedMenu).then((items) => {
      setMenuItems(items)
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

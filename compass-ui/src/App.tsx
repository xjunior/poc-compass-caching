import { useEffect, useState } from 'react'
import './App.css'
import { CachePolicies, useFetch } from 'use-http'

const MenuBackends = ["http://localhost:3000/compass/menu", "http://localhost:3001/compass/menu"]

type MenuItem = {
  label: string
  url?: string
  items?: MenuItem[]
}

function useCompassMenu(backends: string[]) {
  const [ menuItems, setMenuItems ] = useState<MenuItem[]>([])
  const menuBackends = backends.map((backend) => useFetch(backend, { cachePolicy: CachePolicies.CACHE_FIRST }))

  useEffect(() => {
    const updatedMenu = menuBackends.map((backend) => backend.get())
    Promise.all(updatedMenu).then((items) => {
      setMenuItems(items.filter(Boolean))
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

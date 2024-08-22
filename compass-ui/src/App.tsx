import { useEffect, useState } from 'react'
import './App.css'

const MenuBackends = ["http://localhost:3000/compass/menu", "http://localhost:3001/compass/menu"]

type MenuItem = {
  label: string
  url?: string
  items?: MenuItem[]
}

function useCompassMenu(backends: string[]) {
  const [ menu, setMenu ] = useState<MenuItem[]>([])

  useEffect(() => {
    const headers = new Headers()
    headers.set("Cache-Control", "max-age=10")
    const updatedMenu = backends.map(async (menuUrl) => await fetch(menuUrl, { cache: 'force-cache', headers }))
                                .map(async (response) => (await response).json())
    Promise.all(updatedMenu).then(setMenu)
  }, [backends])

  return menu
}

function App() {
  const menus = useCompassMenu(MenuBackends)

  return (
    <ul>
      {menus.map((menu) => (
        <li>
          <a href={menu.url}>{menu.label}</a>
          <ul>
            {menu.items?.map((item) => (
              <li>
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

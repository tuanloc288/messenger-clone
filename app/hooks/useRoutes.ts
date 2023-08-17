import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()
    const { systemTheme, theme, setTheme } = useTheme()  

    useEffect(() => {
        const localTheme = localStorage.getItem("theme")
          ? systemThemeCheck(localStorage.getItem("theme"))
          : systemThemeCheck(theme);
        if (localTheme) {
          setTheme(localTheme);
        }
      }, []);
    
      const themeSwitcher = () => {
        const newTheme =
          localStorage.getItem("theme") === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
      };
    
      const systemThemeCheck = (t: any) => {
        return t === "system" ? systemTheme : theme;
      };

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Theme',
            href: '#',
            icon: theme === 'dark' ? BsSunFill : BsMoonFill,
            onClick: () => themeSwitcher()
        },
        {
            label: 'Logout',
            href: '#',
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut()
        }
    ],[pathname, conversationId, theme])

    return routes
}

export default useRoutes

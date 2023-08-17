import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

const Sidebar = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const curUser = await getCurrentUser()

  return (
    <div className="h-full">
      {/* 
        When passing data from sv comp to client comp
        might occur error say that can only pass a certain type of data
        fix this by install next-superjson-plugin
        then goto next.config add swgPlugins
        finally add a exclamation point to the end of the passed data
      */}
      <DesktopSidebar currentUser={curUser!}/>
      <MobileFooter />
      <main className="lg:pl-20 h-full bg-white dark:bg-zinc-800">
        {children}
      </main>
    </div>
  )
}

export default Sidebar
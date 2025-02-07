import { navbarLinks_es } from "@/constants/navbarLinks"
import { DownloadResumeButton } from "./DownloadResumeButton"
import NavItem from "./NavItem"

const NavBar = () => {
	return (
		<nav className="absolute top-10 z-20 mx-auto flex animate-fade-in space-x-8">
			<ul className="flex items-center justify-between rounded-full p-1">
				{navbarLinks_es.map((link) => (
					<NavItem {...link} />
				))}
			</ul>
			<DownloadResumeButton />
			<div></div>
		</nav>
	)
}

export default NavBar

import "@/styles/NavItem.css"
import { ArrowDownToDot, CodeIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface navItemProps {
	href: string
	title: string
}

const NavItem = ({ href, title }: navItemProps) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname)
	useEffect(() => {
		setCurrentPath(window.location.pathname)
		console.log(window.location)
	}, [])

	return (
		<li
			onClick={(e) => {
				e.currentTarget.querySelector("a")?.click()
			}}
			className={`relative rounded-full font-semibold after:bg-orange-500 ${href == currentPath ? "active cursor-default text-orange-500" : "inactive cursor-pointer text-slate-300 hover:text-orange-500"} px-4 py-2 transition duration-300 before:bg-orange-500 after:bg-orange-500`}
		>
			<a
				className="relative"
				title={`Enlace a la sección ${title == "</>" ? "Principal" : title}`}
				href={href}
			>
				<span
					className={`${href == currentPath ? "flex" : "hidden"} absolute -top-6 w-full justify-center`}
				>
					<ArrowDownToDot />
				</span>
				{href == "/" ? <CodeIcon /> : title}
			</a>
		</li>
	)
}

export default NavItem

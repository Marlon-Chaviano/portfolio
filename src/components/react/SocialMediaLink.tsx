import type { JSX } from "react"

interface LinkProps {
	name: string
	href: string
	icon: ({ className }: { className?: string }) => JSX.Element
}

const SocialMediaLink = ({ href, icon, name }: LinkProps) => {
	return (
		<a
			title={name}
			href={href}
			className="group rounded-xl border-orange-500/[0.4] p-3 hover:border hover:border-orange-500/30 hover:bg-slate-900 hover:shadow-xl hover:shadow-orange-500/30"
		>
			{icon({
				className:
					"md:size-12 size-8  stroke-orange-500/60 transition duration-200 group-hover:stroke-orange-500",
			})}
		</a>
	)
}

export default SocialMediaLink

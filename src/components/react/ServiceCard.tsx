import { MoveRight } from "lucide-react"
import type { JSX } from "react"

interface Props {
	title: string
	body: string
	icon: () => JSX.Element
}

export const ServiceCard = ({ title, body, icon }: Props) => {
	return (
		<article className="group grid w-full max-w-sm gap-y-4 rounded-xl border border-orange-500/[0.30] p-8 shadow-lg shadow-orange-600/[0.20]">
			<div className="flex w-fit rounded-full border border-orange-500/[0.50] p-4 shadow-md shadow-orange-600/[0.50]">
				<span>{icon()}</span>
			</div>
			<p className="text-xl font-bold text-slate-300">{title}</p>
			<p className="text-sm text-slate-400">{body}</p>

			<a
				className="relative -ml-2 mt-auto flex w-fit items-center rounded-full border border-transparent px-2 py-1 text-center font-semibold text-orange-500 transition duration-500 group-hover:border-orange-500/[0.50] group-hover:shadow-xl group-hover:shadow-orange-600/[0.60]"
				href="/servicios/"
			>
				<span>Ver más</span>
				<span className="absolute -right-6 transition duration-200 group-hover:translate-x-2">
					<MoveRight />
				</span>
			</a>
		</article>
	)
}

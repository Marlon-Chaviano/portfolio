import { FileDown } from "lucide-react"
import { Button } from "../ui/moving-border"

export const DownloadResumeButton = () => {
	return (
		<Button
			containerClassName="shadow-orange-500/20  hover:shadow-orange-500/30 hover:shadow-xl transition duration-200 group"
			borderRadius="1.75rem"
			className="flex items-center space-x-2 border-slate-800 bg-slate-950 text-orange-500 shadow-lg transition duration-200 hover:bg-slate-900 group-hover:border-orange-500/70"
		>
			<span className="">Curriculum</span>
			<FileDown />
		</Button>
	)
}

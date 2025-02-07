import { AstroIcon } from "@/components/react/icons/AstroIcon"
import ChartJSicon from "@/components/react/icons/ChartJSicon"
import DjangoIcon from "@/components/react/icons/DjangoIcon"
import LaravelIcon from "@/components/react/icons/LaravelIcon"
import { MaterialUiIcon } from "@/components/react/icons/MaterialUiIcon"
import ReactIcon from "@/components/react/icons/ReactIcon"
import { TailwindIcon } from "@/components/react/icons/TailwindIcon"
import { Timeline } from "@/components/ui/timeline"
import { GithubIcon, ScreenShare } from "lucide-react"

const data = [
	{
		title: "2023-24",
		content: (
			<article className="flex flex-col space-y-4">
				<div>
					<h4 className="text-xl font-bold text-slate-300">Desarrollador Full Stack</h4>
					<p className="text-lg font-semibold text-slate-400">Prácticas Profesionales</p>
					<p className="text-balance text-sm text-slate-400">
						Desarrollo de un{" "}
						<span className="text-orange-300 underline">
							<a
								target="_blank"
								rel="noreferrer"
								href="https://www.google.com/search?q=que+es+un+observatorio+tecnologico&sca_esv=8cc3bf1e6fd11b7c&sxsrf=ADLYWIK1NS2VW9YKBd54Puw_ycWj5BYZuw%3A1737489648447&ei=8PyPZ5aBG9yTwbkPnbXimAY&ved=0ahUKEwiWua-qzYeLAxXcSTABHZ2aGGMQ4dUDCBA&uact=5&oq=que+es+un+observatorio+tecnologico&gs_lp=Egxnd3Mtd2l6LXNlcnAiInF1ZSBlcyB1biBvYnNlcnZhdG9yaW8gdGVjbm9sb2dpY28yChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEdI8BdQggZYoBZwAXgBkAEAmAEAoAEAqgEAuAEDyAEA-AEBmAIBoAIJmAMAiAYBkAYIkgcBMaAHAA&sclient=gws-wiz-serp"
							>
								Observatorio Tecnológico
							</a>
						</span>{" "}
						para el{" "}
						<span className="text-orange-300 underline">
							<a href="https://www.minem.gob.cu/es">MINEM</a>
						</span>
					</p>
				</div>
				<div className="flex space-x-2">
					<ReactIcon className="size-10 fill-orange-500" />
					<DjangoIcon className="size-10 fill-orange-500 stroke-orange-500 text-orange-500" />
					<TailwindIcon className="size-10 fill-orange-500 stroke-orange-500 text-orange-500" />
					<MaterialUiIcon className="size-10 stroke-orange-500 text-orange-500" />
					<ChartJSicon className="size-10 stroke-orange-500 text-orange-500" />
				</div>

				<div>
					<img
						src="src/assets/observatorio-minem.webp"
						width={1920}
						height={1080}
						alt="Observatorio Tecnológico CIPIMM"
						className="rounded-2xl"
					/>
				</div>
				<div className="unavailable-tag">
					<p>No disponible</p>
				</div>
			</article>
		),
	},
	{
		title: "Jul 2024",
		content: (
			<article className="flex flex-col space-y-4">
				<div>
					<h4 className="text-nowrap text-xl font-bold text-slate-300">Desarrollador Frontend</h4>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://nsmedicalcenter.com"
						className="text-lg font-semibold text-orange-400 underline"
						title="Sitio Web de Nel & Shey Medical Center"
					>
						Nel & Shey Medical Center
					</a>
					<p className="text-balance text-sm text-slate-400">
						Landing Page Responsiva - Panel Administrativo
					</p>
				</div>
				<div className="flex space-x-2">
					<AstroIcon className="size-10 fill-orange-500" />
					<ReactIcon className="size-10 fill-orange-500" />
					<TailwindIcon className="size-10 fill-orange-500 stroke-orange-500 text-orange-500" />
					<LaravelIcon className="size-10 stroke-orange-500" />
				</div>
				<div>
					<img
						src="src/assets/nel&shey.webp"
						width={1920}
						height={1080}
						alt="Nel & Shey Medical Center"
						className="rounded-2xl"
					/>
				</div>

				<div className="mt-4 flex space-x-4">
					<a
						title="Repositorio del proyecto Nel & Shey Medical Center"
						target="_blank"
						rel="noreferrer"
						href="https://github.com/ezi-arts/nsmedicalcenter"
						className="rounded-full border border-transparent p-2 transition duration-200 hover:border-orange-500 hover:bg-slate-900 hover:shadow-xl hover:shadow-orange-500/50"
					>
						<GithubIcon className="size-5 stroke-orange-500" />
					</a>
					<a
						title="Sitio Web de Nel & Shey Medical Center"
						target="_blank"
						rel="noreferrer"
						href="http://nsmedicalcenter.com"
						className="rounded-full border border-transparent p-2 transition duration-200 hover:border-orange-500 hover:bg-slate-900 hover:shadow-xl hover:shadow-orange-500/50"
					>
						<ScreenShare className="size-5 stroke-orange-500" />
					</a>
				</div>
			</article>
		),
	},
	{
		title: "Sept 2024",
		content: (
			<article className="flex flex-col space-y-4">
				<div>
					<h4 className="text-nowrap text-xl font-bold text-slate-300">Desarrollador Frontend</h4>
					<a
						title="Sitio Web de ConnetCare"
						target="_blank"
						rel="noreferrer"
						href="https://connetcare.com"
						className="text-lg font-semibold text-orange-400 underline"
					>
						ConnetCare
					</a>
					<p className="text-balance text-sm text-slate-400">Landing Page Responsiva</p>
				</div>

				<div className="flex space-x-2">
					<AstroIcon className="size-10 fill-orange-500" />
					<ReactIcon className="size-10 fill-orange-500" />
					<TailwindIcon className="size-10 fill-orange-500 stroke-orange-500 text-orange-500" />
				</div>

				<div>
					<img
						src="src/assets/connetcare.webp"
						width={1920}
						height={1080}
						alt="ConnetCare"
						className="rounded-2xl"
					/>
				</div>

				<div className="mt-4 flex space-x-4">
					<a
						title="Repositorio del proyecto ConnetCare"
						target="_blank"
						rel="noreferrer"
						href="https://github.com/ezi-arts/connect-care"
						className="rounded-full border border-transparent p-2 transition duration-200 hover:border-orange-500 hover:bg-slate-900 hover:shadow-xl hover:shadow-orange-500/50"
					>
						<GithubIcon className="size-5 stroke-orange-500" />
					</a>
					<a
						title="Sitio Web ConnetCare"
						target="_blank"
						rel="noreferrer"
						href="http://connetcare.com"
						className="rounded-full border border-transparent p-2 transition duration-200 hover:border-orange-500 hover:bg-slate-900 hover:shadow-xl hover:shadow-orange-500/50"
					>
						<ScreenShare className="size-5 stroke-orange-500" />
					</a>
				</div>
			</article>
		),
	},
]

const WorkExperience = () => {
	return (
		<section className="relative mt-20 w-full">
			<div className="w-full px-2 text-center md:px-20">
				<h2 className="heading">Experiencia Laboral</h2>
				<p className="subheading">
					He estado trabajando de manera Freelance como{" "}
					<span className="text-orange-500">Desarrollador Frontend</span> el pasado año, también
					ocupo el puesto de <span className="text-orange-500">Desarrollador Full Stack</span> en el
					proyecto de mis practicas profesionales (Proyecto Universitario).
				</p>
			</div>
			<div className="relative w-full bg-slate-950">
				<Timeline data={data} />
			</div>
		</section>
	)
}

export default WorkExperience

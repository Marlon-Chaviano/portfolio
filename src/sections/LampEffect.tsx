import SocialMediaLink from "@/components/react/SocialMediaLink"
import { LampContainer } from "@/components/ui/lamp"
import { socialMediaLinks } from "@/constants/socialLinks"
import { motion } from "framer-motion"
import { LucideMessagesSquare, PaintRollerIcon } from "lucide-react"

export default function LampEffect() {
	return (
		<LampContainer className="mt-10">
			<motion.div
				initial={{ opacity: 0.5, y: 50 }}
				whileInView={{ opacity: 1, y: -100 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
			>
				<h1 className="gradient-text mt-10 text-4xl md:text-7xl">
					Marlon Chaviano <br /> Desarrollador Frontend
				</h1>
				<p className="gradient-text text-pretty py-0 text-xl md:text-2xl">
					con experiencia en crear sitios intuitivos y responsivos. <br /> Me apasiona resolver
					problemas y ofrecer experiencias de usuario efectivas. <br />
					Siempre estoy aprendiendo nuevas tecnologías para mejorar mis proyectos.
				</p>
				<div className="mt-6 flex items-center justify-center space-x-8">
					<button className="flex w-fit space-x-3 rounded-full border border-orange-500 px-10 py-3 font-bold text-orange-500 shadow-orange-500/20 transition duration-200 hover:-translate-y-1 hover:bg-slate-900 hover:shadow-xl hover:shadow-orange-500/30">
						<span>Proyectos</span>
						<PaintRollerIcon />
					</button>
					<button className="flex w-fit space-x-3 rounded-full bg-orange-500 px-10 py-3 font-bold text-slate-950 shadow-orange-500/20 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30">
						<span>Contáctame</span>
						<LucideMessagesSquare />
					</button>
				</div>
				<div className="mt-10 flex justify-center space-x-6 md:space-x-10">
					{socialMediaLinks.map((social) => (
						<SocialMediaLink {...social} />
					))}
				</div>
			</motion.div>
		</LampContainer>
	)
}

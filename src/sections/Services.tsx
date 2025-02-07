import { ServiceList } from "@/components/react/ServiceList"
import { motion } from "framer-motion"

const Services = () => {
	return (
		<motion.section
			className="-mt-20"
			initial={{ opacity: 0.5, y: 50 }}
			whileInView={{ opacity: 1, y: -50 }}
			transition={{
				delay: 0.3,
				duration: 0.8,
				ease: "easeInOut",
			}}
		>
			<div className="my-4 w-full text-center">
				<h2 className="heading">Servicios</h2>
			</div>
			<ServiceList />
		</motion.section>
	)
}

export default Services

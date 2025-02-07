import { services } from "@/constants/services"
import { ServiceCard } from "./ServiceCard"

export const ServiceList = () => {
	return (
		<section className="mx-auto flex flex-col justify-center space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
			{services.map((service) => (
				<ServiceCard {...service} />
			))}
		</section>
	)
}

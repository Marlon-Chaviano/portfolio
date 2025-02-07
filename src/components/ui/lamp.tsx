import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

export const LampContainer = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn(
				"overfl relative z-0 flex min-h-screen w-full flex-col items-center justify-start rounded-md",
				className
			)}
		>
			<div className="absolute top-72 isolate z-0 flex w-full flex-1 scale-y-[2.20] items-center justify-center">
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
					}}
					className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-orange-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
				>
					<div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
					<div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
				</motion.div>
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
					}}
					className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-orange-500 text-white [--conic-position:from_290deg_at_center_top]"
				>
					<div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
					<div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
				</motion.div>
				<div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
				<div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
				<div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[30rem] rounded-full bg-orange-500 opacity-50 blur-3xl"></div>
				<motion.div
					initial={{ width: "8rem" }}
					whileInView={{ width: "16rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-orange-400 blur-2xl"
				></motion.div>
				<motion.div
					initial={{ width: "15rem" }}
					whileInView={{ width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] rounded-full bg-orange-400"
				></motion.div>

				<div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
			</div>

			<div className="absolute top-40 z-50 flex flex-col items-center px-5">{children}</div>
		</div>
	)
}

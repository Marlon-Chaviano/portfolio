import "@/styles/DecayCard.css"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"

const DecayCard = ({ width = 300, height = 400, children = <div></div> }) => {
	const svgRef = useRef(null)
	const displacementMapRef = useRef(null)
	const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
	const cachedCursor = useRef({ ...cursor.current })
	const winsize = useRef({ width: window.innerWidth, height: window.innerHeight })

	useEffect(() => {
		const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

		const map = (x: number, a: number, b: number, c: number, d: number) =>
			((x - a) * (d - c)) / (b - a) + c

		const distance = (x1: number, x2: number, y1: number, y2: number) => {
			const a = x1 - x2
			const b = y1 - y2
			return Math.hypot(a, b)
		}

		const handleResize = () => {
			winsize.current = { width: window.innerWidth, height: window.innerHeight }
		}

		const handleMouseMove = (ev: { clientX: any; clientY: any }) => {
			cursor.current = { x: ev.clientX, y: ev.clientY }
		}

		window.addEventListener("resize", handleResize)
		window.addEventListener("mousemove", handleMouseMove)

		const imgValues = {
			imgTransforms: { x: 0, y: 0, rz: 0 },
			displacementScale: 0,
		}

		const render = () => {
			let targetX = lerp(
				imgValues.imgTransforms.x,
				map(cursor.current.x, 0, winsize.current.width, -120, 120),
				0.1
			)
			let targetY = lerp(
				imgValues.imgTransforms.y,
				map(cursor.current.y, 0, winsize.current.height, -120, 120),
				0.1
			)
			let targetRz = lerp(
				imgValues.imgTransforms.rz,
				map(cursor.current.x, 0, winsize.current.width, -10, 10),
				0.1
			)

			const bound = 50

			if (targetX > bound) targetX = bound + (targetX - bound) * 0.2
			if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2
			if (targetY > bound) targetY = bound + (targetY - bound) * 0.2
			if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2

			imgValues.imgTransforms.x = targetX
			imgValues.imgTransforms.y = targetY
			imgValues.imgTransforms.rz = targetRz

			gsap.set(svgRef.current, {
				x: imgValues.imgTransforms.x,
				y: imgValues.imgTransforms.y,
				rotateZ: imgValues.imgTransforms.rz,
			})

			const cursorTravelledDistance = distance(
				cachedCursor.current.x,
				cursor.current.x,
				cachedCursor.current.y,
				cursor.current.y
			)
			imgValues.displacementScale = lerp(
				imgValues.displacementScale,
				map(cursorTravelledDistance, 0, 200, 0, 400),
				0.06
			)

			gsap.set(displacementMapRef.current, { attr: { scale: imgValues.displacementScale } })

			cachedCursor.current = { ...cursor.current }

			requestAnimationFrame(render)
		}

		render()

		return () => {
			window.removeEventListener("resize", handleResize)
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [])

	return (
		<div
			className="content relative z-50"
			style={{ width: `${width}px`, height: `${height}px` }}
			ref={svgRef}
		>
			<svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" className="svg rounded-full">
				<filter id="imgFilter">
					<feTurbulence
						type="turbulence"
						baseFrequency="0.015"
						numOctaves="5"
						seed="4"
						stitchTiles="stitch"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
						result="turbulence1"
					/>
					<feDisplacementMap
						ref={displacementMapRef}
						in="SourceGraphic"
						in2="turbulence1"
						scale="0"
						xChannelSelector="R"
						yChannelSelector="B"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
						result="displacementMap3"
					/>
				</filter>
				<g>
					<image
						href="/public/5435.jpg"
						x="0"
						y="0"
						width="600"
						height="750"
						filter="url(#imgFilter)"
						preserveAspectRatio="xMidYMid slice"
					/>
				</g>
			</svg>
			<div className="card-text">{children}</div>
		</div>
	)
}

export default DecayCard

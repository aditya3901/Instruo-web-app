import {
	MathUtils,
	BufferGeometry,
	PointsMaterial,
	Float32BufferAttribute,
} from "three"
import React from "react"
import { useThree, useFrame, Canvas } from "@react-three/fiber"

export const randomDecimal = () => {
	const precision = 100 // 2 decimals
	return (
		Math.floor(
			Math.random() * (10 * precision - 1 * precision) + 1 * precision
		) /
		(1 * precision)
	)
}

export const angleVector = (angle, distance) => {
	const angleRadians = (angle * Math.PI) / 180 + (90 * Math.PI) / 180
	return {
		x: distance * Math.cos(angleRadians),
		y: distance * Math.sin(angleRadians),
	}
}

const Wind = ({ bearing }) => {
	// create the particle variables
	const particleCount = 1200
	const particleSize = 0.05
	const particleTrailSize = 30
	const particleTrailGap = 0.05
	const particleSpeed = 0.05
	const particleDepth = 8
	const scale = 20

	// container width and height
	const { size } = useThree()
	const width = size.width / scale
	const height = size.height / scale
	const bounds = {
		top: -(height / 2),
		bottom: height / 2,
		left: -(width / 2),
		right: width / 2,
	}

	const particles = []
	const particleOptions = []
	// now create the individual particles
	for (var p = 0; p < particleCount; p++) {
		const x = MathUtils.randFloatSpread(width)
		const y = MathUtils.randFloatSpread(height)
		// const z = 0;
		const z = MathUtils.randFloatSpread(particleDepth)
		particles.push(x, y, z)
		for (let i = 0; i < particleTrailSize; i++) {
			particles.push(x, y, z)
		}
		particleOptions.push({
			speed: particleSpeed + (0.5 - randomDecimal()) / 10000,
		})
	}

	const geometry = new BufferGeometry()
	geometry.dynamic = true
	geometry.setAttribute("position", new Float32BufferAttribute(particles, 3))
	const material = new PointsMaterial({
		color: "#FF7700",
		size: particleSize,
	})

	useFrame(() => {
		const particles = geometry.attributes.position.array
		particleOptions.forEach((p, i) => {
			const index = i * (3 + particleTrailSize * 3)
			const particle = {
				x: index,
				y: index + 1,
				z: index + 2,
			}
			const vector = angleVector(bearing, p.speed)
			// x
			particles[particle.x] += vector.x
			if (particles[particle.x] > bounds.right) {
				particles[particle.x] = bounds.left
			} else if (particles[particle.x] < bounds.left) {
				particles[particle.x] = bounds.right
			}
			// y
			particles[particle.y] += vector.y
			if (particles[particle.y] > bounds.bottom) {
				particles[particle.y] = bounds.top
			} else if (particles[particle.y] < bounds.top) {
				particles[particle.y] = bounds.bottom
			}
			// trail
			const gap = angleVector(bearing, particleTrailGap)
			for (let n = 0; n < particleTrailSize; n++) {
				const x = particle.x + 3 * (n + 1)
				const y = particle.y + 3 * (n + 1)
				const z = particle.z + 3 * (n + 1)
				particles[x] = particles[particle.x] - gap.x * n
				particles[y] = particles[particle.y] - gap.y * n
				particles[z] = particles[particle.z]
			}
		})
		geometry.attributes.position.needsUpdate = true
	})

	return (
		<>
			<points args={[geometry, material]} sortParticles={true} />
		</>
	)
}

const WindMap = () => {
	const onCreated = ({ gl }) => {
		// console.log(gl);
		// gl.autoClear = false;
		// gl.autoClearColor = false;
		// console.log(gl.preserveDrawingBuffer);
	}

	return (
		<Canvas dpr={window.devicePixelRatio} onCreated={onCreated}>
			<Wind bearing={45} />
		</Canvas>
	)
}

export default WindMap

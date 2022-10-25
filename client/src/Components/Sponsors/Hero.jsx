import React from "react"
import WindMap from "../Anims/WindMap"
import HeroSection from "../Shared/HeroSection"

const Hero = () => {
	return (
		<>
			<HeroSection
				title={"Sponsors"}
				desc={
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, ullam?"
				}
				breadParams={[
					{
						title: "Instruo",
						url: "/",
					},
					{
						title: "Sponsors",
						url: "",
					},
				]}
			/>
		</>
	)
}

export default Hero

import React from "react"
import SponsorSection from "./SponsorSection"
import Hero from "./Hero"

const Sponsors = () => {
	return (
		<>
			<Hero />
			<SponsorSection title="Title Sponsor" bg={100} />
			<SponsorSection title="Event Sponsor" bg={200} />
			<SponsorSection title="Media Partners" bg={100} />
			<SponsorSection title="Platform Partners" bg={200} />
		</>
	)
}

export default Sponsors

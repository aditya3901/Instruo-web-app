import React from "react"
import HeroSection from "../Shared/HeroSection"
import logo from "../../assets/logo.svg"

const SignUp = () => {
	return (
		<div>
			<HeroSection
				title={"Register"}
				desc={
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, ullam?"
				}
				breadParams={[
					{
						title: "Instruo",
						url: "/",
					},
					{
						title: "Register",
						url: "",
					},
				]}
			/>

			<div className="flex justify-around items-center p-5">
				<img src={logo} width="140px" height="140px" />
				<div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
					<div className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">
									Institute Name
								</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
							/>
							<label className="label">
								<a
									href="#"
									className="label-text-alt link link-hover">
									Forgot password?
								</a>
							</label>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-primary">
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp

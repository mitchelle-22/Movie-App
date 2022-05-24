function Dasboard_header(props) {
    return (
        <div className="d-flex align-items-center container-fluid bg-primary p-4">
			<span className={props.Class}>M</span>
			<h1 className="text-white">{props.title}</h1>
        </div>
    )
}

export default Dasboard_header;
import Dasboard_box_link from './dashboard-box-link'

function Dasboard_body() {
    return (
        <div className="d-flex flex-wrap justify-content-center mt-5">
			
			<Dasboard_box_link link="/accout-settings" title="Accout-settings" icon="fa fa-cog text-dark fs-2"/>
			
			<Dasboard_box_link link="/my-wishlist" title="My-Wishlist" icon="fa fa-heart text-dark fs-2"/>
			
        </div>
    )
}

export default Dasboard_body;
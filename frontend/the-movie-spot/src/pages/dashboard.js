import Dasboard_body from '../components/dashboard-body'
import Dasboard_header from '../components/dashboard-header'

function Dashboard() {
    return (
        <div>
            <Dasboard_header title="Monoametsi" Class="d-flex justify-content-center align-items-center circ border rounded-circle bg-white me-2 fs-3 fw-bold"/>
            <Dasboard_body />
        </div>
    )
}

export default Dashboard;
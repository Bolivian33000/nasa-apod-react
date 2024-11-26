export default function Footer(props) { // this functional component expects the props
    const {showModal, handleToggleModal, data} = props // destructuring the showModal and handlToggleModal functions out of props 
    
    return (
        <footer>
            <div className = "bgGradient"></div> 
            <div>
                <h1>APOD Project</h1>
                <h2>{data?.title}</h2> 
            </div>
            <button onClick={handleToggleModal}> 
                <i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>
    )
}


 {/* with data?.title, if data is not null, return the data.title property; if it is null, return undefined 
                instead of throwing an error */ }
// We are going to make the circle info icon interactive to toggle between showing the info and not
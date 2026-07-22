import { Outlet } from "react-router-dom";

function PublicLayout(){
    return(<>
    
        {/*Public Navbar will come here*/}
        <main>
            <Outlet/>
        </main>
    
    </>);
}

export default PublicLayout;
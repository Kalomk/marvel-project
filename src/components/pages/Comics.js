import { Route, Routes } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import Comics from "../Comics/Comics";
import { Helmet } from "react-helmet";
const ComicsPage = () => {
    return (
        <>
                 <Helmet>
       <meta
      name="description"
      content="Marvel information portal"
    />
    <title>Comics</title>
            </Helmet>
            <AppBanner/>
            <Routes>
                <Route>
                    <Route path="/" element={<Comics/>}/>
                </Route>
            </Routes>
            
        </>
    )
}

export default ComicsPage
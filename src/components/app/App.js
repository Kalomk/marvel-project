import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { lazy,Suspense } from "react";
import Spinner from "../spinner/spinner";

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/Comics'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const ComicLayout = lazy(()=> import("../pages/ComicLayout/ComicLayout"))
const CharLayout = lazy(()=>import("../pages/CharLayout/CharLayout"));

const App = () => {
  
  return (
    <Router>
       <div className="app">
      <AppHeader />
      <main>
          <Suspense fallback ={<Spinner/>}>
            <Routes>
              <Route path="/" element={<MainPage/>}/>
            <Route path="/comics/*" element={<ComicsPage />} />
            <Route path="/comics/:id" element={<SinglePage Component={ComicLayout} dataType ='comic'/>}/>
            <Route path="/characters/:id" element={<SinglePage Component={CharLayout} dataType ='char'/>}/>
            <Route path="*"  element={<Page404/>}/>
        </Routes>
          </Suspense>
      </main>
    </div>
   </Router>
  );
};

export default App;

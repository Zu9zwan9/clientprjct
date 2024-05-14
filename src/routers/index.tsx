import Dashboard from "components/template/dasbboard/Dashboard";
import PublicLayout from "components/template/layouts/PublicLayout";
import LoginPage from "pages/auth/LoginPage";
import RegistrationPage from "pages/auth/RegistrationPage";
import DashboardCarCreatePage from "pages/dashboard/auction/AuctionCreatePage";
import DashboardCarEditPage from "pages/dashboard/auction/AuctionEditPage";
import DashboardCarPage from "pages/dashboard/auction/AuctionPage";
import DashboardCategoryCreatePage from "pages/dashboard/category/CategoryCreatePage";
import DashboardCategoryEditPage from "pages/dashboard/category/CategoryEditPage";
import DashboardCategoryPage from "pages/dashboard/category/CategoryPage";
import DashboardIndexPage from "pages/dashboard/index/IndexPage";
import DashboardProfilePage from "pages/dashboard/user/ProfilePage";
import DashboardUserEditPage from "pages/dashboard/user/UserEditPage";
import DashboardUserPage from "pages/dashboard/user/UserPage";
import AuctionListPage from "pages/public/auction/AuctionListPage";
import AuctionPage from "pages/public/auction/AuctionPage";
import CarListPage from "pages/public/car/CarListPage";
import ViewCarPage from "pages/public/car/ViewCarPage";
import CategoryPage from "pages/public/category/CategoryPage";
import ProfilePage from "pages/public/index/ProfilePage";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";


const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<PublicLayout/>}>
            <Route index element={<AuctionListPage/>}/>
            <Route path="profile" element={<ProfilePage/>}/>
            <Route path="car/:id" element={<ViewCarPage/>}/>
            <Route path="category">
                <Route index element={<CategoryPage/>}/>
                <Route path="car" element={<CarListPage/>}/>
                <Route path=":url" element={<CategoryPage/>}/>
            </Route>
            <Route path="auction">
                <Route index element={<AuctionListPage/>}/>

                <Route path=":id" element={<AuctionPage/>}/>
            </Route>
        </Route>
        <Route path="/auth" element={<PublicLayout/>}>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="registration" element={<RegistrationPage/>}/>
        </Route>
        <Route path="/dashboard" element={<Dashboard/>}>
            <Route index element={<DashboardIndexPage/>}/>
            <Route path="category">
                <Route index element={<DashboardCategoryPage/>}/>
                <Route path="create" element={<DashboardCategoryCreatePage/>}/>
                <Route path=":id/edit" element={<DashboardCategoryEditPage/>}/>
            </Route>
            <Route path="auction">
                <Route index element={<DashboardCarPage/>}/>
                <Route path="create" element={<DashboardCarCreatePage/>}/>
                <Route path=":id/edit" element={<DashboardCarEditPage/>}/>
            </Route>
            <Route path="user">
                <Route index element={<DashboardUserPage/>}/>
                {/*<Route path="create" element={<DashboardUserCreatePage/>}/>*/}
                <Route path="profile" element={<DashboardProfilePage/>}/>
                <Route path=":id/edit" element={<DashboardUserEditPage/>}/>
            </Route>
        </Route>
    </>
));

export default router;

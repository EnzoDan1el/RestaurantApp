import Layout from "./Layout/Layout";
import { Switch, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOnly from "./components/AdminOnly";
import NotFound from "./pages/NotFound";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";

function App() {

    return (
        <Layout>
            <Switch>

                <Route path='/' exact>
                    <Login />
                </Route>

                <ProtectedRoute path='/tables'>
                    <Tables />
                </ProtectedRoute>

                <ProtectedRoute path='/orders'>
                    <Orders />
                </ProtectedRoute>

                <AdminOnly path='/products'>
                    <Products />
                </AdminOnly>

                <AdminOnly path='/categories'>
                    <Categories/>
                </AdminOnly>

                <AdminOnly path='/users' exact>
                    <Users/>
                </AdminOnly>

                <AdminOnly path='/users/new'>
                    <NewUser />
                </AdminOnly>

                <AdminOnly path='/users/edit/:id'>
                    <EditUser />
                </AdminOnly>

                <Route path='*'>
                    <NotFound />
                </Route>

            </Switch>
        </Layout>
    );
}

export default App;

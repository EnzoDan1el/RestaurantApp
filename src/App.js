import Layout from "./Layout/Layout";
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from "./pages/Login";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import AuthContext from "./context-store/authentication-ctx";
import { useContext } from 'react';

function App() {

    const ctx = useContext(AuthContext);

    return (
        <Layout>

            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/tables'>
                    {ctx.isLoggedIn && ctx.role === 'Admin' && <Tables/>}
                    {!ctx.isLoggedIn && <Redirect to='/'/>}
                </Route>
                <Route path='/orders'>
                    {ctx.isLoggedIn && ctx.role === 'Admin' &&<Orders/>}
                    {!ctx.isLoggedIn && <Redirect to='/'/>}
                </Route>
                <Route path='/products'>
                    {ctx.isLoggedIn && ctx.role === 'Admin' && <Products/>}
                    {!ctx.isLoggedIn && <Redirect to='/'/>}
                </Route>
                <Route path='/categories'>
                    {ctx.isLoggedIn && ctx.role === 'Admin' && <Categories/>}
                    {!ctx.isLoggedIn && <Redirect to='/'/>}
                </Route>
                <Route path='/users'>
                    {ctx.isLoggedIn && ctx.role === 'Admin' && <Users/>}
                    {!ctx.isLoggedIn && <Redirect to='/'/>}
                </Route>
            </Switch>

        </Layout>
    );
}

export default App;

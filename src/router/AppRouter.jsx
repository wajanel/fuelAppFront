import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { HomePage } from '../gas/pages/HomePage';
import { UnauthorizedPage } from '../admin/pages/UnauthorizedPage';
import { PrivateRoute } from './PrivateRoute';
import { UsuarioPage } from '../gas/pages/UsuarioPage';
import { PublicRoute } from './PublicRoute';
import { BranchAdminPage } from '../admin/pages/BranchAdminPage';
import { IncomeTypeAdminPage } from '../admin/pages/IncomeTypeAdminPage';
import { useAuthStore } from '../hooks';
import { useLocation } from "react-router-dom";
import { IncomeAdminPage } from '../admin/pages/IncomeAdminPage';
import { ProviderAdminPage } from '../admin/pages/ProviderAdminPage';
import { MeasureFuelAdminPage } from '../admin/pages/MeasureFuelAdminPage';
import { FuelTypeAdminPage } from '../admin/pages/FuelTypeAdminPage';
import { PurchaseFuelAdminPage } from '../admin/pages/PurchaseFuelAdminPage';
import { PurchaseFuelResumeAdminPage } from '../admin/pages/PurchaseFuelResumeAdminPage';
import { PumpAdminPage } from '../admin/pages/PumpAdminPage';
import { FuelPumpAdminPage } from '../admin/pages/FuelPumpAdminPage';
import { FuelPriceAdminPage } from '../admin/pages/FuelPriceAdminPage';
import { SaleFuelAdminPage } from '../admin/pages/SaleFuelAdminPage';
import GraphAdminPage from '../admin/pages/GraphAdminPage';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { ClosingAdminPage } from '../admin/pages/ClosingAdminPage';

export const AppRouter = () => {


  const { status, checkAuthToken } = useAuthStore();

  const location = useLocation();
  console.log(location);
  
  useEffect(() => {
    checkAuthToken();
  }, [])
  
  if ( status === 'checking') {
    return(<h3>Cargando</h3>)
  }

  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path='/unauthorizedPage' element={<UnauthorizedPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/registro' element={<RegisterPage/>}/>
      </Route>
      <Route path='/' element={<HomePage/>}/>
      <Route element={<PrivateRoute roles={['admin']}/>}>
        <Route path='/branch' element={<BranchAdminPage/>}/>
        <Route path='/incometype' element={<IncomeTypeAdminPage/>}/>
        <Route path='/measurefuel' element={<MeasureFuelAdminPage/>}/>
        <Route path='/fueltype' element={<FuelTypeAdminPage/>} />
        <Route path='/pump' element={<PumpAdminPage/>}/>
        <Route path='/fuelpump' element={<FuelPumpAdminPage/>} />
        <Route path='/fuelprice' element={<FuelPriceAdminPage/>}/>
        <Route path='/graficas' element={<GraphAdminPage/>}/>
        <Route path='/user' element={<UsuarioPage/>}/>
      </Route> 
      <Route element={<PrivateRoute roles={['admin', 'usuario']}/>}>
        <Route path='/income' element={<IncomeAdminPage/>}/>
        <Route path='/salefuel' element={<SaleFuelAdminPage/>}/>
        <Route path='/provider' element={<ProviderAdminPage/>}/>
        <Route path='/purchasefuel' element={<PurchaseFuelAdminPage/>} />
        <Route path='/purchasefuelresume' element={<PurchaseFuelResumeAdminPage/>}/>
        <Route path='/dailyclosing' element={<ClosingAdminPage/>}/>
      </Route>
    </Routes>
  )
}

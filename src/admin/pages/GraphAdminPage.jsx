import React, { useEffect, useState } from 'react';
import { Card, Title, LineChart } from "@tremor/react";
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingDailyClosing } from '../../store/admin/thunks/closingDaily';
import { NavBarComp } from '../../gas/components/NavBarComp';

const GraphAdminPage = () => {
    
    /*  const [data, setData] = useState([
        { id: 1, date_process: "2024-08-01", id_user: 1, income: 318751.78, expenses: 0, previous_balance: 0, balance: 318751.78, total_sale_fuel: 318751.78, total_purchase_fuel: 0, total_expenses: 0, total_other_income: 0 },
        { id: 2, date_process: "2024-08-02", id_user: 1, income: 205.68, expenses: 185000, previous_balance: 318751.78, balance: 133957.46, total_sale_fuel: 205.68, total_purchase_fuel: 185000, total_expenses: 0, total_other_income: 0 },
        { id: 2, date_process: "2024-08-03", id_user: 1, income: 392.04, expenses: 0, previous_balance: 133957.46, balance: 134349.5, total_sale_fuel: 392.04, total_purchase_fuel: 0, total_expenses: 0, total_other_income: 0 }
    ]);  */

    const dispatch = useDispatch();
    const {data} = useSelector(state => state.dailyClosing);


    const dataWithLabels = data.map(item => ({
        ...item,
        date: item.date_process.split(" ")[0], // Solo la parte de la fecha, sin la hora
        "Ingresos":item.income,
        "Gastos":item.expenses,
        "Total Venta de Combustible": item.total_sale_fuel,
        "Total Compra de Combustible": item.total_purchase_fuel,
        "Balance": item.balance
    }));

    useEffect(() => {
        dispatch(startLoadingDailyClosing());
    }, []) 
    

    return (
        <>
            <NavBarComp/>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <Card>
                    <Title>Ingresos vs Gastos</Title>
                    <LineChart
                        data={dataWithLabels}
                        index="date"
                        categories={["Ingresos", "Gastos"]}
                        colors={["green", "red"]}
                        />
                </Card>
                <Card>
                    <Title>Ventas vs Compras</Title>
                    <LineChart
                        data={dataWithLabels}
                        index="date"
                        categories={["Total Venta de Combustible", "Total Compra de Combustible"]}
                        colors={["blue", "orange"]}
                        />
                </Card>
                <Card>
                    <Title>Balance General</Title>
                    <LineChart
                        data={dataWithLabels}
                        index="date"
                        categories={["Balance"]}
                        colors={["purple"]}
                        />
                </Card>
            </div>
        </>
    );
}


export default GraphAdminPage;

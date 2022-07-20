import React, { useState } from 'react';
import Adminshops from './otherRes/adminRelated/adminShops';
import ProductTable from './otherRes/adminRelated/adminTable';

const Admindashboard = () => {
    const [componentToLoad, setComponentToLoad] = useState('dashboard');

    const handleClick = event => {
        setComponentToLoad(event.target.dataset.component);
    };

    const allSideBtnsDetails = [
        {
            title: 'dashboard',
        },
    ];

    return (
        <div className='d-flex'>
            <div className='border'>
                <SidebarBtn
                    title='Dashboard'
                    dataComponent='dashboard'
                    onclickFun={handleClick}
                    icon='fa-gauge'
                />
                <SidebarBtn
                    title='Products'
                    dataComponent='products'
                    onclickFun={handleClick}
                    icon='fa-cart-shopping'
                />
                <SidebarBtn
                    title='Shops'
                    dataComponent='shops'
                    onclickFun={handleClick}
                    icon='fa-store'
                />
            </div>
            <div className='border' style={{ maxWidth: '80vw' }}>
                {componentToLoad === 'products' ? (
                    <ProductTable />
                ) : (
                    componentToLoad === 'shops' && <Adminshops />
                )}
            </div>
        </div>
    );
};

const SidebarBtn = props => (
    <div
        className='cursor-pointer text-nowrap border-1 border-bottom h3'
        data-component={props.dataComponent}
        onClick={props.onclickFun}>
        <i className={`fa-solid ${props.icon} pe-none`} />
        {props.title}
    </div>
);

export default Admindashboard;

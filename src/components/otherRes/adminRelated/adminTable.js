import React, { forwardRef, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { axiosCus } from '../commonFun';

const Admintable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(
        () =>
            axiosCus
                .post('/admin/products')
                .then(response => setTableData(response.data))
                .catch(error => console.log(error)),
        []
    );

    return (
        <MaterialTable
            title='Products'
            icons={{
                Clear: forwardRef((props, ref) => (
                    <i ref={ref} {...props} class='fa-solid fa-x' />
                )),
                Search: forwardRef((props, ref) => (
                    <i ref={ref} {...props} class='fa-solid fa-search' />
                )),
                PreviousPage: forwardRef((props, ref) => (
                    <i ref={ref} {...props} class='fa-solid fa-angle-left' />
                )),
                FirstPage: forwardRef((props, ref) => (
                    <i ref={ref} {...props} class='fa-solid fa-angles-left' />
                )),
                NextPage: forwardRef((props, ref) => (
                    <i ref={ref} {...props} class='fa-solid fa-angle-right' />
                )),
                LastPage: forwardRef((props, ref) => (
                    <i ref={ref} {...props} class='fa-solid fa-angles-right' />
                )),
                SortArrow: forwardRef((props, ref) => (
                    <i ref={ref} {...props} className='ms-1 fa-solid fa-arrow-up'/>
                )),           
            }}
            columns={[
                {
                    title: 'ID',
                    field: 'product_id',
                },
                {
                    title: 'Title',
                    field: 'title',
                },
                {
                    title: 'Category',
                    field: 'category',
                },
                {
                    title: 'Price',
                    field: 'price',
                },
                {
                    title: 'Description',
                    field: 'description',
                },
                {
                    title: 'Date Added',
                    field: 'published_date',
                },
                {
                    title: 'Shop Id',
                    field: 'shop_id',
                },
            ]}
            data={tableData}
            // actions={[
            //     {
            //         icon: 'search',
            //         tooltip: 'Save changes',
            //     },
            // ]}
        />
    );
};

export default Admintable;

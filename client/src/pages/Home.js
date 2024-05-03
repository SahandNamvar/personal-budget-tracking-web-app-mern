import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import AddEditTransaction from '../components/AddEditTransaction';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { message, Table, Select } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import Analytics from '../components/Analytics';

function Home() {

  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ transactions, setTransactions ] = useState([]);
  const [ frequency, setFrequency ] = useState("all");
  const [ type, setType ] = useState("all");
  const [ viewType, setViewType ] = useState('table');
  const [ selectedItemForEdit, setSelectedItemForEdit ] = useState(null);

  const getTransactions = async () => {
    try {
      setLoading(true);
      // const user = JSON.parse(localStorage.getItem('personal-budget-app-user'));
      // const response = await axios.post(
      //   '/api/transactions/get-all-transactions',
      //    { user_id: user._id, frequency, type });

      const user_id = JSON.parse(localStorage.getItem('personal-budget-app-user')).id;
      const response = await axios.post(
        '/api/transactions/get-all-transactions',
          { user_id, frequency, type });
      
      
      
      if (response.status === 200) {
        setLoading(false);
        setTransactions(response.data);
        // console.log('Transactions Fetched: ', response.data);
      } else {
        setLoading(false);
        message.error('Failed to get transactions');
      }
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  };

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/transactions/delete-transaction', { _id: record._id });
      if (response.status === 200) {
        setLoading(false);
        getTransactions();
        setShowAddEditTransactionModal(false);
        setSelectedItemForEdit(null);
        message.success('Transaction deleted Successfully!');
      } else {
        setLoading(false);
        message.error('Transaction was NOT deleted!');
      }
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  }

  useEffect(() => {
    getTransactions();
  }, [ frequency, type ]); // eslint-disable-line react-hooks/exhaustive-deps

  // Table design
  const columns = [ // render: (date)=><label>{moment(date).format('YYYY-MM-DD')}</label>
    { title: 'Date', dataIndex: 'date', key: 'date', render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span> },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Actions', dataIndex: 'actions', key: 'actions', render: (text, record) => {
      return (
        <div>
          <EditOutlined className='row-button-edit' onClick={ () => { 
            setSelectedItemForEdit(record)
            setShowAddEditTransactionModal(true) }} />
          <DeleteOutlined className='row-button-delete mx-3' onClick={() => deleteTransaction(record)}/>
        </div>
      )
    }}
  ]

  return (
    <DefaultLayout>
        { loading && <Spinner />}

        { /* Section 1 - Filters */}
        <div className="filter d-flex justify-content-between align-items-center">

          { /* Filter 1 - Frequency & Type */}
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h6>Select Frequency</h6>
              <Select value={frequency} onChange={(value)=>setFrequency(value)}>
                <Select.Option value="all">All Transactions</Select.Option>
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
              </Select>
            </div>

            <div className="d-flex flex-column mx-5">
              <h6>Select Type</h6>
              <Select value={type} onChange={(value)=>setType(value)}>
                <Select.Option value="all">All Types</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </div>
          </div>


          { /* Filter 2 - View Analytics & Add New */}
          <div className='d-flex'>
            <div>
              <div className='view-switch mx-5'>
              <UnorderedListOutlined className={`mx-2 ${
                viewType === 'table' ? 'active-icon' : 'inactive-icon'
              }`}
              onClick={() => setViewType('table')}
              />

              <AreaChartOutlined className={`mx-2 ${
                viewType === 'analytics' ? 'active-icon' : 'inactive-icon'
              }`}
              onClick={() => setViewType('analytics')}
              />

              </div>
            </div>

            <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>Add New</button>
          </div>
        </div>

        { /* Section 2 - Table */}
        <div className="table-analytics">

          {viewType === 'table' ? (
            <div className="table">
              <Table columns={columns} dataSource={transactions} rowKey="_id" />
            </div>
          ) : (

            <Analytics transactions={transactions}/>

          )}

        </div>

        {showAddEditTransactionModal && (
          <AddEditTransaction 
            showAddEditTransactionModal={showAddEditTransactionModal} 
            setShowAddEditTransactionModal={setShowAddEditTransactionModal}
            selectedItemForEdit={selectedItemForEdit}
            getTransactions={getTransactions} 
            setSelectedItemForEdit={setSelectedItemForEdit} /> )}

    </DefaultLayout>
  );
}

export default Home;
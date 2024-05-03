import React, { useState } from "react";
import { Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import Spinner from "./Spinner";

function AddEditTransaction( {showAddEditTransactionModal, setShowAddEditTransactionModal, selectedItemForEdit ,getTransactions, setSelectedItemForEdit }) {

    const [ loading, setLoading ] = useState(false);

    const onFinish = async (values) => {
        //console.log('Received values:', values);
        try {
          setLoading(true);
          // const user = JSON.parse(localStorage.getItem('personal-budget-app-user'))
          // const user_id = user._id;
          const user_id = JSON.parse(localStorage.getItem('personal-budget-app-user')).id;

          if (selectedItemForEdit) {
              const doc_id = selectedItemForEdit._id;
              const { amount, type, category, date, description } = values;
              const response = await axios.post('/api/transactions/edit-transaction', { amount, type, category, date, description, user_id, _id: doc_id });
              if (response.status === 200) {
                  setLoading(false);
                  getTransactions();
                  setShowAddEditTransactionModal(false);
                  setSelectedItemForEdit(null);
                  message.success('Transaction updated Successfully!');
              } else {
                  setLoading(false);
                  message.error('Transaction was NOT updated!');
              }
              
          } else {
              const { amount, type, category, date, description } = values;
              const response = await axios.post('/api/transactions/add-transaction', { amount, type, category, date, description, user_id });
              if (response.status === 201) {
                  setLoading(false);
                  getTransactions(); // Fetch transactions again to update the table - This is a prop passed from Home.js
                  setShowAddEditTransactionModal(false);
                  setSelectedItemForEdit(null);
                  message.success('Transaction added Successfully!');
              } else {
                  setLoading(false);
                  message.error('Transaction was NOT added!');
              }
            }
        } catch (error) {
          setLoading(false);
          message.error('Something went wrong!');
          console.log(error);
        }
    }

    const cancelShowAddEditTransactionModal = () => {
        setShowAddEditTransactionModal(false);
        setSelectedItemForEdit(null);
    }

    const inputFormNumberValidation = (event) => {
      if (!/[0-9]/.test(event.key) && 
        event.key !== 'Backspace' && 
        event.key !== 'Delete' && 
        event.key !== 'ArrowLeft' && 
        event.key !== 'ArrowRight') 
        {
          event.preventDefault();
        }
    }

    return (
        <Modal title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
          open={showAddEditTransactionModal} 
          onCancel={cancelShowAddEditTransactionModal}
          footer={false}> {/* footer={false} hides the default footer buttons */}

          <hr />
          {loading && <Spinner />}
          <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>

          <Form.Item label='Amount' name='amount' rules={[{ required:true, message:'Amount is required!' }]}>
              <Input placeholder='Transaction Amount' type='text' onKeyDown={inputFormNumberValidation}/>
          </Form.Item>

          <Form.Item label='Type' name='type' rules={[{ required:true, message:'Type is required!' }]}>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Category' name='category' rules={[{ required:true, message:'Category is required!'  }]}>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='freelance'>Freelance</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='entertainment'>Entertainment</Select.Option>
              <Select.Option value='groceries'>Groceries</Select.Option>
              <Select.Option value='rent'>Rent</Select.Option>
              <Select.Option value='utilities'>Utilities</Select.Option>
              <Select.Option value='transportation'>Transportation</Select.Option>
              <Select.Option value='shopping'>Shopping</Select.Option>
              <Select.Option value='insurance'>Insurance</Select.Option>
              <Select.Option value='investment'>Investment</Select.Option>
              <Select.Option value='savings'>Savings</Select.Option>
              <Select.Option value='travel'>Travel</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='education'>Education</Select.Option>
              <Select.Option value='subscription'>Subscription</Select.Option>
              <Select.Option value='donation'>Donation</Select.Option>
              <Select.Option value='gift'>Gift</Select.Option>
              <Select.Option value='loan'>Loan</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Date' name='date' rules={[{ required:true, message:'Date is required!'  }]}>
              <Input type='date'/>
          </Form.Item>

          <Form.Item label='Description' name='description'>
              <Input placeholder='Transaction Description' type='text'/>
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button className="primary" type='submit'>Add Transaction</button>
          </div>

          </Form>

        </Modal>
    );
}

export default AddEditTransaction;
import React from 'react'
import { useState,useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import Message from '../../components/Message';
import {Loader} from '../../components/Loader';
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import {useUpdateProductMutation, useGetProductDetailsQuery , useUploadProductImageMutation} from '../../slices/productsApiSlice'


const ProductEditScreen = () => {

  const {id:productId} = useParams();

  const[name,setName] =useState('');
  const[price,setPrice] =useState(0);
  const[image,setImage] =useState('');
  const[brand,setBrand] =useState('');
  const[category,setCategory] =useState('');
  const[countInStock,setCountInStock] =useState(0);
  const[description,setDescription] =useState('');

  const {data: product, isLoading , refetch , error} = useGetProductDetailsQuery(productId);
  
  const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation()

  const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if(product){
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()
    
      const updatedProduct = {
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }
      const result = await updateProduct(updatedProduct);
      refetch()
      if(result.error) {
        toast.error(result.error.data.message || result.error.message)
      }else{
        toast.success('Product updated successfully')
        navigate('/admin/productlist')
      }
  }
  const uploadFileHandler = async (e) => {
    const formdata = new FormData();
    formdata.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formdata).unwrap();
      toast.success(res.message);
      setImage(res.image); //we are sending image path from backend to frontend in res.image and setting it to image state

    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light mb-3'>
        Go Back
      </Link>
      
      <FormContainer>
        <h1>
          Edit Product
        </h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
           <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='mb-3'>
             <Form.Label>Image</Form.Label>

              <Form.Control type='text' placeholder='Enter product image' value={image} onChange={(e) => setImage(e.target.value)}>
              </Form.Control>

              <Form.Control type='file' label='choose file' onChange = {uploadFileHandler}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='brand' className='mb-3'>
              <Form.Label>Brand</Form.Label>
              <Form.Control type='text' placeholder='Enter product Brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='mb-3'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control type='number' placeholder='Enter product count In Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control type='text' placeholder='Enter product category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' placeholder='Enter product description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mb-3' disabled={loadingUpload}>
              {loadingUpload ? 'Uploading image...' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
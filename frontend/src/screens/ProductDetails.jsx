import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Rating } from '../components/Rating';
import Message from '../components/Message';
import { Loader } from '../components/Loader';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import {addToCart } from "../slices/cartSlice";

export const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty,setQty] = useState(1);

    

    const { data: prod, isLoading, error } = useGetProductDetailsQuery(id);
    // useEffect(() => {
    //     const fetchProduct = async()=>{
    //         const {data} = await axios.get(`/api/products/${id}`)
    //         setProduct(data);
    //     }
    //     fetchProduct();
    // }, [id])

    const addToCartHandler = ()=>{
        //genrally called as dispatch(addToCart(prod)) 
        //but we can have multiple qty of products 
        //so we spread the product object first and add qty property to it 
        //and then dispatch it to addToCart action
            dispatch(addToCart({ ...prod,qty})); 
            navigate('/cart')
        }
    return (
        <div>

            {isLoading ? (<Loader />) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={5}>
                            <Image src={prod.image} alt={prod.name} style={{ width: '100%' }}></Image>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{prod.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={prod.rating} text={`${prod.numReviews} reviews`}></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h4>Price: ${prod.price}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {prod.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${prod.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>{prod.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {prod.countInStock>0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e)=> {setQty(Number(e.target.value)); console.log(qty);} }>

                                                        {[...Array(prod.countInStock).keys()].map((elem)=>(        //here elem is index of array which is also value at that index
                                                            <option key={elem+1} value={elem + 1}>
                                                                {elem+1}
                                                            </option>
                                                        ))}
                                                        {/*1.     Array(prod.countInStock) will create array of length=prod.countInStock say countInStock=5 so [undefined,undefined,undefined,undefined,undefined]
                                                           2.    .keys() gives iterator that holds value of index so using spread operator ... we can create array with value as it index 
                                                           3.    eg- [0,1,2,3,4]
                                                        then map through array and +1 as qty cant be 0 */}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button className='btn-block' onClick={addToCartHandler} type='button' disabled={prod.countInStock === 0}>Add To Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>)}



        </div>
    )
}

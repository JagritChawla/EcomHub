import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '../components/Rating';
import Message from '../components/Message';
import { Loader } from '../components/Loader';
import { useGetProductDetailsQuery,useCreateReviewMutation } from '../slices/productsApiSlice';
import { toast } from 'react-toastify'
import {addToCart } from "../slices/cartSlice";
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';

export const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty,setQty] = useState(1);
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')

    

    const { data: prod, isLoading,refetch, error } = useGetProductDetailsQuery(id);
    // useEffect(() => {
    //     const fetchProduct = async()=>{
    //         const {data} = await axios.get(`/api/products/${id}`)
    //         setProduct(data);
    //     }
    //     fetchProduct();
    // }, [id])


    const [createReview , {isLoading: loadingProductReview} ] = useCreateReviewMutation();

    const {userInfo} = useSelector((state)=> state.auth)


    const addToCartHandler = ()=>{
        //genrally called as dispatch(addToCart(prod)) 
        //but we can have multiple qty of products 
        //so we spread the product object first and add qty property to it 
        //and then dispatch it to addToCart action
            dispatch(addToCart({ ...prod,qty})); 
            navigate('/cart')
        }

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            await createReview({productId: id, rating, comment}).unwrap()
            refetch()
            toast.success('Review submitted successfully')
            setRating(0)
            setComment('')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <>

            {isLoading ? (<Loader />) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <Meta title={prod.name} description={prod.description} keywords={prod.category} />
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
                    
                    <Row className="review">
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {prod.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {prod.reviews.map((rev)=>(
                                    <ListGroup.Item key={rev._id}>
                                        <strong>{rev.name}</strong>
                                        <Rating value={rev.rating} />
                                        <p>{rev.createdAt.substring(0,10)}</p>
                                        <p>{rev.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>

                                    {loadingProductReview && <Loader />}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating' className='my-2'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={(e)=> setRating(Number(e.target.value))}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='Comment' className='my-2'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={(e)=> setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button disabled={loadingProductReview} type='submit' variant='primary' >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    ) }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>

                </>
            )}



        </>
    )
}

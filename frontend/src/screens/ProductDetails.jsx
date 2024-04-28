import { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap';

import { Rating } from '../components/Rating';
import axios from "axios";

export const ProductDetails = () => {
    
    const [prod, setProduct] = useState({});

    const {id} = useParams();
    

    useEffect(() => {
        const fetchProduct = async()=>{
            const {data} = await axios.get(`/api/products/${id}`)
            setProduct(data);
        }
        fetchProduct();
    }, [id])
    
  return (
    <div>
        <Row>
            <Col md={5}>
                <Image src={prod.image} alt={prod.name} style={{width:'100%'}}></Image>
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
                                    <strong>{prod.countInStock > 0 ?'In Stock' :'Out Of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={prod.countInStock===0 }>Add To Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    </div>
  )
}

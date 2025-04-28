import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Rating } from './Rating'

export const Product = ({product}) => {
  return (
    <Card className='p-3 rounded' style={{ height: '100%' }}>
        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.image} variant="top" className='product-image' style={{
                height: '200px', // Fixed height for all images
                objectFit: 'cover', // This will crop the image to fit
                width: '100%' // Full width of card
            }}/>
        </Link>

        <Card.Body>
            <Link to={`/products/${product._id}`}>
                <Card.Title as="div" className='product-title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div" >
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>

            <Card.Text as="h3" className='mt-auto'>
                ${product.price}
            </Card.Text>
        </Card.Body>

    </Card>
  )
}

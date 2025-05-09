import {Row , Col} from "react-bootstrap"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Product } from "../components/Product"
import { Loader } from "../components/Loader"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"
import { useGetProductsQuery } from "../slices/productsApiSlice"
import Meta from "../components/Meta"

export const HomeScreen = () => {

  const { pageNumber, keyword } = useParams()

  const { data , isLoading, error} = useGetProductsQuery({ keyword, pageNumber});

    return (
    <div>
      <Meta title="EcomHub | Home" />

      {!keyword ? <ProductCarousel/> : ( <Link to='/' className="btn btn-outline-dark mb-4 ">Home</Link>)}
      


      {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (
        <>
        
        <h1>Latest Products</h1>
        <Row className="g-3">
            {data.products.map( (product) =>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword :' '} />
        </>
        
      )}
        
    </div>
  )
}

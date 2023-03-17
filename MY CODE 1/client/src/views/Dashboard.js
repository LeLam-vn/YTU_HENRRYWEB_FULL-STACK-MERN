import React, {useContext, useEffect} from 'react'
import {PostContext} from "../contexts/PostContext";
import Spinner from "react-bootstrap/Spinner";
import {Card, Col, Row} from "react-bootstrap";
import {AuthContext} from "../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import SinglePost from "../components/posts/SinglePost";

const Dashboard = () => {
    //Context
    const {authState:{user:{username}}} = useContext(AuthContext)
    const {
        postState:{posts, postsLoading},
        getPosts
    } = useContext(PostContext)

    //Start: Get all posts

    useEffect(()=> {
        getPosts()
    },[])

    let body = null

    if(postsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info'/>
            </div>
        )
    } else if (posts.length ===0){
        body =(
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to Learn IT</Card.Title>
                        <Card.Text>
                            Click the button below to track your your first skill to learn
                        </Card.Text>
                        <Button variant='primary'>Learn IT</Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                {
                    posts.map(post=>(
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post}/>
                        </Col>
                    ))
                }
            </Row>
        )
    }

    return (
        <>
            <h1>Dashboard</h1>
            {body}
        </>
    )
}
export default Dashboard
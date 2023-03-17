import React from 'react'
import {Badge, Card, Col, Row} from "react-bootstrap";

const SinglePost = ({post:{_id,status,title, description, url}}) => (
    <Card
        className='shadow'
        border={
            status==='LEARNED'
                ?'success'
                :status==='LEARNING'
                    ?'warning'
                    :'danger'
    }>
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <p className='post-title'>{title}</p>
                        <Badge
                            pill variant ={
                            status==='LEARNED'
                                ?'success'
                                :status==='LEARNING'
                                    ?'warning'
                                    :'danger'
                        }
                        >
                            {status}
                        </Badge>
                    </Col>
                    <Col className='text-right'>
                        Button
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
        </Card.Body>

    </Card>
)
export default SinglePost
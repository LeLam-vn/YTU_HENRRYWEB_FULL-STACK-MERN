import React from 'react'
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const About = () => {
    return (
        <Row className='mt-5' style={{marginRight:0}}>
            <Col className='text-center'>
                <Button
                    variant='primary'
                    href='https://studio.youtube.com/channel/UCUa0ON5sSgm-M8LjDtPffMg/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D'
                    size='lg'
                >
                    Visit my channel for more tutorial
                </Button>

            </Col>
        </Row>
    )
}
export default About
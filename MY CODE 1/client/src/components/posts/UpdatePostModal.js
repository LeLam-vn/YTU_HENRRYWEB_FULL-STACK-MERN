import React, {useContext, useEffect, useState} from 'react'
import {PostContext} from "../../contexts/PostContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdatePostModal = () => {
    //Context
    const {
        postState : {post},
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast
    } = useContext(PostContext)
    
    //State
    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(()=>setUpdatedPost(post),[post])
    //
    const {title, description, url, status} = updatedPost

    const onChangeUpdatedPostForm = event =>{
        setUpdatedPost({...updatedPost,[event.target.name]:event.target.value})
    }
    const closeDialog = ()=>{
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }
    // const resetAddPostData = ()=>{
    //     setUpdatedPost({
    //         title: '',
    //         description: '',
    //         url: '',
    //         status: 'TO LEAR'
    //     })
    //     setShowUpdatePostModal(false)
    // }

    const onSubmit = async event =>{
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        setShowUpdatePostModal(false)
        // resetAddPostData()
        setShowToast({
            show:true,
            message,
            type:success?'success':'danger'
        })
    }

    return (
        <Modal show={showUpdatePostModal}
               // animation={false}
               onHide={closeDialog}
        >
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeUpdatedPostForm}

                        />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            row={3}
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='YouTube Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as = 'select'
                            name='status'
                            value={status}
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'> LEARNED</option>
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={closeDialog}
                    >Cancel</Button>
                    <Button variant='primary' type='submit' onClick={onSubmit}>
                        UPDATE!
                    </Button>
                </Modal.Footer>

            </Form>
        </Modal>
    )
}
export default UpdatePostModal
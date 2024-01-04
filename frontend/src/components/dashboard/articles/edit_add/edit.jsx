import { useEffect, useRef, useState } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { formValues, validation } from './validationSchema';
import WYSIWYG from '../../../../utils/form/tiptap'

import { useSelector, useDispatch } from 'react-redux';
import { getAdminArticle, updateArticle } from '../../../../store/actions/articles'


import { useNavigate, useParams } from 'react-router-dom';
import {
    AdminTitle, errorHelper, Loader
} from '../../../../utils/tools'

//MUI
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
//import Chip from '@mui/material/Chip'
//import Paper from '@mui/material/Paper'
//import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';

const EditArticle = () => {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const [formData, setFormdata] = useState(formValues) 
    const [editorContent, setEditorContent] = useState(null);
    let navigate = useNavigate();
    let { articleId } = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formData,
        validationSchema: validation,
        onSubmit: (values) => {
               dispatch(updateArticle({values,articleId}))
            
        }
    })


    const handleEditorState = (state) => {
        formik.setFieldValue('content', state, true)
    }



    useEffect(() => {
    
        dispatch(getAdminArticle(articleId))
            .unwrap()
            .then(response => {
                //console.log(response)
                setFormdata(response)
                setEditorContent(response.content)
                 setLoading(false);
            })
    }, [dispatch])


    return (

        <>
            <AdminTitle title="Edit article" />
            { loading ?
                <Loader/>
            :
            <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>

                <div className='form-group'>
                    <TextField
                        style={{ width: '100%' }}
                        name="title"
                        label="Enter a title"
                        variant='outlined'
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik, 'title')}
                    />
                </div>
                {editorContent ?
                    <div className='form-group'>
                        <WYSIWYG
                            editorContent={editorContent}
                            setEditorState={(state) => handleEditorState(state)}

                        />
                    </div>
                    : null}

                <div className='form-group'>
                    <TextField
                        style={{ width: '100%' }}
                        name="excerpt"
                        label="Enter a short desc"
                        variant='outlined'
                        {...formik.getFieldProps('excerpt')}
                        {...errorHelper(formik, 'excerpt')}
                        multiline
                        rows={4}
                    />
                </div>          

                <Divider className='mt-3 mb-3' />

                <Divider className='mt-3 mb-3' />

                <FormControl fullWidth>
                    <InputLabel>Select a status</InputLabel>
                    <Select
                        name="status"
                        label="Select a status"
                        {...formik.getFieldProps('status')}
                        error={formik.errors.status && formik.touched.status ? true : false}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                    </Select>
                    {formik.errors.status && formik.touched.status ?
                        <FormHelperText error={true}>
                            {formik.errors.status}
                        </FormHelperText>
                        : null}      
                </FormControl>

                <Divider className='mt-3 mb-3' />

                <Divider className='mt-3 mb-3' />

                {articles.loading ?
                    <Loader />
                    :
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        <span>Edit article</span>
                    </Button>
                }
            </form>
             }
        </>
    )
}



export default EditArticle;
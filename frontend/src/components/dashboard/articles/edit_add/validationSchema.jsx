import * as Yup from 'yup';


export const formValues = {
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',

}

export const validation = () => (
    Yup.object({
        title: Yup.string()
            .required('The title is required'),
        content: Yup.string()
            .required('the content is required')
            .min(50, 'That is it ? ...write some more'),
        excerpt: Yup.string()
            .required('Write more please')
            .min(20, 'Sorry 20 max'),
        status: Yup.string()
            .required('The status is required'),

    })
)
import * as Yup from 'yup';


export const formValues = {
    title:'',
    content:'',
    excerpt:'',
    status:'draft',
   
}

export const validation = () => (
    Yup.object({
       title:Yup.string()
        .required('The title is required'),
        content:Yup.string()
        .required('the content is required')
        .min(50,'That is it ? ...write some more'),
        excerpt:Yup.string()
        .required('The title is required')
        .min(100,'Sorry 100 max'),
        status:Yup.string()
        .required('The status is required'),
      
    })
)